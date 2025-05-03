import { DataTable } from '@/components/datatable/datatable';
import { DataTableColumnHeader } from '@/components/datatable/datatable-column-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import ModulesLayout from '@/layouts/app/modules-layout';
import RolDelete from '@/pages/admin/permissions/rolDelete';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import type { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';

type Roles = {
    id: string;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
};
type RolesList = Roles[];
type PageProps = {
    roles: RolesList;
    [key: string]: unknown;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Listado de roles',
        href: '/admin/roles',
    },
];

const columns: ColumnDef<Roles>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre del rol" />,
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
                    <Link href={`/admin/roles/${row.original.id}`}>
                        <Button variant="link" className="text-amber-600 dark:text-amber-600">
                            Editar
                        </Button>
                    </Link>
                    <RolDelete rolId={row.original.id} />
                </div>
            );
        },
    },
];

export default function RolesAndPermissions() {
    const { roles } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Administrar roles y permisos" />

            <ModulesLayout
                title="Administrar roles y permisos"
                description="Aquí puedes gestionar los roles y permisos de los usuarios en la plataforma."
                actions={<ActionsComponent />}
            >
                <DataTable columns={columns} data={roles} />
            </ModulesLayout>
        </AppLayout>
    );
}

function ActionsComponent() {
    return (
        <div className="mb-4 flex items-center justify-end">
            <Link href={'/admin/roles/create'} prefetch>
                <Button
                    variant="outline"
                    className="border-teal-700 text-teal-600 hover:bg-teal-50 hover:text-teal-700 dark:border-teal-600 dark:text-teal-600 dark:hover:bg-teal-700/10 dark:hover:text-white"
                >
                    <PlusIcon /> Nuevo rol
                </Button>
            </Link>
        </div>
    );
}
