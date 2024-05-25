import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import Heading from '~/components/Heading';
import { prisma } from '~/db.server';

export async function loader({ params }: LoaderFunctionArgs) {
    const { slug } = params;
    invariant(slug, 'Slug not found');

    return json({
        project: await prisma.project.findFirst({
            where: {
                slug,
            },
        }),
    });
}

export default function ProjectDetailsRoute() {
    const { project } = useLoaderData<typeof loader>();

    return (
        <>
            <Heading as="h1" className="mb-8 text-4xl font-black">
                {project?.name}
            </Heading>
        </>
    );
}
