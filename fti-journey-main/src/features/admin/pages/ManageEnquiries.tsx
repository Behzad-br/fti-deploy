import { API_BASE_URL } from '../../../config/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/auth/AuthContext';

interface Enquiry {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    currentQualification: string;
    targetCountry: string;
    message: string;
    createdAt: string;
}

const ManageEnquiries = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/enquiries`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setEnquiries(data);
            } else {
                toast({ title: 'Failed to fetch enquiries', variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Network error', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const downloadCSV = () => {
        if (enquiries.length === 0) {
            toast({ title: 'No data to download', variant: 'destructive' });
            return;
        }

        const headers = ['Date', 'Name', 'Phone', 'Email', 'Address', 'Qualification', 'Country', 'Message'];
        const csvRows = [];
        
        // Add header
        csvRows.push(headers.join(','));

        // Add rows
        for (const row of enquiries) {
            const values = [
                new Date(row.createdAt).toLocaleDateString(),
                `"${row.name}"`,
                `"${row.phone}"`,
                `"${row.email}"`,
                `"${row.address}"`,
                `"${row.currentQualification}"`,
                `"${row.targetCountry}"`,
                `"${row.message?.replace(/"/g, '""')}"` // Escape quotes
            ];
            csvRows.push(values.join(','));
        }

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `enquiries_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Free Consultation Enquiries</h2>
                    <p className="text-slate-500">Manage all student enquiries submitted via the Free Consultation form.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={fetchEnquiries} disabled={loading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button onClick={downloadCSV} className="bg-green-600 hover:bg-green-700">
                        <Download className="mr-2 h-4 w-4" />
                        Download CSV
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Contact Details</th>
                                <th className="px-4 py-3">Qualification</th>
                                <th className="px-4 py-3">Target Country</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                                        Loading enquiries...
                                    </td>
                                </tr>
                            ) : enquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                                        No enquiries found.
                                    </td>
                                </tr>
                            ) : (
                                enquiries.map((enquiry) => (
                                    <motion.tr 
                                        key={enquiry.id} 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-4 py-3 align-top whitespace-nowrap">
                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 align-top font-medium text-slate-900">
                                            {enquiry.name}
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-slate-900">{enquiry.phone}</span>
                                                <span className="text-slate-500 text-xs">{enquiry.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 align-top text-slate-600">
                                            {enquiry.currentQualification || '-'}
                                        </td>
                                        <td className="px-4 py-3 align-top">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                {enquiry.targetCountry}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 align-top text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => {
                                                    alert(`Message from ${enquiry.name}:\n\n${enquiry.message || 'No message provided'}\n\nAddress: ${enquiry.address || 'Not provided'}`);
                                                }}
                                                title="View Message"
                                            >
                                                <MessageSquare className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageEnquiries;
