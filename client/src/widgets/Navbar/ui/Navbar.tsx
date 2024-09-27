import classes from './Navbar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;

    return (
        <HStack
            className={classNames(classes.Navbar, {}, [className])}
            align="center"
            justify="between"
        >
            <AppLink to="/">Ссылка</AppLink>
        </HStack>
    );
};
