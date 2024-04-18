import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';

export default function Dashboard({ auth, series }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white-800 leading-tight">See the latest posts</h2>}
        >
            <Head title="ForumVision" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {series.map(series => (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4" key={series.id}>
                            <div className="p-6 py-2 text-gray-900 flex justify-between items-center">
                                <div>
                                    <div className="font-bold">
                                    {series.name ? (
                                        <Link
                                            href={route('series.show', {series: series.id})}
                                        >
                                            {`${series.name}`}
                                        </Link>
                                    ) : 'Unknown'}
                                        </div>
                                    <div>Rating: {series.rating}</div>
                                    <div>Number of Seasons: {series.quantity_of_seasons}</div>
                                </div>
                                <div className="text-right">
                                     {series.user ? (
                                        <Link
                                            href={route('user.show', {user: series.user.id})}
                                        >
                                            {`${series.user.name}`}
                                        </Link>
                                    ) : 'Unknown'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
