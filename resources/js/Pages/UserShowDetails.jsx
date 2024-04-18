import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';

export default function UserShowDetails({ user, userSeries, userComments, numSeries, numComments, auth }) {
    // logging data for debugging 
    console.log(user);
    console.log(userSeries);
    console.log(userComments);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white-800 leading-tight">User: {user.name}</h2>}
        >
            <Head title="ForumVision" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h3 className="font-semibold text-xl text-white-800 leading-tight mb-2">
                        | User's Posts <p className="text-sm circle">{numSeries}</p> |
                    </h3>
                    <ul>
                        {userSeries.map(series => (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4" key={series.id}>
                                <div className="p-6 py-2 text-gray-900 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-xl text-white-800 leading-tight">{
                                            series.name ? (
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
                                </div>
                            </div>
                        ))}
                    </ul>

                    <h3 className="font-semibold text-xl text-white-800 leading-tight mb-2">
                        | User's Comments <p className="text-sm circle">{numComments}</p> |
                        </h3>
                    <ul>
                        {userComments.map(comment => {
                            return(
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4" key={comment.id}>
                                <div className="p-6 py-2 text-gray-900 flex justify-between items-center">
                                    <div>
                                        {comment.series && (
                                            <div className="font-bold text-xl text-white-800 leading-tight">
                                                <p>{comment.series.name}</p>
                                            </div>
                                         )}
                                         <div >
                                            '{comment.comment}'
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})}
                    </ul>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
