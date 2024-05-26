import { Outlet } from '@remix-run/react';
import Heading from '~/components/Heading';

export default function ProjectsRoute() {
    return (
        <>
            <Heading as="h1" className="mb-8 text-4xl font-black">
                Projects
            </Heading>
            <Outlet />
        </>
    );
}
