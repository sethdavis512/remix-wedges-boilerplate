import Flex from './Flex';
import { Moon, Sun, ZapIcon } from 'lucide-react';
import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/remix';
import { Button } from '@lemonsqueezy/wedges';
import { Link, useFetcher } from '@remix-run/react';
import useThemeMeta from '~/hooks/useThemeMeta';

export default function Header() {
    const themeFetcher = useFetcher();
    const { activeTheme, isThemeDark } = useThemeMeta();

    return (
        <>
            <Flex className="mb-8 justify-between">
                <div>
                    <Link to="/">
                        <ZapIcon />
                    </Link>
                </div>
                <Flex>
                    <SignedIn>
                        <Flex>
                            <UserButton />
                            <SignOutButton>
                                <Button variant="outline">Sign out</Button>
                            </SignOutButton>
                        </Flex>
                    </SignedIn>
                    <SignedOut>
                        <SignUpButton>
                            <Button variant="outline">Sign up</Button>
                        </SignUpButton>
                        <SignInButton>
                            <Button variant="outline">Sign in</Button>
                        </SignInButton>
                    </SignedOut>
                    <themeFetcher.Form method="POST" action="/api/theme">
                        <Button
                            className="p-2"
                            variant="outline"
                            type="submit"
                            name="themeSelection"
                            value={activeTheme}
                            aria-label={`Toggle theme to ${activeTheme} theme`}
                        >
                            <span className="sr-only">
                                Toggle to {activeTheme} theme
                            </span>
                            {isThemeDark ? <Sun /> : <Moon />}
                        </Button>
                    </themeFetcher.Form>
                </Flex>
            </Flex>
            <SignedIn>
                <Flex className="mb-8 gap-4 rounded-xl bg-zinc-300 p-4 dark:bg-zinc-800">
                    <Button asChild variant="secondary">
                        <Link to="dashboard">Dashboard</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link to="projects">Projects</Link>
                    </Button>
                </Flex>
            </SignedIn>
        </>
    );
}
