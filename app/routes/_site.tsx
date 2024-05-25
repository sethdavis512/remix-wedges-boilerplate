import { Outlet } from '@remix-run/react';

export default function SiteRoute() {
    return (
        <div className="container mx-auto max-w-3xl p-4">
            <Outlet />
        </div>
    );
}
