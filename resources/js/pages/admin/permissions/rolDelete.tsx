import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

export default function RolDelete({ rolId }: { rolId: string }) {
    const { delete: destroy, processing, reset, clearErrors } = useForm({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('admin.roles.destroy', { id: rolId }), {
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
                <DialogTitle>¿Estás seguro de que deseas eliminar el rol?</DialogTitle>
                <DialogDescription>
                    Una vez que el rol sea eliminado, los usarios que tengan asignado este rol perderán el acceso a las funcionalidades asociadas a
                    este rol. Por favor, haz clic en el botón de eliminar rol para confirmar que deseas eliminar permanentemente el rol.
                </DialogDescription>
                <form className="space-y-6" onSubmit={deleteUser}>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={processing} asChild>
                            <button type="submit">Eliminar</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
