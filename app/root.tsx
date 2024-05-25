import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useRouteLoaderData,
} from '@remix-run/react';

import stylesheet from '~/tailwind.css?url';
import { getThemeSession } from './utils/theme.server';
import { Theme } from './utils/theme';

export interface RootLoaderResponse {
    theme: Theme;
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
];

export async function loader({ request }: LoaderFunctionArgs) {
    const themeSession = await getThemeSession(request);

    return json({
        theme: themeSession.getTheme(),
    });
}

export function Layout({ children }: { children: React.ReactNode }) {
    const data = useRouteLoaderData<RootLoaderResponse>('root');

    return (
        <html lang="en" className={data?.theme ?? Theme.LIGHT}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
