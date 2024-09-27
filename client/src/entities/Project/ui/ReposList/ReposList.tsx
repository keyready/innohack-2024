import { useTranslation } from 'react-i18next';
import { Pagination } from '@nextui-org/react';

import { ProjectCard } from '../ProjectCard/ProjectCard';
import { Project } from '../../model/types/Project';

import classes from './ReposList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ReposListProps {
    className?: string;
    repos?: Project[];
    isLoading?: boolean;
    setPage?: (page: number) => void;
    page?: number;
    total?: number;
}

// const repos: Project[] = [
//     {
//         id: 1,
//         private: false,
//         name: 'Project 1',
//         description: 'Description of project 1',
//         commitsId: [1, 2, 3, 4, 5, 6],
//         createdAt: new Date(),
//     },
//     {
//         id: 2,
//         private: false,
//         name: 'Project 2',
//         description: 'Description of project 2',
//         commitsId: [1, 2, 3, 4, 5, 6],
//         createdAt: new Date(),
//     },
// ];

export const ReposList = (props: ReposListProps) => {
    const { className, isLoading, repos, setPage, total, page } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack maxW className={classNames(classes.ProjectsList, {}, [className])}>
                {new Array(7).fill(0).map((_, index) => (
                    <Skeleton rounded={8} width="100%" height={30}
key={index} />
                ))}
            </VStack>
        );
    }

    if (!repos?.length) {
        return (
            <VStack maxW className={classNames(classes.ProjectsList, {}, [className])}>
                <p>{t('Кажется, у Вас нет репозиториев')}</p>
            </VStack>
        );
    }

    return (
        <VStack
            maxW
            maxH
            flexGrow
            gap="32px"
            justify="between"
            className={classNames(classes.ProjectsList, {}, [className])}
        >
            <VStack maxW>
                {repos.map((project) => (
                    <ProjectCard project={project} key={project.id} />
                ))}
            </VStack>

            <HStack justify="center" maxW>
                <Pagination
                    page={page}
                    onChange={setPage}
                    classNames={{
                        cursor: 'bg-accent',
                    }}
                    color="default"
                    total={total || 0}
                />
            </HStack>
        </VStack>
    );
};
