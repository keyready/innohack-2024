import { memo, MutableRefObject, ReactNode, UIEvent, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Page.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUIScrollByPath, UIActions } from '@/features/UI';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';

interface PageProps {
    className?: string;
    children?: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const dispatch = useAppDispatch();
    const { pathname, search } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
        getUIScrollByPath(state, pathname + search),
    );

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, [scrollPosition]);

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            UIActions.setScrollPosition({
                path: pathname + search,
                position: e.currentTarget.scrollTop,
            }),
        );
    }, 1000);

    return (
        <section
            ref={wrapperRef}
            className={classNames(classes.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    );
});
