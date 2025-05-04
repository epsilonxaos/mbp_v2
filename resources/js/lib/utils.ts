import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toSlug(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Elimina caracteres no alfanuméricos
        .replace(/[\s_-]+/g, '-') // Reemplaza espacios y guiones bajos por guión
        .replace(/^-+|-+$/g, ''); // Quita guiones al inicio y final
}
