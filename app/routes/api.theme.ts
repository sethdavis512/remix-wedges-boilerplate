import { type ActionFunctionArgs, json } from '@remix-run/node';
import invariant from 'tiny-invariant';

import type { Theme } from '~/utils/theme';
import { getThemeSession } from '~/utils/theme.server';

export async function action({ request }: ActionFunctionArgs) {
    const themeSession = await getThemeSession(request);
    const form = await request.formData();
    const themeSelection = form.get('themeSelection');

    invariant(themeSelection, 'themeSelection aint there man');

    themeSession.setTheme(themeSelection as Theme);

    return json(
        { success: true },
        { headers: { 'Set-Cookie': await themeSession.commit() } }
    );
}
