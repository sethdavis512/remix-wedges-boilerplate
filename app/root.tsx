import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteLoaderData,
} from '@remix-run/react';
import { neobrutalism } from '@clerk/themes';

import stylesheet from '~/tailwind.css?url';
import { getThemeSession } from './utils/theme.server';
import { Theme } from './utils/theme';
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import { ClerkApp } from '@clerk/remix';
import { cx } from 'cva.config';

export interface RootLoaderResponse {
    theme: Theme;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
];

export async function loader(args: LoaderFunctionArgs) {
    return rootAuthLoader(args, async ({ request }) => {
        const themeSession = await getThemeSession(request);

        return {
            theme: themeSession.getTheme(),
        };
    });
}

export function Layout({ children }: { children: React.ReactNode }) {
    const data = useRouteLoaderData<RootLoaderResponse>('root');

    return (
        <html lang="en" className={cx('h-full', data?.theme ?? Theme.LIGHT)}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

function App() {
    return <Outlet />;
}

export default ClerkApp(App, {
    appearance: {
        baseTheme: neobrutalism,
    },
});
