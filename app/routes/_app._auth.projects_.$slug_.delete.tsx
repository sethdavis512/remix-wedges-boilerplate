import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { prisma } from '~/db.server';

export async function action({ params }: ActionFunctionArgs) {
    const { slug } = params;
    invariant(slug, 'Slug not found');

    await prisma.project.delete({
        where: {
            slug,
        },
    });

    return redirect('/projects');
}
