import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useMemo } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import ModulesLayout from '@/layouts/app/modules-layout';
import type { BreadcrumbItem } from '@/types';

type UserCreateForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type User = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    email: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Listado de usuarios',
        href: '/admin/users',
    },
    {
        title: 'Crear usuario',
        href: '/admin/users/create',
    },
];

const breadcrumbsEditing: BreadcrumbItem[] = [
    {
        title: 'Listado de usuarios',
        href: '/admin/users',
    },
    {
        title: 'Crear usuario',
        href: '/admin/users/create',
    },
];

export default function UsersModuleCreateOrUpdate() {
    const { user } = usePage<{ user: User | null }>().props;
    const isEditing = useMemo(() => !!user, [user]);
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<UserCreateForm>>({
        name: isEditing ? user?.name || '' : '',
        email: isEditing ? user?.email || '' : '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        (isEditing ? put : post)(route(isEditing ? 'admin.users.update' : 'admin.users.store', user?.id), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout breadcrumbs={isEditing ? breadcrumbsEditing : breadcrumbs}>
            <Head title={isEditing ? 'Administrar usuarios - Editar usuario' : 'Administrar usuarios - Crear usuario'} />

            <ModulesLayout
                title={isEditing ? 'Edición de usuario' : 'Creación de usuario'}
                description={isEditing ? 'Edita un usuario existente' : 'Crea un nuevo usuario para la aplicación'}
            >
                <form className="" onSubmit={submit}>
                    <Card>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nombre completo</Label>
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
                                        <Label htmlFor="email">Dirección de correo electrónico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...(isEditing ? {} : { required: true })}
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            disabled={processing}
                                            placeholder="Contraseña"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            {...(isEditing ? {} : { required: true })}
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            disabled={processing}
                                            placeholder="Confirmar contraseña"
                                        />
                                        <InputError message={errors.password_confirmation} />
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
