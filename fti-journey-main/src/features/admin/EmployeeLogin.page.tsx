import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/auth/AuthContext';

// Form validation schema
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const EmployeeLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const loginRole = 'employee';
    const navigate = useNavigate();
    const { login } = useAuth();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            await login(data.email, data.password, loginRole);
            toast.success("Login successful", {
                description: `Welcome back, ${loginRole === 'admin' ? 'Administrator' : 'Employee'}!`,
            });
            navigate('/employee/dashboard');
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : 'Login failed. Please try again.';
            toast.error("Login failed", { description: message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[100px]"
                />
                <motion.div
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[80px]"
                />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "out" }}
                className="w-full max-w-md px-6 relative z-10"
            >
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden p-8 md:p-10">



                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            key={loginRole}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 shadow-lg mb-6"
                        >
                            <Lock className="w-8 h-8 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground">
                            Sign in to access your employee dashboard
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium ml-1">Email Address</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <Input
                                    {...form.register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="employee@fti.edu.pk"
                                    className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all rounded-xl"
                                />
                            </div>
                            {form.formState.errors.email && (
                                <span className="text-red-500 text-xs ml-1 block">{form.formState.errors.email.message}</span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                <Link to="#" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <Input
                                    {...form.register("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                                    className="pl-10 pr-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-primary/50 transition-all rounded-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {form.formState.errors.password && (
                                <span className="text-red-500 text-xs ml-1 block">{form.formState.errors.password.message}</span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 text-lg font-semibold rounded-xl gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            Not an admin?{' '}
                            <Link to="/" className="text-primary font-semibold hover:underline">
                                Return to Home
                            </Link>
                        </p>
                    </div>

                </div>

                {/* Footer info */}
                <p className="text-center text-xs text-muted-foreground/50 mt-8">
                    &copy; {new Date().getFullYear()} Future Target Institute. Secure Admin Portal.
                </p>
            </motion.div>
        </div>
    );
};

export default EmployeeLogin;
