import { Link, usePage } from '@inertiajs/react';

import Logo from '@/assets/img/mbp.svg';
import { useTranslation } from 'react-i18next';

export default function Header() {
    return (
        <header className="bg-back-header relative top-0 right-0 left-0 z-50 px-8 py-6 md:absolute md:h-[110px]">
            <div className="relative grid h-full grid-cols-2 items-start justify-between text-black uppercase">
                <LanguageSelectorComponent />

                <div className="relative order-1 col-span-2 pb-4 md:absolute md:top-1/2 md:left-1/2 md:order-2 md:-translate-x-1/2 md:-translate-y-1/2 md:pb-0">
                    <Link href="/" className="mx-auto block max-w-max outline-none">
                        <img className="w-[260px] md:w-[325px]" src={Logo} alt="Made by Partners" />
                    </Link>
                </div>

                <AboutSection />
            </div>
        </header>
    );
}

const LanguageSelectorComponent = () => {
    const { i18n } = useTranslation();
    return (
        <div className="order-2 flex items-center justify-center gap-2 font-bold md:order-1 md:justify-start">
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
    );
};

const AboutSection = () => {
    const { url } = usePage();
    const { t } = useTranslation();

    if (url !== '/about')
        return (
            <div className="order-3 text-center font-bold md:text-right">
                <Link href="/about" className="">
                    {t('header.about')}
                </Link>
            </div>
        );

    return (
        <div className="order-3 text-center font-bold md:text-right">
            <Link href="/" className="">
                {t('header.work')}
            </Link>
        </div>
    );
};
