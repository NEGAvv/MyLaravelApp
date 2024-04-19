import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, series }) {
    // Function to format date as "Month Day, Year"
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Ensure series object is defined and contains the array of series objects
    const seriesData = series && series.data ? series.data : [];

    const [searchQuery, setSearchQuery] = useState('');

    // Filter the series based on the search query
    const filteredSeries = seriesData.filter((seriesItem) =>
        seriesItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (seriesItem.user && seriesItem.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-white-800 leading-tight">See the latest posts</h2>
                    <div className="max-w-xs">
                        <input 
                            type="text" 
                            placeholder="Search series or user..." 
                            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            }
        >
            <Head title="ForumVision" />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Pagination */}
                    <div className="flex justify-left mb-4">
                        {series.prev_page_url && (
                            <button 
                                className="text-white font-bold py-2 px-4 rounded mr-2 pagination-button" 
                                onClick={() => window.location.href = series.prev_page_url}
                                >
                                    Prev
                                </button>
                            )}
                            {[...Array(series.last_page).keys()].map(pageNumber => (
                                <button key={pageNumber+1} 
                                    style={{  border: pageNumber+1 === series.current_page ? '3px solid #A500B4' : 'none'}} 
                                    className=" pagination-button  text-white font-bold py-2 px-4 rounded mr-2" 
                                    onClick={() => window.location.href = `${series.path}?page=${pageNumber+1}`}
                                >
                                    {pageNumber+1}
                                </button>
                            ))}
                            {series.next_page_url && (
                                <button  
                                className=" text-white font-bold py-2 px-4 rounded pagination-button" 
                                onClick={() => window.location.href = series.next_page_url}
                                >
                                    Next
                                </button>
                        )}
                    </div>
                    {filteredSeries.map(seriesItem => (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4" key={seriesItem.id}>
                            <div className="p-6 py-2 text-gray-900 flex justify-between items-center">
                                <div>
                                    <div className="font-bold">
                                        {seriesItem.name ? (
                                            <Link
                                                href={route('series.show', {series: seriesItem.id})}
                                                className="text-blue-200 font-bold hover:underline"
                                            >
                                                <p className='text-xl text-black'>{`${seriesItem.name}`}</p>
                                            </Link>
                                        ) : 'Unknown'}
                                    </div>
                                    <div>Replies <p className="text-sm circle">{seriesItem.comments_count}</p></div>
                                </div>
                                <div className="text-right">
                                    {seriesItem.user ? (
                                        <><Link
                                            href={route('user.show', { user: seriesItem.user.id })}
                                            className="text-blue-200 font-bold hover:underline"
                                        >
                                            <p className="text-gray-800 font-bold">{`${seriesItem.user.name}`}</p>
                                        </Link>
                                        <p className="text-gray-600">{formatDate(seriesItem.date_of_creation)}</p></>
                                    ) : 'Unknown'}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-left mt-8">
                        {series.prev_page_url && (
                            <button 
                                className="text-white font-bold py-2 px-4 rounded mr-2 pagination-button" 
                                onClick={() => window.location.href = series.prev_page_url}
                                >
                                    Prev
                                </button>
                            )}
                            {[...Array(series.last_page).keys()].map(pageNumber => (
                                <button key={pageNumber+1} 
                                    style={{  border: pageNumber+1 === series.current_page ? '3px solid #A500B4' : 'none'}} 
                                    className=" pagination-button  text-white font-bold py-2 px-4 rounded mr-2" 
                                    onClick={() => window.location.href = `${series.path}?page=${pageNumber+1}`}
                                >
                                    {pageNumber+1}
                                </button>
                            ))}
                            {series.next_page_url && (
                                <button  
                                className=" text-white font-bold py-2 px-4 rounded pagination-button" 
                                onClick={() => window.location.href = series.next_page_url}
                                >
                                    Next
                                </button>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

