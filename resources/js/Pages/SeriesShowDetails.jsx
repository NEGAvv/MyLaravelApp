import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';
import actorPic from '/public/images/actors/1.jpg'
import { useEffect, useState } from 'react';

export default function SeriesShowDetails({ series, imageUrl: seriesImg,actorImages, userComments, auth }) {
    // Function to format date as "Month Day, Year"
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

        console.log("series.actors.img_url:", seriesImg);
        
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white-800 leading-tight">{series.name}</h2>}
        >
            <Head title="Series Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row mb-6">
                        <div className="sm:w-1/2">
                            <img src={seriesImg} alt="Placeholder Image" className="w-full h-auto" />
                        </div>
                        <div className="sm:w-1/2 p-4 sm:p-8">
                            <h1 className="text-2xl font-bold mb-2 text-black">{series.name}</h1>
                            <div className="flex flex-wrap mb-4">
                                {series.categories.map(category => (
                                    <span key={category.id} className="inline-block bg-gray-800 text-white rounded-full px-3 py-1 text-sm font-semibold mr-1 mb-1 hover:bg-gray-700 hover:text-gray-200 hover:border-gray-600 border border-gray-900 cursor-default">
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-gray-800 leading-relaxed">
                                Rating: {series.rating} | Episodes: {series.quantity_of_series} | Seasons: {series.quantity_of_seasons} 
                            </h2>
                            <p className="text-gray-800 leading-relaxed mb-4">
                                {series.description}
                            </p>
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
                        </div>
                    </div>
                    
                    <ul>
                        {userComments.map(comment => (
                            <li className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4" key={comment.id}>
                                <div className="p-6 py-2 text-gray-900">
                                    {comment.user ? (
                                        <div className="mb-1 flex items-center">
                                            <Link 
                                                href={route('user.show', {user: comment.user.id})} 
                                                className="text-blue-200 font-bold hover:underline"
                                            >
                                                <h2 className='text-black mr-2'>{comment.user.name}</h2>
                                            </Link>
                                            <p className="text-gray-600">{formatDate(comment.date_of_creation)}</p>
                                        </div>
                                    ) : 'Unknown'}
                                    <div>{comment.comment}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
