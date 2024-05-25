import { useRouteLoaderData } from '@remix-run/react';
import { RootLoaderResponse } from '~/root';
import { Theme } from '~/utils/theme';

export default function useThemeMeta() {
    const rootData = useRouteLoaderData<RootLoaderResponse>('root');
    const isThemeDark = rootData?.theme === Theme.DARK;
    const activeTheme = isThemeDark ? Theme.LIGHT : Theme.DARK;

    return { activeTheme, isThemeDark };
}
