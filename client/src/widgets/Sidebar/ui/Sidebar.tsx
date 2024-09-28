import { Divider, Image } from '@nextui-org/react';

import classes from './Sidebar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/config/routeConfig';
import LogoutIcon from '@/shared/icons/logout-icon.svg?react';
import HomeIcon from '@/shared/icons/home-icon.svg?react';
import FolderIcon from '@/shared/icons/folder-icon.svg?react';
import ProjectIcon from '@/shared/icons/projects-icon.svg?react';
import { Icon } from '@/shared/ui/Icon/Icon';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    return (
        <aside className={classNames(classes.Sidebar, {}, [className])}>
            <VStack maxH maxW align="center">
                <Image src="/static/logo.webp" width="75%" />

                <VStack className="-translate-y-16" flexGrow maxW justify="center" align="center">
                    <VStack maxW gap="8px" justify="center" align="center">
                        <AppLink to={RoutePath.main}>
                            <Icon className="text-white" Svg={HomeIcon} />
                        </AppLink>
                        <AppLink to={RoutePath.projects}>
                            <Icon className="text-white" Svg={ProjectIcon} />
                        </AppLink>
                        <AppLink to={RoutePath.main}>
                            <Icon className="text-white" Svg={FolderIcon} />
                        </AppLink>
                    </VStack>
                    <Divider className="bg-white w-2/4 my-3" />
                    <AppLink to={RoutePath.main}>
                        <Icon className="text-red-500" Svg={LogoutIcon} />
                    </AppLink>
                </VStack>
            </VStack>
        </aside>
    );
};
