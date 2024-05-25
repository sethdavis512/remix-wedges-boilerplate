import { SignIn, useAuth } from '@clerk/remix';
import { Loading } from '@lemonsqueezy/wedges';

export default function SignInPage() {
    const { isLoaded } = useAuth();

    return (
        <div className="flex h-full items-center justify-center">
            {isLoaded ? <SignIn /> : <Loading type="line" size="xl" />}
        </div>
    );
}
