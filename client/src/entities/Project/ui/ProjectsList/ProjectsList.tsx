import { useTranslation } from 'react-i18next';
import { Button } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { RiImportLine } from '@remixicon/react';

import { useProjects } from '../../api/ProjectsApi';
import { ImportReposModal } from '../ImportReposModal/ImportReposModal';
import { ProjectPreviewCard } from '../ProjectPreviewCard/ProjectPreviewCard';

import classes from './ProjectsList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';

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
                <Button className="fixed bottom-10 right-10" onClick={handleImportProjectClick}>
                    <RiImportLine />
                    <p>{t('Импортировать проект')}</p>
                </Button>
                <ImportReposModal isOpen={isModalOpened} setIsOpen={setIsModalOpened} />

                <div className="grid w-full grid-cols-3 gap-4">
                    {new Array(5).fill(0).map((_, index) => (
                        <ProjectPreviewCard
                            key={index}
                            project={{
                                created_at: new Date(),
                                name: 'Мои проекты',
                                url: '//',
                                private: false,
                                commitsId: [],
                                author: {
                                    name: 'keyready',
                                    avatar: 'https://avatars.githubusercontent.com/u/93424230?v=4',
                                },
                                id: index,
                                description: 'Вы пока не добавили ни одного проекта',
                            }}
                        />
                    ))}
                </div>
            </VStack>
        );
    }

    return (
        <VStack maxW>
            <div className="grid w-full grid-cols-3 gap-4">
                {projects.map((project) => (
                    <ProjectPreviewCard project={project} key={project.id} />
                ))}
            </div>
            <Button
                className="bg-accent fixed bottom-10 right-10"
                onClick={handleImportProjectClick}
            >
                <RiImportLine className="text-white" />
                <p className="text-white">{t('Импортировать проект')}</p>
            </Button>
            <ImportReposModal isOpen={isModalOpened} setIsOpen={setIsModalOpened} />
        </VStack>
    );
};
