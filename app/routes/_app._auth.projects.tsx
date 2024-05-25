import { Button } from '@lemonsqueezy/wedges';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import Flex from '~/components/Flex';
import Heading from '~/components/Heading';
import { prisma } from '~/db.server';

export async function loader() {
    return json({
        projects: await prisma.project.findMany(),
    });
}

export default function Route() {
    const { projects } = useLoaderData<typeof loader>();

    return (
        <>
            <Heading as="h1" className="mb-8 text-4xl font-black">
                Projects
            </Heading>
            <Flex className="mb-8 gap-4 rounded-xl bg-zinc-300 p-4 dark:bg-zinc-800">
                <Button asChild variant="secondary">
                    <Link to="create">Create project</Link>
                </Button>
            </Flex>
            <ul>
                {projects.map((project) => (
                    <li
                        className="rounded-xl border border-zinc-300 dark:border-zinc-700"
                        key={project.id}
                    >
                        <Link className="block p-4" to={project.slug}>
                            {project.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
