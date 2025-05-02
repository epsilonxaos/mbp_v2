import Heading from '@/components/heading';
import { type PropsWithChildren } from 'react';

export default function ModulesLayout({ children, title, description }: PropsWithChildren & { title?: string; description?: string }) {
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="px-4 py-6 lg:px-8 lg:py-10 xl:px-20">
            <Heading title={title || 'Modulo'} description={description || ''} />

            <section className="container mx-auto">{children}</section>
        </div>
    );
}
