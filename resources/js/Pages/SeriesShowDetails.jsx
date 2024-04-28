import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';
import {  useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FiEdit, FiTrash2, FiPlusCircle } from 'react-icons/fi';

export default function SeriesShowDetails({ series, imageUrl: seriesImg,actorImages, userComments, auth }) {
    // Function to format date as "Month Day, Year"
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // State variables to manage edit mode and edited comment
    const [comment, setComment] = useState('');
    const [editMode, setEditMode] = useState(null); // Store the ID of the comment being edited
    const [editedComment, setEditedComment] = useState('');
    const [confirmDeleteMap, setConfirmDeleteMap] = useState({});

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Ensure comment is not empty
        if (!comment.trim()) {
            return;
        }
    
        // Handle comment submission
        Inertia.post(route('comments.store', { seriesId: series.id }), {
            series_id: series.id,
            comment: comment
        }).then(() => {
            // Reset the comment input after successful submission
            setComment('');
        }).catch(error => {
            console.error('Error submitting comment:', error);
        });
    };

    // Function to handle editing a comment
    const handleEdit = (commentId) => {
        // Set the ID of the comment being edited and enter edit mode
        setEditedComment(userComments.find(comment => comment.id === commentId).comment);
        setEditMode(commentId);
    };

    // Function to handle submitting the edited comment
    const handleSubmitEdit = () => {
        if (!editedComment.trim()) {
            return;
        }
        console.log('Submitting edited comment:', editedComment);

        // Send a PUT request to the server to update the comment
        Inertia.put(route('comments.update', { comment: editMode }), {
            comment: editedComment
        }).then(() => {
            // Upon successful update, exit edit mode
            setEditMode(null);
            setEditedComment(''); // Clear the edited comment
        }).catch(error => {
            console.error('Error updating comment:', error);
        });
    };

    // Function to handle canceling the edit
    const handleCancelEdit = () => {
        setEditMode(null); // Exit edit mode
        setEditedComment(''); // Reset edited comment
    };

    // Function to handle delete
    const handleDelete = (commentId) => {
        if (confirmDeleteMap[commentId]) {
            Inertia.delete(route('comments.destroy', { comment: commentId }))
                .then(response => {
                    // Log the response for debugging
                    console.log('Delete Comment Response:', response);
                    
                    // Remove the deleted comment from the userComments array
                    setUserComments(userComments.filter(comment => comment.id !== commentId));
    
                    // Reset confirmDelete state for this comment
                    setConfirmDeleteMap(prevState => ({ ...prevState, [commentId]: false }));
                })
                .catch(error => {
                    // Log any errors for debugging
                    console.error('Error deleting comment:', error);
       
                    // Reset confirmDelete state for this comment
                    setConfirmDeleteMap(prevState => ({ ...prevState, [commentId]: false }));
                });
        } else {
            // If not in confirm mode, switch to confirm mode for this comment
            setConfirmDeleteMap(prevState => ({ ...prevState, [commentId]: true }));
        }
    };

    // Function to handle canceling the deletion
    const handleCancel = (commentId) => {
        // Toggle the confirmation state to false
        setConfirmDeleteMap(prevState => ({ ...prevState, [commentId]: false }));
    };

    // Function to check if the current user is allowed to edit or delete a comment
    const isAllowed = (currentUser, creatorId) => {
        return currentUser && (
            (currentUser.id === creatorId) || // Check if the current user is the creator
            currentUser.isAdmin // Check if the current user is an admin
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white-800 leading-tight break-words">{series.name}</h2>}
        >
            <Head title="Series Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row mb-6">
                        <div className="sm:w-1/2">
                            <img src={seriesImg} alt="Placeholder Image" className="w-full h-auto" />
                        </div>
                        <div className="sm:w-1/2 p-4 sm:p-8">
                            <div className="flex justify-between items-start mb-2 flex-col">
                                <div className="max-w-full break-words">
                                    <h1 className="text-2xl font-bold text-black whitespace-normal ">
                                        {series.name}
                                    </h1>
                                </div>
                                    {isAllowed(auth.user, series.id_user) && (
                                        <Link
                                            href={route('series.edit', {series: series.id})}
                                            className="text-blue-500 hover:text-blue-700 flex flex-row "
                                        >
                                            <span className='mr-2'>Edit Series</span><FiEdit className="w-5 h-5" />
                                        </Link>
                                     )}
                            </div>

                            {/* Categories */}
                            <div className="flex flex-wrap mb-4">
                                {series.categories.map(category => (
                                    <span key={category.id} className="inline-block bg-gray-800 text-white rounded-full px-3 py-1 text-sm font-semibold mr-1 mb-1 hover:bg-gray-700 hover:text-gray-200 hover:border-gray-600 border border-gray-900 cursor-default">
                                        {category.name}
                                    </span>
                                ))}
                            </div>

                            {/* Series info */}
                            <h2 className="text-gray-800 leading-relaxed">
                                Rating: {series.rating} | Episodes: {series.quantity_of_series} | Seasons: {series.quantity_of_seasons} 
                            </h2>
                            <p className="text-gray-800 leading-relaxed mb-4">
                                {series.description}
                            </p>

                            {/* Actors */}
                            {series.actors.map((actor, index) => (
                                <div className="flex items-center mb-4" key={actor.id}>
                                    <img 
                                        src={actorImages[index]} 
                                        alt="Actor Image" 
                                        className="w-16 h-16 rounded-full mr-4" 
                                    />
                                    <div>
                                        <Link 
                                            href={route('actors.show', { actor: actor.id })}
                                            className="text-blue-200 font-bold hover:underline"
                                        >
                                            <p className="text-gray-800 font-bold">{actor.name}</p>
                                        </Link>
                                        <p className="text-gray-600">Role: {actor.role}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Create actor */}
                            {isAllowed(auth.user, series.id_user) && (
                                <div className="flex items-center mb-4 ml-4">
                                    <Link 
                                        href={route('actors.createForm')}
                                        className="text-blue-200 font-bold hover:underline transition-transform transform hover:scale-110"
                                    >
                                        <div className='text-gray-800 font-bold flex flex-row flex items-center'>
                                                <FiPlusCircle className="mr-1 w-6 h-6" />
                                                Create Actor
                                            
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Add comment */}
                    <div className="flex justify-center">
                        <form onSubmit={(event) => handleSubmit(event, series.id)} className="flex mb-2 w-full">
                            <textarea
                                value={comment}
                                onChange={handleChange}
                                className="flex-1 px-2 py-2 border rounded-md mr-2 resize-none overflow-hidden "
                                placeholder="Write your comment here..."
                                rows={2}
                            ></textarea>
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md">
                                Comment
                            </button>
                        </form>
                    </div>

                    {/* Comments section */}
                    <ul>
                        {userComments.map(comment => (
                            <li className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4" key={comment.id}>
                                <div className="p-6 py-2 text-gray-900">
                                    {comment.user ? (
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="flex items-center">
                                                <Link
                                                    href={route('user.show', { user: comment.user.id })}
                                                    className="text-blue-200 font-bold hover:underline"
                                                >
                                                    <h2 className='text-black mr-2'>{comment.user.name}</h2>
                                                </Link>
                                                <p className="text-gray-600">{formatDate(comment.date_of_creation)}</p>
                                            </div>
                                            {isAllowed(auth.user, comment.user.id) && (
                                                <div className="flex flex-row mt-2 sm:mt-0">
                                                    {editMode === comment.id ? (
                                                        <div className="flex mt-2 sm:mt-0 mb-2">
                                                            <button className="bg-green-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:bg-green-600" onClick={handleSubmitEdit}>
                                                                Save
                                                            </button>
                                                            <button className="bg-gray-500 text-white py-1 px-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={handleCancelEdit}>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {confirmDeleteMap[comment.id] ? (
                                                                <div className="flex">
                                                                    <button 
                                                                        className="bg-red-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-red-600 focus:outline-none focus:bg-red-600" 
                                                                        onClick={(e) => handleDelete(comment.id, e)}
                                                                    >
                                                                        Confirm?
                                                                    </button>
                                                                    <button 
                                                                        className="bg-gray-500 text-white py-1 px-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" 
                                                                        onClick={(e) => { handleCancel(comment.id, e); e.stopPropagation(); }}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <button className="text-blue-500 hover:text-blue-700 mx-2" onClick={() => handleEdit(comment.id)}>
                                                                        <FiEdit className="w-5 h-5"/>
                                                                    </button>
                                                                    <button className="text-red-500 hover:text-red-700" onClick={(e) => handleDelete(comment.id, e)}>
                                                                        <FiTrash2 className="w-5 h-5" />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) : 'Unknown'}
                                    {editMode === comment.id ? (
                                        <div className="mt-2 sm:mt-0 w-full"> 
                                            <textarea
                                                value={editedComment}
                                                onChange={(e) => setEditedComment(e.target.value)}
                                                className="w-full px-2 py-1 border rounded-md resize-none overflow-hidden"
                                                rows="2" 
                                            />
                                        </div>
                                    ) : (
                                        <div className='break-words'>{comment.comment}</div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>



                </div>
            </div>
        </AuthenticatedLayout>
    );
}
