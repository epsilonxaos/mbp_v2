import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { Permissions } from '@/constants/permissions';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { GalleryVerticalEnd, LayoutGrid, ShieldCheck, User } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Portafolio',
        href: '/admin/portfolio',
        icon: GalleryVerticalEnd,
        permissions: Permissions.PortFolioView,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Administrar usuarios',
        href: '/admin/users',
        icon: User,
        permissions: Permissions.UserView,
    },
    {
        title: 'Roles y permisos',
        href: '/admin/roles',
        icon: ShieldCheck,
        permissions: Permissions.RoleView,
    },
];

export function AppSidebar() {
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                {open ? <AppearanceToggleTab /> : <AppearanceToggleDropdown />}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
