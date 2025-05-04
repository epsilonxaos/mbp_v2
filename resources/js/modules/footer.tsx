import { cn } from '@/lib/utils';

export default function Footer({ className }: { className?: string }) {
    return (
        <footer className={cn('absolute bottom-6 left-1/2 z-10 max-w-max -translate-x-1/2 text-center font-bold text-black uppercase', className)}>
            <p>(Work in motion)</p>
            <p>Identity, narrative & interactive design</p>
            <p className="flex items-center justify-center gap-1">
                <a href="https://www.instagram.com/madeby.partners/?hl=es" target="_blank" rel="noopener noreferrer">
                    IG
                </a>
                |<a href="mailto:work@madeby.partners">Mail</a>
            </p>
            <p>® {new Date().getFullYear()} MADEBYPARTNERS</p>
        </footer>
    );
}
