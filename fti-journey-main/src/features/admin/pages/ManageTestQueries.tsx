import { API_BASE_URL } from '../../../config/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Download, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/auth/AuthContext';

const COUNTRIES = [
    'UK', 'Canada', 'Australia', 'Ireland', 'USA', 'Europe', 
    'Turkey', 'Hungary', 'Sweden', 'Malaysia', 'Cyprus', 'New Zealand'
];

const BRANCHES = [
    { key: 'branch_lahore', label: 'Lahore Branch' },
    { key: 'branch_faisalabad', label: 'Faisalabad Branch' },
    { key: 'branch_rawalpindi', label: 'Rawalpindi Branch' },
    { key: 'branch_gujranwala', label: 'Gujranwala (Head Office)' },
    { key: 'branch_london', label: 'London (UK Office)' },
    { key: 'branch_alipurchatta', label: 'Ali Pur Chatta Branch' },
    { key: 'branch_bahawalpur', label: 'Bahawalpur Branch' },
    { key: 'branch_wazirabad', label: 'Wazirabad Branch' }
];

type WhatsAppSettings = Record<string, string>;

const ManageTestQueries = () => {
    const [settings, setSettings] = useState<WhatsAppSettings>({});
    const [queries, setQueries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { token } = useAuth();

    const fetchData = async () => {
        try {
            setLoading(true);
            const [settingsRes, queriesRes] = await Promise.all([
                fetch(`${API_BASE_URL}/settings/whatsapp`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/test-queries`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            if (settingsRes.ok) setSettings(await settingsRes.json());
            if (queriesRes.ok) setQueries(await queriesRes.json());
        } catch (error) {
            toast({ title: 'Network error', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSaveSettings = async () => {
        try {
            setSaving(true);
            const response = await fetch(`${API_BASE_URL}/settings/whatsapp`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(settings)
            });
            
            if (response.ok) {
                toast({ title: 'Settings saved successfully' });
                setShowSettings(false);
            } else {
                toast({ title: 'Failed to save settings', variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Network error', variant: 'destructive' });
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (country: string, value: string) => {
        setSettings(prev => ({ ...prev, [country]: value }));
    };

    const exportToCSV = () => {
        if (queries.length === 0) {
            toast({ title: 'No queries to export' });
            return;
        }

        const headers = ['ID', 'Test Type', 'Name', 'Phone', 'Email', 'Preferred Branch', 'Qualification', 'Passing Year', 'Date Submitted'];
        
        const csvRows = [headers.join(',')];
        
        queries.forEach(q => {
            const row = [
                q.id,
                q.testType,
                `"${q.name}"`,
                `"${q.phone}"`,
                `"${q.email}"`,
                `"${q.preferredBranch}"`,
                `"${q.qualification}"`,
                `"${q.passingYear}"`,
                `"${new Date(q.createdAt).toLocaleString()}"`
            ];
            csvRows.push(row.join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `test_queries_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Test Prep Queries</h2>
                    <p className="text-slate-500">Manage IELTS and PTE queries and WhatsApp Settings.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
                        <Settings className="mr-2 h-4 w-4" />
                        WhatsApp Settings {showSettings ? <ChevronUp className="ml-2 h-4 w-4"/> : <ChevronDown className="ml-2 h-4 w-4"/>}
                    </Button>
                    <Button variant="outline" onClick={fetchData} disabled={loading || saving}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700 text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Export to Excel
                    </Button>
                </div>
            </div>

            {/* Collapsible Settings Section */}
            {showSettings && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">WhatsApp Numbers</h3>
                        <Button onClick={handleSaveSettings} disabled={saving} className="bg-primary hover:bg-primary/90">
                            <Save className="mr-2 h-4 w-4" />
                            {saving ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">IELTS WhatsApp Number</label>
                                <Input 
                                    placeholder="+923000000000" 
                                    value={settings['ieltsWhatsApp'] || ''}
                                    onChange={(e) => handleChange('ieltsWhatsApp', e.target.value)}
                                    className="bg-slate-50 focus-visible:ring-primary/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">PTE WhatsApp Number</label>
                                <Input 
                                    placeholder="+923000000000" 
                                    value={settings['pteWhatsApp'] || ''}
                                    onChange={(e) => handleChange('pteWhatsApp', e.target.value)}
                                    className="bg-slate-50 focus-visible:ring-primary/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Queries Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Test Type</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Qualification</th>
                                <th className="px-6 py-4">Passing Year</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-10 text-slate-500">Loading queries...</td>
                                </tr>
                            ) : queries.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-10 text-slate-500">No test prep queries found.</td>
                                </tr>
                            ) : (
                                queries.map((query) => (
                                    <tr key={query.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-primary">{query.testType}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{query.name}</td>
                                        <td className="px-6 py-4 text-slate-600">{query.phone}</td>
                                        <td className="px-6 py-4 text-slate-600">{query.email || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600">{BRANCHES.find(b => b.key === query.preferredBranch)?.label || query.preferredBranch}</td>
                                        <td className="px-6 py-4 text-slate-600">{query.qualification || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600">{query.passingYear || '-'}</td>
                                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                            {new Date(query.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageTestQueries;
