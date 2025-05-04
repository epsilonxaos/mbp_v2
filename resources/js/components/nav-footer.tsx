import { Icon } from '@/components/icon';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import usePermission from '@/hooks/use-permission';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useMemo, type ComponentPropsWithoutRef } from 'react';

export function NavFooter({
    items,
    className,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    items: NavItem[];
}) {
    const page = usePage();
    const can = usePermission();
    const permissions = useMemo(() => items.map((item) => item.permissions as string), [items]);

    if (!can(permissions, { every: false })) return null;

    return (
        <SidebarGroup {...props} className={`px-0 group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupLabel>Administrador</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (item.permissions && !can(item.permissions)) return null;

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
