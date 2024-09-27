import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';

const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <h1>ghbdtn vbh</h1>
    </Page>
);

export default MainPage;
