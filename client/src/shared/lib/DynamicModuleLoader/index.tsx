import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';

import {
    ReduxStoreWithManager,
    StateSchemaKey,
} from '@/app/providers/StoreProvider/config/StateSchema';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children?: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    const { children, reducers, removeAfterUnmount = true } = props;

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers;

        Object.entries(reducers).forEach(([name, reducer]) => {
            // @ts-ignore
            const mounted = mountedReducers[name as StateSchemaKey];
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return <>{children}</>;
};
