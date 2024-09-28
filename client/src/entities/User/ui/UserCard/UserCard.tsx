import { memo } from 'react';
import { Button, Image } from '@nextui-org/react';

import { User } from '../../model/types/User';

import classes from './UserCard.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';

interface UserCardProps {
    className?: string;
    user: User;
    onInviteClick?: (userId?: number) => void;
}

export const UserCard = memo((props: UserCardProps) => {
    const { className, user, onInviteClick } = props;

    return (
        <HStack
            className={classNames(classes.UserCard, {}, [className])}
            maxW
            gap="12px"
            align="center"
            justify="center"
        >
            <Image src={user.avatar} width={35} />
            <h1>{user.name}</h1>
            <Button onClick={() => onInviteClick?.(user.id)} className="p-0">
                Пригласить
            </Button>
        </HStack>
    );
});
