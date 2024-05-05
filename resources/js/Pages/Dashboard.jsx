import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; 
import { Inertia } from '@inertiajs/inertia';
import SortButton from '@/Components/SortButton';
import axios from 'axios';

export default function Dashboard({ auth,  seriesPaginated, sortedSeries }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSeries, setFilteredSeries] = useState([]);
    const [confirmDeleteMap, setConfirmDeleteMap] = useState({});
    const [sortOrder, setSortOrder] = useState(null);

    // Function to format date as "Month Day, Year"
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Function to check if the current user is the creator of the series or an admin
    const isAllowed = (seriesItem) => {
        return auth.user && (
            (seriesItem.user && seriesItem.user.id === auth.user.id) || // Check if the current user is the creator
            (auth.user.isAdmin) // Check if the current user is an admin
        );
    };

    const handleSortButtonClick = (newSortOrder) => {
        // Update the sort order state
        setSortOrder(newSortOrder);
        console.log('New Sort Order:', newSortOrder);
        
        // Make an AJAX request to fetch sorted series data based on the new sort order
        axios.get('/dashboard', { params: { sort_order: newSortOrder } })
            .then(response => {
                // Log the response for debugging
            console.log('Sorted Series Response:', response);
            // Update the component state with the new sorted series data
            const seriesData = response.data; // Assuming the sorted data is returned in the response
            })
            .catch(error => {
                // Log any errors for debugging
                console.error('Error fetching sorted series:', error);
            });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() !== '') {
            // Filter all series data when search query is not empty
            const filteredData = sortedSeries.filter((seriesItem) =>
                seriesItem.name.toLowerCase().includes(query.toLowerCase()) ||
                (seriesItem.user && seriesItem.user.name.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredSeries(filteredData);
        } else {
            // Reset filter when search query is empty
            setFilteredSeries([]);
        }
    };

    const seriesData = searchQuery ? filteredSeries : seriesPaginated.data;

    const sortedSeriesData = [...seriesData]; // Create a copy of seriesData to avoid mutating state
    if (sortOrder === 'asc') {
        sortedSeriesData.sort((a, b) => new Date(a.date_of_creation) - new Date(b.date_of_creation));
    } else if (sortOrder === 'desc') {
        sortedSeriesData.sort((a, b) => new Date(b.date_of_creation) - new Date(a.date_of_creation));
    }

    // Function to handle series deletion
    const handleDelete = (seriesId, e) => {
        e.stopPropagation(); // Prevent event bubbling
        console.log(`Deleting series with ID: ${seriesId}`);
        if (confirmDeleteMap[seriesId]) {
            // If confirmation is shown, delete the series
            Inertia.delete(route('series.destroy', { series: seriesId }))
                .then(response => {
                    // Log the response for debugging
                    console.log('Delete Series Response:', response);
                })
                .catch(error => {
                    // Log any errors for debugging
                    console.error('Error deleting series:', error);
                });
        } else {
            // If confirmation is not shown, switch to confirmation mode
            setConfirmDeleteMap(prevState => ({ ...prevState, [seriesId]: true }));
        }
    };

    // Function to handle cancellation of series deletion
    const handleCancel = (seriesId, e) => {
        e.stopPropagation(); // Prevent event bubbling
        // Toggle confirmation state to false
        setConfirmDeleteMap(prevState => ({ ...prevState, [seriesId]: false }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-white-800 leading-tight">See the latest posts</h2>
                    <div className="max-w-xs flex flex-row">
                        <SortButton onClick={handleSortButtonClick} />
                        <input 
                            type="text" 
                            placeholder="Search series or user..." 
                            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>
            }
        >
            <Head title="ForumVision" />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Pagination */}
                    <div className="flex justify-between mb-2">
                        <div className="flex justify-left mb-4">
                            {searchQuery ? null : (
                                <>
                                    {seriesPaginated.prev_page_url && (
                                        <button 
                                            className="text-white font-bold py-2 px-4 rounded mr-2 pagination-button" 
                                            onClick={() => window.location.href = seriesPaginated.prev_page_url}
                                        >
                                            Prev
                                        </button>
                                    )}
                                    {[...Array(seriesPaginated.last_page).keys()].map(pageNumber => (
                                        <button 
                                            key={pageNumber+1} 
                                            style={{ border: pageNumber+1 === seriesPaginated.current_page ? '3px solid #A500B4' : 'none' }} 
                                            className="pagination-button text-white font-bold py-2 px-4 rounded mr-2" 
                                            onClick={() => window.location.href = `${seriesPaginated.path}?page=${pageNumber+1}`}
                                        >
                                            {pageNumber+1}
                                        </button>
                                    ))}
                                    {seriesPaginated.next_page_url && (
                                        <button  
                                            className="text-white font-bold py-2 px-4 rounded pagination-button" 
                                            onClick={() => window.location.href = seriesPaginated.next_page_url}
                                        >
                                            Next
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <div className='flex justify-end'>
                            <Link
                                href={route('series.createForm')}
                                className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-xl py-2 px-3 mb-3 rounded-full shadow-lg transition-transform transform hover:scale-110"
                            >
                                Create Post
                            </Link>
                        </div>
                    </div>

                    {sortedSeriesData.map(seriesItem => (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4" key={seriesItem.id}>
                            <div className="p-6 py-2 text-gray-900">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="max-w-xl sm:max-w-md mb-4 sm:mb-0">
                                        <div className="font-bold">
                                            {seriesItem.name ? (
                                                <div>
                                                    <Link
                                                        href={route('series.show', {series: seriesItem.id})}
                                                        className="text-blue-200 font-bold hover:underline"
                                                    >
                                                        <p className="text-xl text-black break-words">{seriesItem.name}</p>
                                                    </Link>
                                                </div>
                                            ) : 'Unknown'}
                                        </div>
                                        <div>Replies <p className="text-sm circle">{seriesItem.comments_count}</p></div>
                                    </div>

                                    <div className="sm:text-right flex items-center max-w-xl sm:max-w-xs">
                                        {/* User details */}
                                        {seriesItem.user ? (
                                            <div className="flex flex-col">
                                                <Link
                                                    href={route('user.show', { user: seriesItem.user.id })}
                                                    className="text-blue-200 font-bold hover:underline mb-1"
                                                >
                                                    <p className="text-gray-800 font-bold">{seriesItem.user.name}</p>
                                                </Link>
                                                <p className="text-gray-600">{formatDate(seriesItem.date_of_creation)}</p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-600">Unknown</p>
                                        )}
                                         {/* Icons */}
                                         {isAllowed(seriesItem) && (
                                            <div className="ml-4 flex flex-col">
                                                {/* Delete button with confirmation */}
                                                {confirmDeleteMap[seriesItem.id] ? (
                                                    <div>
                                                        <button 
                                                            className="bg-red-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-red-600 focus:outline-none focus:bg-red-600" 
                                                            onClick={(e) => handleDelete(seriesItem.id, e)}
                                                        >
                                                            Confirm?
                                                        </button>
                                                        <button 
                                                            className="bg-gray-500 text-white py-1 px-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" 
                                                            onClick={(e) => { handleCancel(seriesItem.id, e); e.stopPropagation(); }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Link
                                                            href={route('series.edit', {series: seriesItem.id})}
                                                            className="text-blue-500 hover:text-blue-700 mb-2"
                                                        >
                                                            <FiEdit className="w-5 h-5" />
                                                        </Link>
                                                        <button
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={(e) => { handleDelete(seriesItem.id, e); e.stopPropagation(); } }
                                                        >
                                                            <FiTrash2 className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                    {/* Pagination */}
                    <div className="flex justify-left mb-4">
                            {searchQuery ? null : (
                                <>
                                    {seriesPaginated.prev_page_url && (
                                        <button 
                                            className="text-white font-bold py-2 px-4 rounded mr-2 pagination-button" 
                                            onClick={() => window.location.href = seriesPaginated.prev_page_url}
                                        >
                                            Prev
                                        </button>
                                    )}
                                    {[...Array(seriesPaginated.last_page).keys()].map(pageNumber => (
                                        <button 
                                            key={pageNumber+1} 
                                            style={{ border: pageNumber+1 === seriesPaginated.current_page ? '3px solid #A500B4' : 'none' }} 
                                            className="pagination-button text-white font-bold py-2 px-4 rounded mr-2" 
                                            onClick={() => window.location.href = `${seriesPaginated.path}?page=${pageNumber+1}`}
                                        >
                                            {pageNumber+1}
                                        </button>
                                    ))}
                                    {seriesPaginated.next_page_url && (
                                        <button  
                                            className="text-white font-bold py-2 px-4 rounded pagination-button" 
                                            onClick={() => window.location.href = seriesPaginated.next_page_url}
                                        >
                                            Next
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

