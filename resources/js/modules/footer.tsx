import { cn } from '@/lib/utils';

export default function Footer({ className }: { className?: string }) {
    return (
        <footer
            className={cn(
                'z-10 py-10 text-center font-bold text-black uppercase md:absolute md:bottom-6 md:left-1/2 md:max-w-max md:-translate-x-1/2 md:py-0',
                className,
            )}
        >
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
