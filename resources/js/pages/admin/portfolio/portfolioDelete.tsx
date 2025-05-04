import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function PortfolioDelete({ id }: { id: number | string }) {
    const { delete: destroy, processing, reset, clearErrors } = useForm({ password: '' });

    const deletePortfolio: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('admin.portfolio.destroy', { id }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => closeModal(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="text-red-600 dark:text-red-700">
                    Eliminar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>¿Estás seguro de que deseas eliminar este elemento?</DialogTitle>
                <DialogDescription>
                    Una vez que este elemento sea eliminado, los datos serán eliminados permanentemente. Por favor, haz clic en el botón de eliminar
                    elemento para confirmar que deseas eliminar permanentemente el elemento.
                </DialogDescription>
                <form className="space-y-6" onSubmit={deletePortfolio}>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={processing} asChild>
                            <button type="submit">Eliminar elemento</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
