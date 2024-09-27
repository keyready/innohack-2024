import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { LoginButton } from '@/entities/User';
import { VStack } from '@/shared/ui/Stack';

const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <VStack maxW justify="center" align="center"
maxH>
            <LoginButton />
        </VStack>
    </Page>
);

export default MainPage;
