import { API_BASE_URL } from '../../../config/api';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Key, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/auth/AuthContext';

const AdminSettings = () => {
    const { token, user } = useAuth();
    
    // Password state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updatingPassword, setUpdatingPassword] = useState(false);

    // Employee state
    const [employees, setEmployees] = useState<any[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState(true);
    const [newEmployee, setNewEmployee] = useState({ name: '', email: '', password: '' });
    const [creatingEmployee, setCreatingEmployee] = useState(false);

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchEmployees();
        }
    }, [user]);

    const fetchEmployees = async () => {
        try {
            setLoadingEmployees(true);
            const res = await fetch(`${API_BASE_URL}/auth/employees`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setEmployees(data);
            }
        } catch (error) {
            console.error('Failed to fetch employees');
        } finally {
            setLoadingEmployees(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast({ title: 'Passwords do not match', variant: 'destructive' });
            return;
        }

        try {
            setUpdatingPassword(true);
            const res = await fetch(`${API_BASE_URL}/auth/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            if (res.ok) {
                toast({ title: 'Password updated successfully' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                const error = await res.json();
                toast({ title: error.message || 'Failed to update password', variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Network error', variant: 'destructive' });
        } finally {
            setUpdatingPassword(false);
        }
    };

    const handleCreateEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setCreatingEmployee(true);
            const res = await fetch(`${API_BASE_URL}/auth/employees`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newEmployee)
            });

            if (res.ok) {
                toast({ title: 'Employee created successfully' });
                setNewEmployee({ name: '', email: '', password: '' });
                fetchEmployees();
            } else {
                const error = await res.json();
                toast({ title: error.message || 'Failed to create employee', variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Network error', variant: 'destructive' });
        } finally {
            setCreatingEmployee(false);
        }
    };

    const handleDeleteEmployee = async (id: string) => {
        if (!confirm('Are you sure you want to delete this employee?')) return;
        
        try {
            const res = await fetch(`${API_BASE_URL}/auth/employees/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                toast({ title: 'Employee deleted successfully' });
                fetchEmployees();
            } else {
                toast({ title: 'Failed to delete employee', variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Network error', variant: 'destructive' });
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Admin Settings</h2>
                <p className="text-slate-500">Manage your account and employee access.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Change Password Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
                    <div className="flex items-center gap-2 mb-6 text-slate-800">
                        <Key className="h-5 w-5" />
                        <h3 className="text-lg font-bold">Change Password</h3>
                    </div>
                    
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Current Password</label>
                            <Input 
                                type="password" 
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">New Password</label>
                            <Input 
                                type="password" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                            <Input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" disabled={updatingPassword} className="w-full">
                            {updatingPassword ? 'Updating...' : 'Update Password'}
                        </Button>
                    </form>
                </div>


            </div>

            {/* Employees List */}
            {user?.role === 'admin' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold mb-4">Employee Accounts</h3>
                    {loadingEmployees ? (
                        <p className="text-slate-500">Loading employees...</p>
                    ) : employees.length === 0 ? (
                        <p className="text-slate-500 text-sm">No employees found.</p>
                    ) : (
                        <div className="space-y-3">
                            {employees.map(emp => (
                                <div key={emp._id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                                    <div>
                                        <p className="font-semibold text-slate-800">{emp.name}</p>
                                        <p className="text-xs text-slate-500">{emp.email}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => handleDeleteEmployee(emp._id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminSettings;
