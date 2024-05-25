import { cva, cx } from '../../cva.config';
import { type ReactNode } from 'react';

interface HeadingProps {
    children: ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    id?: string;
    size?: '1' | '2' | '3' | '4' | '5' | '6';
}

const headingVariants = cva({
    base: 'font-bold',
    variants: {
        size: {
            '1': 'text-6xl md:text-8xl',
            '2': 'text-4xl md:text-6xl',
            '3': 'text-2xl md:text-4xl',
            '4': 'text-xl md:text-2xl',
            '5': 'text-md md:text-xl',
            '6': 'text-sm md:text-md',
        },
    },
    defaultVariants: {
        size: '2',
    },
});

export default function Heading({
    as = 'h2',
    children,
    className,
    id,
    size = '2',
}: HeadingProps) {
    const Component = as;

    return (
        <Component id={id} className={cx(headingVariants({ className, size }))}>
            {children}
        </Component>
    );
}
