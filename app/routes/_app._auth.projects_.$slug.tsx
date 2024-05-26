import { Button } from '@lemonsqueezy/wedges';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import Flex from '~/components/Flex';

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
            include: {
                User: true,
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
            <Heading as="h3" size="3" className="mb-8 text-4xl font-black">
                {project?.User?.email}
            </Heading>
            <Flex>
                <Button asChild>
                    <Link to="update">Update</Link>
                </Button>
                <Form method="POST" action="delete">
                    <Button
                        type="submit"
                        asChild
                        variant="secondary"
                        destructive
                    >
                        Delete
                    </Button>
                </Form>
            </Flex>
        </>
    );
}
