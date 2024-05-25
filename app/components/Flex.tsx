import { type ReactNode } from 'react';
import { cx } from 'cva.config';

interface FlexProps {
    children: ReactNode;
    className?: string;
}

export default function Flex({ children, className }: FlexProps) {
    return (
        <div className={cx('flex items-center gap-2', className)}>
            {children}
        </div>
    );
}
