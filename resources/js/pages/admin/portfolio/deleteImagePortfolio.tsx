import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export default function DeleteImagePortfolio({ imgId }: { imgId: number }) {
    const { delete: destroy, processing, reset, clearErrors } = useForm();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('admin.portfolio.destroy.image', { id: imgId }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => toast.success('Imagen eliminada correctamente'),
            onError: () => toast.error('Error al eliminar la imagen'),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="absolute top-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded bg-red-500 text-white">
                    <button type="button">
                        <X />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>¿Estás seguro de que deseas eliminar el recurso?</DialogTitle>
                <DialogDescription>
                    Una vez que el recurso sea eliminado, los datos serán eliminados permanentemente. Por favor, haz clic en el botón de eliminar
                    recurso para confirmar que deseas eliminar permanentemente el recurso.
                </DialogDescription>
                <form className="space-y-6" onSubmit={deleteUser}>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={processing} asChild>
                            <button type="submit">Eliminar recurso</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
