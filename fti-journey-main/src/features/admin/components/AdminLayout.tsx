import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    FileText,
    Image as ImageIcon,
    Settings,
    LogOut,
    GraduationCap,
    Megaphone,
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
    Search,
    Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/auth/AuthContext';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate(user?.role === 'admin' ? '/admin/login' : '/employee/login');
    };

    const basePath = user?.role === 'admin' ? '/admin' : '/employee';

    let menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: `${basePath}/dashboard` },
        { icon: FileText, label: 'Manage Home', path: `${basePath}/pages/home` },
        { icon: FileText, label: 'Manage Events', path: `${basePath}/pages/events` },
        { icon: FileText, label: 'Manage IELTS', path: `${basePath}/pages/ielts` },
        { icon: FileText, label: 'Manage PTE', path: `${basePath}/pages/pte` },
        { icon: FileText, label: 'Manage Contact', path: `${basePath}/pages/contact` },
        { icon: Mail, label: 'Contact Submissions', path: `${basePath}/contact-submissions` },
        { icon: FileText, label: 'Consultation Enquiries', path: `${basePath}/enquiries` },
        { icon: Settings, label: 'Test Prep Queries', path: `${basePath}/test-queries` },
        { icon: Settings, label: 'Settings', path: `${basePath}/settings` },
    ];

    if (user?.role !== 'admin') {
        menuItems = menuItems.filter(item => item.path !== `${basePath}/settings`);
    }

    const sidebarVariants = {
        expanded: { width: 280, transition: { duration: 0.4, ease: "easeInOut" } },
        collapsed: { width: 88, transition: { duration: 0.4, ease: "easeInOut" } }
    };

    const navItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.1 + (i * 0.05),
                duration: 0.4,
                ease: "easeOut"
            }
        })
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            {/* Sidebar */}
            <motion.aside
                initial="expanded"
                animate={isSidebarCollapsed ? "collapsed" : "expanded"}
                variants={sidebarVariants}
                className="bg-white border-r border-slate-200 fixed h-full z-30 hidden md:flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)]"
            >
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 overflow-hidden shrink-0">
                    <AnimatePresence mode="wait">
                        {!isSidebarCollapsed && (
                            <motion.div
                                key="logo-full"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src="/fti_logo_transparent.png"
                                    alt="FTI"
                                    className="h-9 w-9 object-contain rounded-none"
                                />
                                <span className="font-bold text-xl tracking-tight text-slate-800">Admin</span>
                            </motion.div>
                        )}
                        {isSidebarCollapsed && (
                            <motion.div
                                key="logo-short"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mx-auto"
                            >
                                <img
                                    src="/fti_logo_transparent.png"
                                    alt="FTI"
                                    className="h-10 w-10 object-contain rounded-none"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex-1 flex flex-col pt-6 overflow-hidden">
                    {!isSidebarCollapsed && (
                        <div className="px-6 mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search modules..."
                                    className="pl-10 h-10 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-primary/20 text-sm"
                                />
                            </div>
                        </div>
                    )}

                    <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                        {menuItems.map((item, i) => (
                            <motion.div
                                key={item.path}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={navItemVariants}
                            >
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-300 group relative ${isActive
                                            ? 'text-primary'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon size={22} className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
                                            {!isSidebarCollapsed && (
                                                <span className="font-semibold text-[15px] whitespace-nowrap">
                                                    {item.label}
                                                </span>
                                            )}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNavHighlight"
                                                    className="absolute inset-0 bg-primary/10 rounded-xl"
                                                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </motion.div>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-slate-100 bg-slate-50/50 mt-auto">
                        {!isSidebarCollapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-3 p-2 mb-4 bg-white rounded-xl shadow-sm border border-slate-100"
                            >
                                <Avatar className="h-10 w-10 border-2 border-slate-50">
                                    <AvatarImage src={undefined} />
                                    <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                        {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold truncate text-slate-800">{user?.name ?? 'Admin User'}</p>
                                    <p className="text-[11px] text-slate-500 truncate font-medium">{user?.email ?? '—'}</p>
                                </div>
                            </motion.div>
                        )}
                        <Button
                            variant="ghost"
                            className={`w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50/50 transition-all group h-11 rounded-xl ${isSidebarCollapsed ? 'px-2 justify-center' : 'px-4'}`}
                            onClick={handleLogout}
                        >
                            <LogOut size={20} className={`${isSidebarCollapsed ? '' : 'mr-3'} shrink-0 group-hover:-translate-x-1 transition-transform`} />
                            {!isSidebarCollapsed && <span className="font-bold text-sm">Logout System</span>}
                        </Button>
                    </div>
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -right-3 top-24 h-6 w-6 rounded-full border border-slate-200 bg-white flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors z-50 text-slate-400 hover:text-slate-600"
                >
                    {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </motion.aside>

            {/* Main Content Area */}
            <main
                className={`flex-1 transition-all duration-400 ease-[0.4, 0, 0.2, 1] min-h-screen ${isSidebarCollapsed ? 'md:ml-[88px]' : 'md:ml-[280px]'}`}
            >
                <div className="p-8 lg:p-10 max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

