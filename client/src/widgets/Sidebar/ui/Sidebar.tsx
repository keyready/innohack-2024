import { Image } from '@nextui-org/react';
import { RiFolder2Line, RiHome3Line, RiTaskLine } from '@remixicon/react';

import classes from './Sidebar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/config/routeConfig';

interface SidebarProps {
    className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props;

    return (
        <aside className={classNames(classes.Sidebar, {}, [className])}>
            <VStack maxH maxW align="center">
                <Image src="/static/logo.webp" width="75%" />

                <VStack className="-translate-y-16" flexGrow maxW
justify="center" align="center">
                    <AppLink to={RoutePath.main}>
                        <RiHome3Line size="48" color="#0A2C5C" />
                    </AppLink>
                    <AppLink to={RoutePath.projects}>
                        <RiTaskLine size="48" color="#0A2C5C" />
                    </AppLink>
                    <AppLink to={RoutePath.main}>
                        <RiFolder2Line size="48" color="#0A2C5C" />
                    </AppLink>
                </VStack>
            </VStack>
        </aside>
    );
};
