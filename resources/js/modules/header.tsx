import { Link, usePage } from '@inertiajs/react';

import Logo from '@/assets/img/mbp.svg';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { url } = usePage();
    const { t, i18n } = useTranslation();

    return (
        <header className="bg-back-header absolute top-0 right-0 left-0 z-50 px-8 py-6 md:h-[110px]">
            <div className="relative flex h-full items-start justify-between text-black uppercase">
                <div className="flex items-center gap-2 font-bold">
                    <button className="relative uppercase" type="button" onClick={() => i18n.changeLanguage('en')}>
                        eng
                        {i18n.language === 'en' && <div className="absolute bottom-0 left-0 w-full border-1 border-black" />}
                    </button>
                    |
                    <button className="relative uppercase" type="button" onClick={() => i18n.changeLanguage('es')}>
                        esp
                        {i18n.language === 'es' && <div className="absolute bottom-0 left-0 w-full border-1 border-black" />}
                    </button>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/" className="outline-none">
                        <img className="w-[200px] sm:w-[325px]" src={Logo} alt="Made by Partners" />
                    </Link>
                </div>

                {url !== '/about' ? (
                    <div className="text-right font-bold">
                        <Link href="/about" className="">
                            {t('header.about')}
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
