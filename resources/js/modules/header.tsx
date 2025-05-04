import { Link, usePage } from '@inertiajs/react';

import Logo from '@/assets/img/mbp.svg';

export default function Header() {
    const { url } = usePage();

    return (
        <header className="bg-back-header absolute top-0 right-0 left-0 z-50 px-8 py-6 md:h-[110px]">
            <div className="relative flex h-full items-start justify-between text-black uppercase">
                <div className="font-bold">Eng | Esp</div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/" className="outline-none">
                        <img className="w-[200px] sm:w-[325px]" src={Logo} alt="Made by Partners" />
                    </Link>
                </div>

                {url !== '/about' ? (
                    <div className="text-right font-bold">
                        <Link href="/about" className="">
                            About Us
                        </Link>
                    </div>
                ) : (
                    <div className="text-right font-bold">
                        <Link href="/" className="">
                            Work
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
