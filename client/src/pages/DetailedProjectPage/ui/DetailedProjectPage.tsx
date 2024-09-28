import { useTranslation } from 'react-i18next';
import { memo, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiCalendarLine, RiGlobalLine, RiGroupLine } from '@remixicon/react';
import { Image } from '@nextui-org/react';

import classes from './DetailedProjectPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { PageTitle } from '@/shared/ui/PageTitle';
import { RoutePath } from '@/shared/config/routeConfig';
import {
    fetchProject,
    getProjectData,
    getProjectIsLoading,
    ProjectReducer,
} from '@/entities/Project';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TasksList } from '@/entities/Task';

interface DetailedProjectPageProps {
    className?: string;
}

const DetailedProjectPage = memo((props: DetailedProjectPageProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const { projectId } = useParams<{ projectId: string }>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const project = useSelector(getProjectData);
    const isProjectLoading = useSelector(getProjectIsLoading);

    useEffect(() => {
        if (projectId) {
            dispatch(fetchProject(projectId));
        } else {
            navigate(RoutePath.projects);
        }
    }, [dispatch, navigate, projectId]);

    const renderDate = useMemo(() => {
        if (!project?.created_at) return '';

        return new Date(project?.created_at).toLocaleDateString('ru-Ru', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
        });
    }, [project?.created_at]);

    if (isProjectLoading) {
        return (
            <DynamicModuleLoader reducers={{ project: ProjectReducer }}>
                <Page className={classNames(classes.DetailedProjectPage, {}, [className])}>
                    <VStack maxW gap="12px">
                        <PageTitle title="Проект" />

                        <HStack
                            maxW
                            justify="between"
                            align="center"
                            className="p-5 rounded-xl bg-white"
                        >
                            <Skeleton width="200px" height={40} />
                            <HStack>
                                <RiCalendarLine className="text-accent" />
                                <Skeleton width="100px" height={20} />
                            </HStack>
                        </HStack>

                        <div className="w-full items-start gap-4 grid grid-cols-5">
                            <VStack maxW className="col-span-4" gap="12px">
                                <HStack
                                    maxW
                                    justify="between"
                                    align="center"
                                    className="p-5 rounded-xl bg-white"
                                >
                                    <h1 className="text-xl text-black uppercase">Задачи</h1>
                                </HStack>
                                <TasksList isGlobalLoading />
                            </VStack>

                            <VStack gap="12px" maxW className="col-span-1">
                                <HStack
                                    justify="between"
                                    align="center"
                                    maxW
                                    className="p-5 rounded-xl bg-white"
                                >
                                    <VStack maxW gap="8px">
                                        <HStack maxW>
                                            <RiGroupLine className="text-accent" size={18} />
                                            <h2 className="text-l text-black">Авторы</h2>
                                        </HStack>
                                        {new Array(3).fill(0).map((_, index) => (
                                            <HStack key={index} maxW gap="8px">
                                                <Skeleton width={20} height={20} rounded={999} />
                                                <Skeleton width="100px" height={15} />
                                            </HStack>
                                        ))}
                                    </VStack>
                                </HStack>
                                <VStack
                                    maxW
                                    justify="start"
                                    align="center"
                                    className="p-5 rounded-xl bg-white"
                                >
                                    <HStack maxW>
                                        <RiGlobalLine className="text-accent" size={24} />
                                        <h2 className="text-left w-full text-l text-black">
                                            Языки
                                        </h2>
                                    </HStack>
                                    {new Array(7).fill(0).map((_, index) => (
                                        <Skeleton key={index} width="100px" height={13} />
                                    ))}
                                </VStack>
                            </VStack>
                        </div>
                    </VStack>
                </Page>
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={{ project: ProjectReducer }}>
            <Page className={classNames(classes.DetailedProjectPage, {}, [className])}>
                <VStack maxW gap="12px" className="relative">
                    <PageTitle title="Проект" />

                    <HStack
                        maxW
                        justify="between"
                        align="center"
                        className="p-5 rounded-xl bg-white sticky top-2 z-10 shadow-2xl"
                    >
                        <h1 className="font-bold text-2xl text-black">{project?.name}</h1>
                        <HStack>
                            <RiCalendarLine className="text-accent" />
                            <h2 className="text-black">{renderDate}</h2>
                        </HStack>
                    </HStack>

                    <HStack className="w-full items-start relative gap-4">
                        <VStack maxW className="w-4/5" gap="12px">
                            <HStack
                                maxW
                                justify="between"
                                align="center"
                                className="p-5 rounded-xl bg-white"
                            >
                                <h1 className="text-xl text-black uppercase">Задачи</h1>
                            </HStack>
                            <TasksList projectId={Number(projectId)} />
                        </VStack>

                        <VStack gap="12px" maxW className="w-1/5 sticky top-20">
                            <HStack
                                justify="between"
                                align="center"
                                maxW
                                className="p-5 rounded-xl bg-white"
                            >
                                <VStack maxW gap="8px">
                                    <HStack maxW>
                                        <RiGroupLine className="text-accent" size={18} />
                                        <h2 className="text-l text-black">Авторы</h2>
                                    </HStack>
                                    <HStack maxW gap="8px">
                                        <Image
                                            src={project?.author.avatar}
                                            width={25}
                                            radius="full"
                                        />
                                        <h2 className="text-black">{project?.author.name}</h2>
                                    </HStack>
                                </VStack>
                            </HStack>
                            <VStack
                                maxW
                                justify="start"
                                align="center"
                                className="p-5 rounded-xl bg-white"
                            >
                                <HStack maxW>
                                    <RiGlobalLine className="text-accent" size={24} />
                                    <h2 className="text-left w-full text-l text-black">Языки</h2>
                                </HStack>
                            </VStack>
                        </VStack>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default DetailedProjectPage;
