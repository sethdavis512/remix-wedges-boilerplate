import { SignUp } from '@clerk/remix';

export default function SignUpPage() {
    return (
        <div className="flex h-full items-center justify-center">
            <SignUp />
        </div>
    );
}
