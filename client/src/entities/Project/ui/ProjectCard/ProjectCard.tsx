import { useMemo } from 'react';
import { Button } from '@nextui-org/react';

import { Project } from '../../model/types/Project';

import classes from './ProjectCard.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';

interface ProjectCardProps {
    className?: string;
    project: Project;
}

export const ProjectCard = (props: ProjectCardProps) => {
    const { className, project } = props;

    const renderDate = useMemo(
        () =>
            new Date(project.createdAt).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }),
        [project],
    );

    return (
        <HStack maxW justify="between" className={classNames(classes.ProjectCard, {}, [className])}>
            <HStack align="center" gap="12px">
                <h1>{project.name}</h1>
                <h2 className="text-s opacity-50">{renderDate}</h2>
            </HStack>
            <Button color="success" className="bg-opacity-50 py-1 px-3 min-h-none h-fit">
                Импортировать
            </Button>
        </HStack>
    );
};
