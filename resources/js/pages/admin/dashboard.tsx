import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { GalleryVerticalEnd, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex h-full flex-col items-center justify-center text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Bienvenido al Panel de Administración</h1>
                    <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-300">
                        Aquí puedes gestionar las configuraciones y datos de la aplicación.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <Link href="/admin/users" prefetch>
                            <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                <Users className="mx-auto mb-6" size={30} />
                                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Usuarios</h2>
                                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    Gestiona los usuarios registrados en la plataforma.
                                </p>
                            </div>
                        </Link>
                        <Link href="/admin/portfolio" prefetch>
                            <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                                <GalleryVerticalEnd className="mx-auto mb-6" size={30} />
                                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Portafolio</h2>
                                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">Gestiona los elementos del portafolio.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
