import Header from '@/modules/header';
import { Head } from '@inertiajs/react';

import '../../css/index.css';

export default function WebLayout({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <div className="flex h-screen flex-col">
            <Head title={title} />

            <Header />
            <main>{children}</main>
        </div>
    );
}
