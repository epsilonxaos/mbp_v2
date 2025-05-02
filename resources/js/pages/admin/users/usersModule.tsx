import { DataTable } from '@/components/datatable/datatable';
import { DataTableColumnHeader } from '@/components/datatable/datatable-column-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import ModulesLayout from '@/layouts/app/modules-layout';
import UserDelete from '@/pages/admin/users/userDelete';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Listado de usuarios',
        href: '/admin/usuarios',
    },
];

interface PageProps {
    users: UserList;
    [key: string]: unknown;
}

type User = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    email: string;
};
type UserList = User[];

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de creación" />,
        cell: ({ cell }) => {
            const date = new Date(cell.getValue() as string);
            return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
        },
    },
    {
        header: () => <div className="text-center">Acciones</div>,
        id: 'actions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/users/${row.original.id}`} prefetch>
                        <Button variant="link" className="text-amber-600 dark:text-amber-600">
                            Editar
                        </Button>
                    </Link>
                    <UserDelete userId={row.original.id} />
                </div>
            );
        },
    },
];

export default function UsersModule() {
    const { users } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Administrar usuarios" />

            <ModulesLayout
                title="Administrar usuarios"
                description="Aquí puedes gestionar los usuarios registrados en la plataforma."
                actions={<ActionsComponent />}
            >
                <DataTable columns={columns} data={users} />
            </ModulesLayout>
        </AppLayout>
    );
}

function ActionsComponent() {
    return (
        <div className="mb-4 flex items-center justify-end">
            <Link href={'/admin/users/create'} prefetch>
                <Button
                    variant="outline"
                    className="border-teal-700 text-teal-600 hover:bg-teal-50 hover:text-teal-700 dark:border-teal-600 dark:text-teal-600 dark:hover:bg-teal-700/10 dark:hover:text-white"
                >
                    <PlusIcon /> Agregar usuario
                </Button>
            </Link>
        </div>
    );
}
