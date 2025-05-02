import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import ModulesLayout from '@/layouts/app/modules-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/admin/usuarios',
    },
];

interface PageProps {
    users: UserList;
    [key: string]: unknown; // Add index signature to satisfy the type constraint
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
    // {
    //     accessorKey: 'updated_at',
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Última actualización" />,
    //     cell: ({ cell }) => {
    //         const date = new Date(cell.getValue() as string);
    //         return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    //     },
    // },
];

export default function UserList() {
    const { users } = usePage<PageProps>().props;

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ id: string }>>({ id: '' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Administrar usuarios" />

            <ModulesLayout title="Administrar usuarios" description="Aquí puedes gestionar los usuarios registrados en la plataforma.">
                <div className="mb-4 flex items-center justify-end">
                    <Button variant="outline" className="mr-2" onClick={() => (window.location.href = '/admin/usuarios/create')}>
                        <PlusIcon /> Agregar usuario
                    </Button>
                </div>

                <DataTable columns={columns} data={users} />
            </ModulesLayout>
        </AppLayout>
    );
}

import { DataTable } from '@/components/datatable/datatable';
import { DataTableColumnHeader } from '@/components/datatable/datatable-column-header';
