import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';
import { FiEdit, FiTrash2} from 'react-icons/fi';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function ActorShowDetails({ actor,actorImg, auth }) {
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    // Function to format date as "Month Day, Year"
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Function to check if the current user is allowed to edit or delete a comment
    const isAllowed = (currentUser) => {
        return currentUser && (
            currentUser.isAdmin // Check if the current user is an admin
        );
    };

    const handleDelete = (id) => {
        if (deleteConfirmation === id) {
          Inertia.delete(route('actors.destroy', { actor: id }))
            .then(() => {
              window.location.href = '/dashboard';
            })
            .catch(error => {
              console.error('Error deleting actor:', error);
            });
        } else {
          setDeleteConfirmation(id);
        }
      };
    
      const handleCancel = () => {
        setDeleteConfirmation(null);
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
                            <h1 className="text-2xl font-bold mb-2 text-black flex items-center">{actor.name}
                            {isAllowed(auth.user) && (
                                deleteConfirmation !== actor.id ? (
                                    <>
                                        <Link 
                                            href={route('actors.edit', {actor: actor.id})}
                                            className="text-blue-500 hover:text-blue-700 mx-2"
                                        >
                                            <FiEdit className="w-5 h-5" />
                                        </Link>
                                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(actor.id)}>
                                        <FiTrash2 className="w-5 h-5" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button className="bg-red-500 text-white py-1 px-2 rounded-md mx-2 hover:bg-red-600 focus:outline-none focus:bg-red-600 text-sm" onClick={() => handleDelete(actor.id)}>
                                        Confirm?
                                      </button>
                                      <button className="bg-gray-500 text-white py-1 px-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 text-sm" onClick={handleCancel}>
                                        Cancel
                                      </button>
                                    </>
                                  )
                                )}
                            </h1>
                            
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
                                            {/* Make different roles for an actor */}
                                            <p>Role: {actor.role}</p>
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
