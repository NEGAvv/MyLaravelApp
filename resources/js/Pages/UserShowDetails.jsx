import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';

export default function UserShowDetails({ user, userSeries, userComments, numSeries, numComments, auth }) {
    // Function to format date as "Month Day, Year"
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white-800 leading-tight">User: {user.name}</h2>}
        >
            <Head title="User Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h3 className="font-semibold text-xl text-white-800 leading-tight mb-2">
                        | User's Posts <p className="text-sm circle">{numSeries}</p> |
                    </h3>
                    {userSeries.map(series => (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4" key={series.id}>
                            <div className="p-6 py-2 text-gray-900 sm:flex justify-between items-center">
                                <div className="sm:w-4/5">
                                    <div className="font-bold text-xl text-white-800 leading-tight">
                                        {series.name ? (
                                            <Link
                                                href={route('series.show', {series: series.id})}
                                                className="text-blue-200 font-bold hover:underline"
                                            >
                                                <p className="text-gray-800 font-bold">{`${series.name}`}</p>
                                            </Link>
                                        ) : 'Unknown'}
                                    </div>
                                    <div>Rating: {series.rating}</div>
                                    <div>Number of Seasons: {series.quantity_of_seasons}</div>
                                </div>
                                <div className="text-gray-600 text-left sm:text-right sm:w-1/3">
                                    {formatDate(series.date_of_creation)}
                                </div>
                            </div>
                        </div>
                    ))}


                    <h3 className="font-semibold text-xl text-white-800 leading-tight mb-2">
                        | User's Comments <p className="text-sm circle">{numComments}</p> |
                        </h3>
                        {userComments.map(comment => {
                            return (
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4" key={comment.id}>
                                    <div className="p-6 py-2 text-gray-900 sm:flex justify-between items-center">
                                        <div className="pr-2 sm:w-4/5">
                                            {comment.series && (
                                                <div className="font-bold text-xl text-white-800 leading-tight">
                                                    <Link
                                                        href={route('series.show', { series: comment.series.id })}
                                                        className="text-blue-200 font-bold hover:underline"
                                                    >
                                                        <p className="text-gray-800 font-bold">{comment.series.name}</p>
                                                    </Link>
                                                </div>
                                            )}
                                            <div className="break-words">{comment.comment}</div>
                                        </div>
                                        <div className="text-gray-600 text-left sm:text-right sm:w-1/3">
                                            {formatDate(comment.date_of_creation)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
