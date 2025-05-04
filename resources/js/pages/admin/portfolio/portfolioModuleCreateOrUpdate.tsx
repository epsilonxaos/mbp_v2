import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, X } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_URL_STORAGE } from '@/constants/app';
import AppLayout from '@/layouts/app-layout';
import ModulesLayout from '@/layouts/app/modules-layout';
import { toSlug } from '@/lib/utils';
import DeleteImagePortfolio from '@/pages/admin/portfolio/deleteImagePortfolio';
import type { BreadcrumbItem } from '@/types';

type PortfolioForm = {
    name: string;
    slug: string;
    description: string | null;
    content: string | null;
    galleries: File[] | null;
};

type PortfolioGallery = {
    created_at: string;
    id: number;
    image_path: string;
    portfolio_id: number;
    updated_at: string;
};
type Portfolio = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    content: string | null;
    created_at: string;
    updated_at: string;
    galleries: PortfolioGallery[] | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Listado de portafolios',
        href: '/admin/portfolio',
    },
    {
        title: 'Crear portafolio',
        href: '/admin/portfolio/create',
    },
];

const breadcrumbsEditing: BreadcrumbItem[] = [
    {
        title: 'Listado de portafolios',
        href: '/admin/portfolio',
    },
    {
        title: 'Editar portafolio',
        href: '/admin/portfolio/edit',
    },
];

export default function PortfolioModuleCreateOrUpdate() {
    const { portfolio } = usePage<{ portfolio: Portfolio | null }>().props;
    const isEditing = useMemo(() => !!portfolio, [portfolio]);
    const [newGalleries, setNewGalleries] = useState<File[]>([]);
    const { data, setData, post, processing, errors } = useForm<Required<PortfolioForm>>({
        name: '',
        slug: '',
        description: null,
        content: null,
        galleries: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('data', data);

        if (!isEditing) {
            post(route('admin.portfolio.store'));
        } else {
            post(route('admin.portfolio.update', portfolio?.id), {
                onBefore: ({ data }) => {
                    console.log('onBefore', data);
                },
            });
        }
    };

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            galleries: newGalleries.length > 0 ? newGalleries : null,
        }));
    }, [newGalleries, setData]);

    useEffect(() => {
        if (!isEditing) {
            setData('slug', toSlug(data.name));
        }
    }, [data.name, isEditing, setData]);

    useEffect(() => {
        if (isEditing && portfolio) {
            setData((prev) => ({
                ...prev,
                name: portfolio.name || '',
                slug: portfolio.slug || '',
                description: portfolio.description || null,
                content: portfolio.content || null,
                galleries: null,
            }));
        }
    }, [portfolio, isEditing, setData]);

    return (
        <AppLayout breadcrumbs={isEditing ? breadcrumbsEditing : breadcrumbs}>
            <Head title={isEditing ? 'Administrar portfolios - Editar portafolio' : 'Administrar portfolios - Crear portafolio'} />

            <ModulesLayout
                title={isEditing ? 'Edición de portafolio' : 'Creación de portafolio'}
                description={isEditing ? 'Edita un portafolio existente' : 'Crea un nuevo portafolio para la aplicación'}
            >
                <form className="" onSubmit={submit}>
                    <Card className="mb-4">
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nombre del portafolio</Label>
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
                                            placeholder="Nombre del portafolio"
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="galleries">Galeria de fotos</Label>
                                        <Input
                                            id="galleries"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                if (!files) return;
                                                const newFiles = Array.from(files);
                                                setNewGalleries((prev) => [...prev, ...newFiles]);

                                                // Limpiar input para que pueda volver a seleccionar los mismos archivos
                                                e.target.value = '';
                                            }}
                                            disabled={processing}
                                        />
                                    </div>
                                </div>

                                {newGalleries.length > 0 && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="galleries">Nuevas imagenes para cargar</Label>
                                        <div className="grid grid-cols-2 gap-2 pt-4 md:grid-cols-4 lg:grid-cols-5">
                                            {newGalleries.map((gallery, index) => (
                                                <div className="relative" key={index}>
                                                    <div className="absolute top-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newFiles = newGalleries.filter((_, i) => i !== index);
                                                                setNewGalleries(newFiles);
                                                            }}
                                                        >
                                                            <X />
                                                        </button>
                                                    </div>
                                                    <img
                                                        src={URL.createObjectURL(gallery)}
                                                        alt={`Gallery ${index + 1}`}
                                                        className="aspect-square rounded object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <CardFooter>
                                    <Button type="submit" className="mx-auto mt-2" tabIndex={5} disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Guardar
                                    </Button>
                                </CardFooter>
                            </div>
                        </CardContent>
                    </Card>
                </form>

                {isEditing && portfolio && portfolio.galleries && portfolio.galleries.length > 0 && (
                    <Card>
                        <CardContent>
                            <div className="grid gap-2">
                                <Label htmlFor="galleries">Galeria de imagenes</Label>
                                <div className="grid grid-cols-2 gap-2 pt-4 md:grid-cols-4 lg:grid-cols-5">
                                    {portfolio.galleries.map((gallery, index) => (
                                        <div className="relative" key={index}>
                                            <DeleteImagePortfolio imgId={gallery.id} />

                                            <img
                                                key={data.slug + '-' + gallery.id}
                                                src={APP_URL_STORAGE + gallery.image_path}
                                                alt={data.slug + '-' + gallery.id}
                                                className="aspect-square rounded object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </ModulesLayout>
        </AppLayout>
    );
}
