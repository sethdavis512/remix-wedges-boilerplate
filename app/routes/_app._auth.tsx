import { getAuth } from '@clerk/remix/ssr.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, redirect } from '@remix-run/react';

export async function loader(args: LoaderFunctionArgs) {
    const { userId } = await getAuth(args);

    if (!userId) {
        return redirect('/sign-in');
    }

    return {};
}

export default function AuthRoute() {
    return <Outlet />;
}
