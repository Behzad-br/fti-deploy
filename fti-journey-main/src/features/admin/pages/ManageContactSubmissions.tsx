import { API_BASE_URL } from '../../../config/api';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Download, RefreshCw, MessageSquare, Trash2, Mail, Phone,
    Globe, CheckCircle, Circle, X, Eye, Search, Filter, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/auth/AuthContext';

interface ContactSubmission {
    _id: string;
    name: string;
    phone: string;
    email?: string;
    country?: string;
    message?: string;
    isRead: boolean;
    createdAt: string;
}

const ManageContactSubmissions = () => {
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<ContactSubmission | null>(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
    const { token } = useAuth();

    const authHeaders = { Authorization: `Bearer ${token}` };

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const url = filter === 'all'
                ? '/api/contact'
                : `/api/contact?isRead=${filter === 'read'}`;
            const res = await fetch(url, { headers: authHeaders });
            if (res.ok) {
                const data = await res.json();
                setContacts(data.data || []);
            } else {
                toast({ title: 'Failed to fetch', variant: 'destructive' });
            }
        } catch {
            toast({ title: 'Network error', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchContacts(); }, [filter]);

    const markRead = async (id: string, isRead: boolean) => {
        try {
            const res = await fetch(`${API_BASE_URL}/contact/${id}/read`, {
                method: 'PATCH',
                headers: { ...authHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead }),
            });
            if (res.ok) {
                setContacts(prev => prev.map(c => c._id === id ? { ...c, isRead } : c));
                if (selected?._id === id) setSelected(prev => prev ? { ...prev, isRead } : null);
                toast({ title: isRead ? '✓ Marked as Read' : '○ Marked as Unread' });
            }
        } catch {
            toast({ title: 'Failed to update', variant: 'destructive' });
        }
    };

    const deleteContact = async (id: string) => {
        if (!confirm('Delete this contact inquiry?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/contact/${id}`, {
                method: 'DELETE',
                headers: authHeaders,
            });
            if (res.ok) {
                setContacts(prev => prev.filter(c => c._id !== id));
                if (selected?._id === id) setSelected(null);
                toast({ title: '🗑 Deleted successfully' });
            }
        } catch {
            toast({ title: 'Failed to delete', variant: 'destructive' });
        }
    };

    const downloadCSV = () => {
        if (!contacts.length) {
            toast({ title: 'No data to download', variant: 'destructive' });
            return;
        }
        const headers = ['Date', 'Name', 'Phone', 'Email', 'Country', 'Message', 'Read'];
        const rows = contacts.map(c => [
            new Date(c.createdAt).toLocaleDateString(),
            `"${c.name}"`,
            `"${c.phone}"`,
            `"${c.email || ''}"`,
            `"${c.country || ''}"`,
            `"${(c.message || '').replace(/"/g, '""')}"`,
            c.isRead ? 'Yes' : 'No',
        ]);
        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `contact_submissions_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        (c.email || '').toLowerCase().includes(search.toLowerCase())
    );

    const unreadCount = contacts.filter(c => !c.isRead).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Contact Submissions</h2>
                        {unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black text-white bg-orange-500 animate-pulse">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <p className="text-slate-500 text-sm">All inquiries submitted via the Contact page form.</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Button variant="outline" size="sm" onClick={fetchContacts} disabled={loading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button size="sm" onClick={downloadCSV} className="bg-green-600 hover:bg-green-700 text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search by name, phone, or email..."
                        className="pl-10 h-10 bg-white border-slate-200"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 bg-slate-100 p-1 rounded-xl h-10">
                    {(['all', 'unread', 'read'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all capitalize ${filter === f
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total', value: contacts.length, color: 'bg-slate-100 text-slate-700', dot: 'bg-slate-400' },
                    { label: 'Unread', value: contacts.filter(c => !c.isRead).length, color: 'bg-orange-50 text-orange-700', dot: 'bg-orange-500' },
                    { label: 'Read', value: contacts.filter(c => c.isRead).length, color: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
                ].map(s => (
                    <div key={s.label} className={`${s.color} rounded-2xl p-4 flex items-center gap-3`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`}></span>
                        <div>
                            <p className="text-2xl font-black">{s.value}</p>
                            <p className="text-xs font-bold opacity-70">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Country</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center">
                                        <div className="flex items-center justify-center gap-3 text-slate-400">
                                            <RefreshCw className="h-5 w-5 animate-spin" />
                                            Loading submissions...
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <MessageSquare className="h-8 w-8" />
                                            <p className="font-medium">No submissions found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((c) => (
                                    <motion.tr
                                        key={c._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${!c.isRead ? 'bg-orange-50/30' : ''}`}
                                        onClick={() => {
                                            setSelected(c);
                                            if (!c.isRead) markRead(c._id, true);
                                        }}
                                    >
                                        <td className="px-5 py-4 align-middle">
                                            {c.isRead
                                                ? <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400"><CheckCircle className="h-4 w-4 text-green-500" /> Read</span>
                                                : <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600"><Circle className="h-4 w-4 fill-orange-500 text-orange-500" /> New</span>
                                            }
                                        </td>
                                        <td className="px-5 py-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                                                    {c.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className={`font-bold ${!c.isRead ? 'text-slate-900' : 'text-slate-600'}`}>{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 align-middle">
                                            <div className="flex flex-col gap-1">
                                                <span className="flex items-center gap-1.5 text-slate-700 font-medium text-xs">
                                                    <Phone className="h-3 w-3 text-slate-400" /> {c.phone}
                                                </span>
                                                {c.email && (
                                                    <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                                                        <Mail className="h-3 w-3" /> {c.email}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 align-middle">
                                            {c.country
                                                ? <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                                                    <Globe className="h-3 w-3" /> {c.country}
                                                </span>
                                                : <span className="text-slate-300 text-xs">—</span>
                                            }
                                        </td>
                                        <td className="px-5 py-4 align-middle text-xs text-slate-400 font-medium whitespace-nowrap">
                                            {new Date(c.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-5 py-4 align-middle text-right">
                                            <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                                                <button
                                                    onClick={() => { setSelected(c); if (!c.isRead) markRead(c._id, true); }}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                                                    title="View"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => markRead(c._id, !c.isRead)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all"
                                                    title={c.isRead ? 'Mark Unread' : 'Mark Read'}
                                                >
                                                    {c.isRead ? <Circle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                                </button>
                                                <button
                                                    onClick={() => deleteContact(c._id)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal header */}
                            <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #ea580c, #f59e0b)' }}></div>
                            <div className="p-6 border-b border-slate-100">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-xl shrink-0">
                                            {selected.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900">{selected.name}</h3>
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold mt-0.5 ${selected.isRead ? 'text-green-600' : 'text-orange-600'}`}>
                                                {selected.isRead
                                                    ? <><CheckCircle className="h-3.5 w-3.5" /> Read</>
                                                    : <><Circle className="h-3.5 w-3.5 fill-orange-500" /> Unread</>
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal body */}
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                            <Phone className="h-3 w-3" /> Phone
                                        </p>
                                        <a href={`tel:${selected.phone}`} className="text-slate-800 font-bold hover:text-orange-600 transition-colors text-sm">{selected.phone}</a>
                                    </div>
                                    {selected.email && (
                                        <div className="bg-slate-50 rounded-2xl p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                                <Mail className="h-3 w-3" /> Email
                                            </p>
                                            <a href={`mailto:${selected.email}`} className="text-slate-800 font-bold hover:text-orange-600 transition-colors text-sm truncate block">{selected.email}</a>
                                        </div>
                                    )}
                                    {selected.country && (
                                        <div className="bg-blue-50 rounded-2xl p-4">
                                            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                                <Globe className="h-3 w-3" /> Country
                                            </p>
                                            <p className="text-blue-800 font-bold text-sm">{selected.country}</p>
                                        </div>
                                    )}
                                    <div className="bg-slate-50 rounded-2xl p-4">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</p>
                                        <p className="text-slate-700 font-bold text-sm">{new Date(selected.createdAt).toLocaleString('en-PK')}</p>
                                    </div>
                                </div>

                                {selected.message && (
                                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
                                        <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                            <MessageSquare className="h-3 w-3" /> Message
                                        </p>
                                        <p className="text-slate-700 text-sm leading-relaxed">{selected.message}</p>
                                    </div>
                                )}
                            </div>

                            {/* Modal footer */}
                            <div className="px-6 pb-6 flex gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 rounded-xl"
                                    onClick={() => markRead(selected._id, !selected.isRead)}
                                >
                                    {selected.isRead ? <><Circle className="mr-2 h-4 w-4" /> Mark Unread</> : <><CheckCircle className="mr-2 h-4 w-4" /> Mark Read</>}
                                </Button>
                                <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                                    <Button size="sm" className="rounded-xl bg-green-600 hover:bg-green-700 text-white">
                                        <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                                    </Button>
                                </a>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-xl text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => deleteContact(selected._id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageContactSubmissions;
