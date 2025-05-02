import LogoMPB from '@/assets/img/mbp.svg';
import { cn } from '@/components/cn';

export default function AppLogoIcon({ src, className }: { src?: string; className?: string }) {
    return (
        <img
            src={src || LogoMPB}
            alt="Logo MBP"
            className={cn('mx-auto h-[50px] w-[320px] overflow-hidden object-cover object-top dark:invert', className)}
        />
    );
}
