import { getInputProps, getTextareaProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { Button, Input, Textarea } from '@lemonsqueezy/wedges';
import { type ActionFunctionArgs, type MetaFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { contactUsSchema } from '~/schemas';

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Welcome to Remix!' },
    ];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: contactUsSchema });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    console.log(submission);

    return null;
}

export default function Index() {
    const lastResult = useActionData<typeof action>();
    // The useForm hook will return all the metadata we need to render the form
    // and put focus on the first invalid field when the form is submitted
    const [form, fields] = useForm({
        // To derive all validation attributes
        constraint: getZodConstraint(contactUsSchema),
        // This not only syncs the error from the server
        // But is also used as the default value of the form
        // in case the document is reloaded for progressive enhancement
        lastResult,
        // Validate field once user leaves the field
        shouldValidate: 'onBlur',
        // Then, revalidate field as user types again
        shouldRevalidate: 'onInput',
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: contactUsSchema });
        },
    });

    return (
        <div className="container p-4">
            <h1 className="text-4xl font-black">Hello internet.</h1>
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
                    {...getInputProps(fields.email, { type: 'email' })}
                    description="Add your email"
                    label="Email"
                    placeholder="Email"
                    required
                    helperText={
                        <div id={fields.email.errorId} className="text-red-500">
                            {fields.email.errors}
                        </div>
                    }
                />
                <Textarea
                    {...getTextareaProps(fields.message)}
                    description="Add your message"
                    label="Message"
                    placeholder="Message"
                    required
                    helperText={
                        <div
                            id={fields.message.errorId}
                            className="text-red-500"
                        >
                            {fields.message.errors}
                        </div>
                    }
                />
                <Button type="submit">Send</Button>
            </Form>
        </div>
    );
}
