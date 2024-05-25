import { getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Button, Input } from '@lemonsqueezy/wedges';
import type { ActionFunctionArgs } from '@remix-run/node';
import { Form, redirect, useActionData } from '@remix-run/react';
import kebabCase from 'lodash/kebabCase';

import { prisma } from '~/db.server';
import { newProjectSchema } from '~/schemas';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: newProjectSchema });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const newProject = await prisma.project.create({
        data: {
            name: submission.value.name,
            slug: kebabCase(submission.value.name),
        },
    });

    return redirect(`/projects/${newProject.slug}`);
}

export default function CreateProjectRoute() {
    // Use this when we associat users & profiles
    // const { isLoaded, userId, sessionId, getToken } = useAuth();
    const lastResult = useActionData<typeof action>();
    const [form, fields] = useForm({
        constraint: getZodConstraint(newProjectSchema),
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: newProjectSchema });
        },
    });

    return (
        <>
            <Form
                method="POST"
                className="space-y-4"
                id={form.id}
                onSubmit={form.onSubmit}
                aria-invalid={form.errors ? true : undefined}
                aria-describedby={form.errors ? form.errorId : undefined}
            >
                <div id={form.errorId}>{form.errors}</div>
                <Input
                    {...getInputProps(fields.name, { type: 'text' })}
                    description="Add your email"
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
                    placeholder="Slug will be automatically generated"
                    required
                    value={kebabCase(form.value?.name)}
                    helperText={
                        <div id={fields.slug.errorId} className="text-red-500">
                            {fields.slug.errors}
                        </div>
                    }
                />
                <Button type="submit">Create</Button>
            </Form>
        </>
    );
}
