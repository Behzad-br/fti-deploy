import {
    Users,
    MapPin,
    Megaphone,
    Image as ImageIcon,
    FileText,
    Settings,
    ArrowRight,
    GraduationCap,
    HelpCircle,
    DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const managementModules = [
        {
            title: "Manage Home Page",
            description: "Edit hero text and main content for the homepage.",
            icon: FileText,
            color: "text-indigo-500",
            bg: "bg-indigo-50",
            path: "/admin/pages/home",
            action: "Manage Home"
        },

        {
            title: "Manage Events",
            description: "Edit the events page hero section content.",
            icon: FileText,
            color: "text-cyan-500",
            bg: "bg-cyan-50",
            path: "/admin/pages/events",
            action: "Manage Events"
        },
        {
            title: "Manage IELTS Page",
            description: "Update IELTS hero text and recent success stories slider.",
            icon: FileText,
            color: "text-blue-500",
            bg: "bg-blue-50",
            path: "/admin/pages/ielts",
            action: "Manage IELTS"
        },
        {
            title: "Manage PTE Page",
            description: "Update PTE hero text and recent success stories slider.",
            icon: FileText,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            path: "/admin/pages/pte",
            action: "Manage PTE"
        },
        {
            title: "Manage Contact Page",
            description: "Edit the contact page hero title and description.",
            icon: FileText,
            color: "text-pink-500",
            bg: "bg-pink-50",
            path: "/admin/pages/contact",
            action: "Manage Contact"
        },
    ];


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            <motion.div
                variants={itemVariants}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Master Control Panel</h2>
                    <p className="text-muted-foreground text-lg">Select a module to start managing your website content.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm">
                    <span className="text-sm font-medium px-2 text-muted-foreground">Quick Status:</span>
                    <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-green-600 mr-2 animate-pulse"></span>
                        System Operational
                    </span>
                </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {managementModules.map((module, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <Card
                            className="group hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden cursor-pointer h-full"
                            onClick={() => navigate(module.path)}
                        >
                            <CardHeader className="relative pb-2">
                                <div className={`w-14 h-14 rounded-2xl ${module.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <module.icon className={`h-7 w-7 ${module.color}`} />
                                </div>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                    {module.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm mb-6 h-10">
                                    {module.description}
                                </CardDescription>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                                >
                                    {module.action}
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Recent Activity Section */}
            <motion.div variants={itemVariants}>
                <Card className="border-none shadow-md bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-8">
                    <CardHeader>
                        <CardTitle className="text-white">Recent System Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { action: "New Ad Campaign Created", time: "2 mins ago", user: "Admin" },
                                { action: "Hero Image Updated", time: "1 hour ago", user: "Admin" },
                                { action: "New Student Application: Ali Khan", time: "3 hours ago", user: "System" }
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-white/10 pb-2 last:border-0 last:pb-0">
                                    <span className="text-sm font-medium">{activity.action}</span>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span>{activity.user}</span>
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default AdminDashboard;

