import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

type PageProps = {
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
};

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Toaster position="bottom-right" />
            {children}
        </AppLayoutTemplate>
    );
};
