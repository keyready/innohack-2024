import { Task } from '../../model/types/Task';

import { classNames } from '@/shared/lib/classNames';
import { VStack } from '@/shared/ui/Stack';

interface TaskCardProps {
    className?: string;
    task: Task;
}

export const TaskCard = (props: TaskCardProps) => {
    const { className, task } = props;

    return (
        <VStack maxW className={classNames('p-4 bg-white rounded-md', {}, [className])}>
            <h1 className="text-l text-black">{task.title}</h1>
            <p className="text-black">{task.description}</p>
        </VStack>
    );
};
