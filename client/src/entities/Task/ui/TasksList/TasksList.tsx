import { useTasks } from '../../api/TaskApi';
import { TaskCard } from '../TaskCard/TaskCard';
import { CreateTaskButton } from '../CreateTaskButton/CreateTaskButton';

import classes from './TasksList.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { DynamicModuleLoader } from '@/shared/lib/DynamicModuleLoader';
import { TaskReducer } from '@/entities/Task';

interface TasksListProps {
    className?: string;
    projectId?: number;
    isGlobalLoading?: boolean;
}

export const TasksList = (props: TasksListProps) => {
    const { className, isGlobalLoading, projectId } = props;

    const { data: tasks, isLoading } = useTasks(projectId || -1);

    if (isLoading || isGlobalLoading) {
        return (
            <VStack
                gap="12px"
                maxW
                className={classNames('p-4 bg-white rounded-xl', {}, [className])}
            >
                {new Array(4).fill(null).map((_, index) => (
                    <Skeleton width="100%" height={120} key={index} />
                ))}
            </VStack>
        );
    }

    if (!tasks?.length && !isLoading) {
        return (
            <VStack maxW>
                <VStack
                    flexGrow
                    gap="12px"
                    maxW
                    className={classNames(classes.TasksList, {}, [className])}
                >
                    <HStack
                        maxW
                        className="p-4 bg-white rounded-xl"
                        justify="center"
                        align="center"
                    >
                        <h1 className="text-black text-l">Для этого проекта пока нет задач.</h1>
                    </HStack>
                </VStack>
                <CreateTaskButton projectId={projectId} />
            </VStack>
        );
    }

    return (
        <DynamicModuleLoader reducers={{ task: TaskReducer }}>
            <VStack maxW>
                <VStack maxW className={classNames(classes.TasksList, {}, [className])}>
                    {tasks?.map((task) => (
                        <TaskCard projectId={projectId} task={task} key={task.id} />
                    ))}
                </VStack>
                <CreateTaskButton projectId={projectId} />
            </VStack>
        </DynamicModuleLoader>
    );
};
