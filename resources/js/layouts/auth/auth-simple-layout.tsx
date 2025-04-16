import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { useEffect, useState, type PropsWithChildren } from 'react';

import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const [isDark, setIsDark] = useState(false);
    const { appearance, toggleAppearance } = useAppearance();
    useEffect(() => {
        if (appearance === 'dark' || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
        } else {
            setIsDark(false);
        }
    }, [appearance]);

    return (
        <div className="bg-background relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <Button type="button" className="absolute top-6 right-6 size-8 cursor-pointer md:top-10 md:right-10" onClick={toggleAppearance}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={isDark ? 'dark' : 'light'}
                        initial={{ y: 3, opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -3, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isDark ? <Sun /> : <Moon />}
                    </motion.span>
                </AnimatePresence>
            </Button>

            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex items-center justify-center rounded-md">
                                <AppLogoIcon />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
