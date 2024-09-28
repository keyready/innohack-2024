import { Modal, ModalContent, ModalHeader } from '@nextui-org/react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { UserCard, useUsers } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { toastDispatch } from '@/widgets/Toaster';
import { inviteMember } from '@/entities/User/model/services/otherServices/inviteMember';

interface InviteMemberModalProps {
    isModalOpened: boolean;
    setIsModalOpened: (value: boolean) => void;
    projectId?: number;
}

export const InviteMemberModal = (props: InviteMemberModalProps) => {
    const { projectId, isModalOpened, setIsModalOpened } = props;

    const { data: users, isLoading: isUsersLoading } = useUsers();

    const dispatch = useAppDispatch();

    const handleInviteUserClick = useCallback(
        async (userId?: number) => {
            if (!projectId || !userId) {
                toast.error('Какие то данные не найдены');
                return;
            }

            await toastDispatch(
                dispatch(
                    inviteMember({
                        projectId,
                        userId,
                    }),
                ),
            );
        },
        [dispatch, projectId],
    );

    return (
        <Modal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}>
            <ModalContent className="p-4">
                <ModalHeader>Пригласить участников</ModalHeader>
                {isUsersLoading &&
                    new Array(5)
                        .fill(null)
                        .map((_, index) => <Skeleton key={index} width="100%" height={40} />)}

                {users?.length ? (
                    users.map((user) => (
                        <UserCard onInviteClick={handleInviteUserClick} user={user} />
                    ))
                ) : (
                    <p className="text-black text-opacity-60 text-center">
                        Вы единственный пользователь сервиса... Не знаю, радоваться или плакать?
                    </p>
                )}
            </ModalContent>
        </Modal>
    );
};
