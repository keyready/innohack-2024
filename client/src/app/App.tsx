import { Suspense } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/AppRouter';
import { Toaster } from '@/widgets/Toaster';
import { Navbar } from '@/widgets/Navbar';

export const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <AppRouter />
                <Toaster />
            </Suspense>
        </div>
    );
};
