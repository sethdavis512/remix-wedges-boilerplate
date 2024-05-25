import { Outlet } from '@remix-run/react';
import Header from '~/components/Header';

export default function AppRoute() {
    return (
        <div className="container mx-auto max-w-3xl p-4">
            <Header />
            <Outlet />
        </div>
    );
}
