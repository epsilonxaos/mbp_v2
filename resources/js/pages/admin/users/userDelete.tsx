import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function UserDelete({ userId }: { userId: string }) {
    const { delete: destroy, processing, reset, clearErrors } = useForm({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('admin.users.destroy', { id: userId }), {
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
                <DialogTitle>¿Estás seguro de que deseas eliminar tu cuenta?</DialogTitle>
                <DialogDescription>
                    Una vez que tu cuenta sea eliminada, los datos serán eliminados permanentemente. Por favor, haz clic en el botón de eliminar
                    cuenta para confirmar que deseas eliminar permanentemente la cuenta.
                </DialogDescription>
                <form className="space-y-6" onSubmit={deleteUser}>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={processing} asChild>
                            <button type="submit">Eliminar cuenta</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
