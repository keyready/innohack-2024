import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import classes from './UserCard.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';

interface UserCardProps {
    className?: string;
}

export const UserCard = memo((props: UserCardProps) => {
    const { t } = useTranslation('main-page');

    const { className } = props;

    return (
        <HStack
            className={classNames(classes.UserCard, {}, [className])}
            maxW
            gap="12px"
            align="center"
            justify="center"
        >
            привет мир
        </HStack>
    );
});
