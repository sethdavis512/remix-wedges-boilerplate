import { useUser } from '@clerk/remix';
import { type MetaFunction } from '@remix-run/node';

import Heading from '~/components/Heading';
import heroImage from '../images/intricate-explorer-iXn9QlSV2wA-unsplash.jpg';
import Header from '~/components/Header';
import Skeleton from '~/components/Skeleton';

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
            <div className="mb-8">
                {userData && userData.user && userData.user?.firstName ? (
                    <Heading as="h1" className="text-4xl font-black">
                        {`Hello ${userData.user?.firstName}!`}
                    </Heading>
                ) : (
                    <Skeleton size="lg" />
                )}
            </div>
            <img
                src={heroImage}
                className="w-full"
                alt="Spiraling parking garage ramp"
            />
        </>
    );
}
