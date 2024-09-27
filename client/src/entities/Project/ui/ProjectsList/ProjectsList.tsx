import { useTranslation } from 'react-i18next';
import { Button } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { RiImportLine } from '@remixicon/react';

import { useProjects } from '../../api/ProjectsApi';
import { ProjectCard } from '../ProjectCard/ProjectCard';

import classes from './ProjectsList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';
import { ImportReposModal } from '@/entities/Project/ui/ImportReposModal/ImportReposModal';

interface ProjectsListProps {
    className?: string;
}

export const ProjectsList = (props: ProjectsListProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const { data: projects, isLoading: isProjectsLoading } = useProjects();

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const handleImportProjectClick = useCallback(() => {
        setIsModalOpened(true);
    }, []);

    if (!projects?.length) {
        return (
            <VStack maxW className={classNames(classes.ProjectsList, {}, [className])}>
                <h1 className="text-l text-black">{t('Вы пока не добавили ни одного проекта')}</h1>
                <Button onClick={handleImportProjectClick}>
                    <RiImportLine />
                    <p>{t('Импортировать проект')}</p>
                </Button>
                <ImportReposModal isOpen={isModalOpened} setIsOpen={setIsModalOpened} />
            </VStack>
        );
    }

    return (
        <VStack maxW className={classNames(classes.ProjectsList, {}, [className])}>
            {projects.map((project) => (
                <ProjectCard project={project} key={project.id} />
            ))}
        </VStack>
    );
};
