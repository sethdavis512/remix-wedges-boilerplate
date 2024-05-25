import { SignUp } from '@clerk/remix';
import Heading from '~/components/Heading';

export default function SignUpPage() {
    return (
        <>
            <Heading>Sign Up route</Heading>
            <SignUp />
        </>
    );
}
