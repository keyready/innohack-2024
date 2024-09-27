import classes from './ImportReposForm.module.scss';

import { classNames } from '@/shared/lib/classNames';

interface ImportReposFormProps {
    className?: string;
}

export const ImportReposForm = (props: ImportReposFormProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.ImportReposForm, {}, [className])}>
            <h1 />
        </div>
    );
};
