import { API_BASE_URL } from '../../../config/api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw } from 'lucide-react';
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

const ManageWhatsAppSettings = () => {
    const [settings, setSettings] = useState<WhatsAppSettings>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { token } = useAuth();

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/settings/whatsapp`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setSettings(data);
            } else {
                toast({ title: 'Failed to fetch settings', variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Network error', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async () => {
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

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">WhatsApp Settings</h2>
                    <p className="text-slate-500">Manage WhatsApp contact numbers for different target countries.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={fetchSettings} disabled={loading || saving}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90">
                        <Save className="mr-2 h-4 w-4" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                {loading ? (
                    <div className="text-center py-10 text-slate-500">Loading settings...</div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {COUNTRIES.map((country, index) => (
                                <motion.div 
                                    key={country}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="space-y-2"
                                >
                                    <label className="text-sm font-semibold text-slate-700">
                                        {country} WhatsApp Number
                                    </label>
                                    <Input 
                                        placeholder="+923000000000" 
                                        value={settings[country] || ''}
                                        onChange={(e) => handleChange(country, e.target.value)}
                                        className="bg-slate-50 focus-visible:ring-primary/20"
                                    />
                                    <p className="text-xs text-slate-400">Include country code (e.g. +92)</p>
                                </motion.div>
                            ))}
                        </div>

                        <h3 className="text-xl font-bold mt-8 mb-4 border-t pt-6">Branch / Floating Icon Numbers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {BRANCHES.map((branch, index) => (
                                <motion.div 
                                    key={branch.key}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="space-y-2"
                                >
                                    <label className="text-sm font-semibold text-slate-700">
                                        {branch.label}
                                    </label>
                                    <Input 
                                        placeholder="+923000000000" 
                                        value={settings[branch.key] || ''}
                                        onChange={(e) => handleChange(branch.key, e.target.value)}
                                        className="bg-slate-50 focus-visible:ring-primary/20"
                                    />
                                    <p className="text-xs text-slate-400">Used for Contact Page and Floating Icon</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageWhatsAppSettings;
