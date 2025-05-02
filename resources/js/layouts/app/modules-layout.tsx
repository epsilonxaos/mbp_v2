import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { type PropsWithChildren } from 'react';

export default function ModulesLayout({
    children,
    title,
    description,
    actions,
}: PropsWithChildren & { title?: string; description?: string; actions?: React.ReactNode }) {
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="px-4 py-6 lg:px-8 lg:py-10 xl:px-20">
            <div className="flex flex-col items-center justify-between sm:flex-row">
                <Heading title={title || 'Modulo'} description={description || ''} />
                {actions && <div className="mb-4">{actions}</div>}
            </div>

            <Separator className="my-6 md:hidden" />
            {/* <Heading title={title || 'Modulo'} description={description || ''} />
            {actions && <div className="mb-4">{actions}</div>} */}

            <section className="container mx-auto">{children}</section>
        </div>
    );
}
