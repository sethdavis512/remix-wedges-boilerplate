import { Button } from '@lemonsqueezy/wedges';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { prisma } from '~/db.server';

export async function loader() {
    return json({
        projects: await prisma.project.findMany(),
    });
}

export default function ProjectsIndexRoute() {
    const { projects } = useLoaderData<typeof loader>();

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
                {projects && projects.length > 0 ? (
                    <ul>
                        {projects.map((project) => (
                            <li
                                className="border border-zinc-300 first:rounded-t-xl last:rounded-b-xl dark:border-zinc-700"
                                key={project.id}
                            >
                                <Link className="block p-4" to={project.slug}>
                                    {project.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No projects, go make some!</p>
                )}
            </div>
            <div className="col-span-4">
                <Button asChild variant="secondary" className="w-full">
                    <Link to="create">Create project</Link>
                </Button>
            </div>
        </div>
    );
}
