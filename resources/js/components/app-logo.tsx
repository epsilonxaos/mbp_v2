import AppLogoIcon from './app-logo-icon';

import MBPIcon from '@/assets/img/icon.svg';

const AppLogo = () => {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <AppLogoIcon src={MBPIcon} className="w-auto object-contain object-center invert dark:invert-0" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Made by Partners</span>
                <span className="truncate text-xs">Panel administrativo</span>
            </div>
        </>
    );
};

export default AppLogo;
