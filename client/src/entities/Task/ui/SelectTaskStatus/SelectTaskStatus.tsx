import { Select, SelectItem } from '@nextui-org/react';
import { ChangeEvent, useCallback } from 'react';

import { TaskStatus } from '../../model/types/Task';

import { classNames } from '@/shared/lib/classNames';

interface SelectBugProps {
    className?: string;
    defaultValue: TaskStatus;
    selectedKey: string;
    setSelectedKey: (value: string) => void;
    isDisabled?: boolean;
}

export const SelectTaskStatus = (props: SelectBugProps) => {
    const { defaultValue, className, setSelectedKey, isDisabled, selectedKey } = props;

    const handleSelectChange = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            setSelectedKey(e.target.value);
        },
        [setSelectedKey],
    );

    const renderTaskStatusText = useCallback((status: TaskStatus) => {
        switch (status) {
            case TaskStatus.NEW:
                return 'Новая';
            case TaskStatus.DONE:
                return 'Решена';
            default:
                return 'В процессе';
        }
    }, []);

    const renderItemColor = useCallback((status: TaskStatus) => {
        switch (status) {
            case TaskStatus.NEW:
                return 'danger';
            case TaskStatus.DONE:
                return 'success';
            default:
                return 'warning';
        }
    }, []);

    return (
        <Select
            isLoading={isDisabled}
            isDisabled={isDisabled}
            label="Приоритет задачи"
            className={classNames('w-2/4', {}, [className])}
            aria-label="Выберите приоритет задачи"
            color={renderItemColor(selectedKey as TaskStatus)}
            onChange={handleSelectChange}
            defaultSelectedKeys={new Set([defaultValue])}
        >
            <SelectItem
                aria-label={TaskStatus.DONE}
                classNames={{
                    title: 'text-green-600',
                }}
                key={TaskStatus.DONE}
                value={TaskStatus.DONE}
            >
                {renderTaskStatusText(TaskStatus.DONE)}
            </SelectItem>
            <SelectItem
                aria-label={TaskStatus.IN_PROGRESS}
                classNames={{
                    title: 'text-orange-500',
                }}
                key={TaskStatus.IN_PROGRESS}
                value={TaskStatus.IN_PROGRESS}
            >
                {renderTaskStatusText(TaskStatus.IN_PROGRESS)}
            </SelectItem>
            <SelectItem
                aria-label={TaskStatus.NEW}
                classNames={{
                    title: 'text-red-500',
                }}
                key={TaskStatus.NEW}
                value={TaskStatus.NEW}
            >
                {renderTaskStatusText(TaskStatus.NEW)}
            </SelectItem>
        </Select>
    );
};
