import { usePage } from '@inertiajs/react';

type PageProps = {
    permissions: string[];
    [key: string]: unknown;
};

export default function usePermission() {
    const { permissions } = usePage<PageProps>().props.auth;

    const hasPermission = (required: string | string[], options?: { every?: boolean }) => {
        if (!permissions) return false;

        if (Array.isArray(required)) {
            return options?.every
                ? required.every((p) => permissions.includes(p)) // todos los permisos
                : required.some((p) => permissions.includes(p)); // al menos uno
        }

        return permissions.includes(required);
    };

    return hasPermission;
}
