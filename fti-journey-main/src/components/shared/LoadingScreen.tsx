import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

interface LoadingScreenProps {
    isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
                >
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            className="mb-8"
                        >
                            <Globe className="w-16 h-16 md:w-20 md:h-20 text-white opacity-90" strokeWidth={1.2} />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-center"
                        >
                            <h2 className="text-xl md:text-2xl font-medium text-white/90 tracking-widest uppercase">
                                Preparing Your Future...
                            </h2>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                                className="h-[2px] bg-white/30 mt-4 mx-auto"
                            />
                        </motion.div>
                    </div>

                    {/* Subtle Noise Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.svg')]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
