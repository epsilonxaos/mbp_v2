import AppLogoIcon from './app-logo-icon';

import MBPIcon from '@/assets/img/mbp-icon-clear.png';

export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-md">
                <AppLogoIcon src={MBPIcon} className="object-contain object-center" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Laravel Starter Kit</span>
            </div>
        </>
    );
}
