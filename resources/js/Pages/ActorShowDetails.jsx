import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';

export default function ActorShowDetails({ actor,actorImg, auth }) {
    // Function to format date as "Month Day, Year"
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white-800 leading-tight">{actor.name}</h2>}
        >
            <Head title="Actor Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row mb-6">
                    <div className="sm:w-1/3 md:w-1/4 flex justify-center sm:justify-center p-4  sm:pt-8">
                        <img src={actorImg} alt="Actor Image" className="w-40 h-40 md:w-40 md:h-40 rounded-full mt-2" />
                    </div>
                        <div className="sm:w-2/3 md:w-3/4 p-4 sm:p-8">
                            <h1 className="text-2xl font-bold mb-2 text-black">{actor.name}</h1>
                            <p className="text-gray-800 mb-4">Role: {actor.role}</p>
                            <div className="mb-4 flex flex-wrap">
                                <p className="text-gray-800 mr-4 mb-2 sm:mb-0"><strong>Birth Date:</strong> {formatDate(actor.birth_date)}</p>
                                <p className="text-gray-800 mr-4 mb-2 sm:mb-0"><strong>Gender:</strong> {actor.gender}</p>
                                <p className="text-gray-800"><strong>Nationality:</strong> {actor.nationality}</p>
                            </div>
                            <p className="text-gray-800 leading-relaxed mb-4">
                                {actor.biography}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        {actor.series.map(series => (
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4" key={series.id}>
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-4 text-gray-900">
                                        <div className="font-bold">
                                            {series.name ? (
                                                <Link
                                                    href={route('series.show', { series: series.id })}
                                                    className="text-blue-200 font-bold hover:underline"
                                                >
                                                    <p className='text-black'>{`${series.name}`}</p>
                                                </Link>
                                            ) : 'Unknown'}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Rating: {series.rating} | Seasons: {series.quantity_of_seasons} | Episodes: {series.quantity_of_series}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
