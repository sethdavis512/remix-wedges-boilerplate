import { type ReactNode } from 'react';
import { cx } from 'cva.config';

interface SkeletonProps {
    children?: ReactNode;
    className?: string;
    size?: 'lg';
    isText?: boolean;
}

export default function Skeleton({
    children,
    className,
    size = 'lg',
    isText = false,
}: SkeletonProps) {
    const sharedClasses = 'rounded-lg bg-zinc-200 dark:bg-zinc-700';
    const Component = isText ? 'span' : 'div';

    return (
        <Component
            role="status"
            className={cx('animate-pulse', isText && 'inline-block')}
        >
            {isText ? (
                <span
                    className={cx(
                        sharedClasses,
                        'inline-block text-inherit',
                        className
                    )}
                >
                    <span className="inline-block min-w-36">&nbsp;</span>
                    <span className="sr-only">Loading...</span>
                </span>
            ) : (
                <div
                    className={cx(
                        sharedClasses,
                        'h-2.5 w-full',
                        size === 'lg' && 'h-10',
                        className
                    )}
                >
                    {children}
                </div>
            )}
            {children}
        </Component>
    );
}
