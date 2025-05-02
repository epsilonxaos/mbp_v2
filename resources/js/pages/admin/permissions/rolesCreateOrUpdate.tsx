import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import ModulesLayout from '@/layouts/app/modules-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useMemo, type FormEventHandler } from 'react';

type Rol = {
    id: string;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: Permissions;
};

type Permission = {
    id: number;
    name: string;
    group: string;
    title: string;
};

type Permissions = Permission[];

type RolesForm = {
    name: string;
    permissions: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Listado de roles',
        href: '/admin/roles',
    },
    {
        title: 'Crear rol',
        href: '/admin/roles/create',
    },
];

const breadcrumbsEditing: BreadcrumbItem[] = [
    {
        title: 'Listado de roles',
        href: '/admin/roles',
    },
    {
        title: 'Editar rol',
        href: '/admin/roles/edit',
    },
];

const groupKeyReplace = (key: string) => key.toLowerCase().replace(/\s+/g, '_');
const groupKeyTitle = (key: string) => key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

export default function RolesCreateOrUpdate() {
    const { rol, permissions } = usePage<{ rol: Rol | null; permissions: Permissions }>().props;
    const isEditing = useMemo(() => !!rol, [rol]);
    const permissionGroups = useMemo(() => {
        return Object.groupBy(permissions, ({ group }) => groupKeyReplace(group));
    }, [permissions]);
    const { data, setData, processing, errors, put, post } = useForm<Required<RolesForm>>({
        name: rol?.name || '',
        permissions: rol?.permissions.map((p) => p.name) || [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        (isEditing ? put : post)(route(isEditing ? 'admin.roles.update' : 'admin.roles.store', rol?.id));
    };

    return (
        <AppLayout breadcrumbs={isEditing ? breadcrumbsEditing : breadcrumbs}>
            <Head title={isEditing ? 'Administrar roles - Editar rol' : 'Administrar roles - Crear rol'} />

            <ModulesLayout
                title={isEditing ? 'Edición de rol' : 'Creación de rol'}
                description={isEditing ? 'Edita un rol existente' : 'Crea un nuevo rol para la aplicación'}
            >
                <form className="" onSubmit={submit}>
                    <Card>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nombre del rol</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Nombre completo"
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="grid gap-2">
                                        <p className="text-sm leading-none font-medium select-none">Permisos</p>
                                        <p className="mb-2 text-sm leading-none select-none">
                                            Selecciona los permisos que deseas asignar al rol. Puedes seleccionar varios permisos a la vez.
                                        </p>

                                        <div className="grid gap-2">
                                            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                                                {Object.entries(permissionGroups).map(([group, permissions]) => (
                                                    <Card key={group}>
                                                        <CardHeader>
                                                            <CardTitle>{groupKeyTitle(group)}</CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="p-4">
                                                            <div className="grid grid-cols-1 gap-2">
                                                                {permissions?.map((perm) => (
                                                                    <div key={perm.id} className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            name="permissions[]"
                                                                            id={perm.name}
                                                                            value={perm.name}
                                                                            checked={data.permissions.includes(perm.name)}
                                                                            onCheckedChange={(checked) => {
                                                                                setData((prev) => ({
                                                                                    ...prev,
                                                                                    permissions: checked
                                                                                        ? [...prev.permissions, perm.name]
                                                                                        : prev.permissions.filter((p) => p !== perm.name),
                                                                                }));
                                                                            }}
                                                                        />
                                                                        <label
                                                                            htmlFor={perm.name}
                                                                            className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                        >
                                                                            {perm.title}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                        <InputError message={errors.permissions} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Guardar
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </ModulesLayout>
        </AppLayout>
    );
}
