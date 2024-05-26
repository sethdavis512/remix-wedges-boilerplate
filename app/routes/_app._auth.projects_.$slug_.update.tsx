import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Button, Input } from '@lemonsqueezy/wedges';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import {
    Form,
    json,
    redirect,
    useActionData,
    useLoaderData,
} from '@remix-run/react';
import kebabCase from 'lodash/kebabCase';
import invariant from 'tiny-invariant';

import Heading from '~/components/Heading';
import { prisma } from '~/db.server';
import { newProjectSchema } from '~/schemas';

export async function loader({ params }: LoaderFunctionArgs) {
    const { slug } = params;
    invariant(slug, 'Slug not found');

    const project = await prisma.project.findFirst({
        where: {
            slug,
        },
    });

    return json({
        project,
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: newProjectSchema });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const { slug } = params;
    invariant(slug, 'Slug not found');

    await prisma.project.update({
        where: {
            slug,
        },
        data: {
            name: submission.value.name,
            slug: kebabCase(submission.value.name),
        },
    });

    return redirect(`/projects`);
}

export default function UpdateProjectRoute() {
    // Use this when we associate users & profiles
    // const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { project } = useLoaderData<typeof loader>();
    const lastResult = useActionData<typeof action>();

    const [form, fields] = useForm({
        constraint: getZodConstraint(newProjectSchema),
        defaultValue: project,
        lastResult,
        shouldRevalidate: 'onInput',
        shouldValidate: 'onBlur',
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: newProjectSchema });
        },
    });

    return (
        <>
            <Heading as="h1" className="mb-8 text-4xl font-black">
                Update
            </Heading>
            <Form method="POST" className="space-y-4" {...getFormProps(form)}>
                <div id={form.errorId}>{form.errors}</div>
                <Input
                    {...getInputProps(fields.name, {
                        type: 'text',
                    })}
                    label="Project name"
                    placeholder="Patio renovation"
                    required
                    helperText={
                        <div id={fields.name.errorId} className="text-red-500">
                            {fields.name.errors}
                        </div>
                    }
                />
                <Input
                    {...getInputProps(fields.slug, { type: 'text' })}
                    readOnly
                    label="Slug"
                    description="(Read only)"
                    placeholder="Slug will be automatically generated"
                    value={kebabCase(form.value?.name)}
                    required
                    helperText={
                        <div id={fields.slug.errorId} className="text-red-500">
                            {fields.slug.errors}
                        </div>
                    }
                />
                <Button type="submit">Update</Button>
            </Form>
        </>
    );
}
