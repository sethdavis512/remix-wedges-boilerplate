import { useUser } from '@clerk/remix';
import { type MetaFunction } from '@remix-run/node';

import Heading from '~/components/Heading';
import heroImage from '../images/intricate-explorer-iXn9QlSV2wA-unsplash.jpg';
import Header from '~/components/Header';

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Welcome to Remix!' },
    ];
};

export default function Index() {
    const userData = useUser();

    return (
        <>
            <Header />
            <Heading as="h1" className="mb-8 text-4xl font-black">
                {userData.user
                    ? `Hello ${userData.user?.firstName ? userData.user?.firstName : 'friend'}!`
                    : 'Welcome'}
            </Heading>
            <img
                src={heroImage}
                className="w-full"
                alt="Spiraling parking garage ramp"
            />
        </>
    );
}
