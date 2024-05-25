import { SignIn } from '@clerk/remix';

export default function SignInPage() {
    return (
        <div className="flex h-full items-center justify-center">
            <SignIn />
        </div>
    );
}
