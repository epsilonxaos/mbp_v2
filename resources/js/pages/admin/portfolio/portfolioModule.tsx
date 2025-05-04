import { DataTable } from '@/components/datatable/datatable';
import { DataTableColumnHeader } from '@/components/datatable/datatable-column-header';
import { Button } from '@/components/ui/button';
import { Permissions } from '@/constants/permissions';
import usePermission from '@/hooks/use-permission';
import AppLayout from '@/layouts/app-layout';
import ModulesLayout from '@/layouts/app/modules-layout';
import PortfolioDelete from '@/pages/admin/portfolio/portfolioDelete';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Listado de portafolio',
        href: '/admin/portfolio',
    },
];

interface PageProps {
    portfolios: PortfolioArray;
    [key: string]: unknown;
}

type Portfolio = {
    id: string;
    name: string;
    slug: string;
    description: string;
    content: string;
    created_at: string;
    updated_at: string;
};
type PortfolioArray = Portfolio[];

const columns: ColumnDef<Portfolio>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
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
            return <ActionsRowComponent {...(row.original as Portfolio)} />;
        },
    },
];

function ActionsRowComponent(data: Portfolio) {
    const can = usePermission();

    return (
        <div className="flex items-center justify-center gap-2">
            {can(Permissions.PortFolioEdit) && (
                <Link href={`/admin/portfolio/${data.id}`}>
                    <Button variant="link" className="text-amber-600 dark:text-amber-600">
                        Editar
                    </Button>
                </Link>
            )}

            {can(Permissions.PortFolioDelete) && <PortfolioDelete id={data.id} />}
        </div>
    );
}

export default function PortfolioModule() {
    const { portfolios } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Administrar portafolio" />

            <ModulesLayout
                title="Administrar portafolio"
                description="Aquí puedes gestionar los elementos del portafolio."
                actions={<ActionsComponent />}
            >
                <DataTable columns={columns} data={portfolios} />
            </ModulesLayout>
        </AppLayout>
    );
}

function ActionsComponent() {
    const can = usePermission();

    return (
        <div className="mb-4 flex items-center justify-end">
            {can(Permissions.PortFolioCreate) && (
                <Link href={'/admin/portfolio/create'} prefetch>
                    <Button
                        variant="outline"
                        className="border-teal-700 text-teal-600 hover:bg-teal-50 hover:text-teal-700 dark:border-teal-600 dark:text-teal-600 dark:hover:bg-teal-700/10 dark:hover:text-white"
                    >
                        <PlusIcon /> Agregar portafolio
                    </Button>
                </Link>
            )}
        </div>
    );
}
