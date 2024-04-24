import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function SeriesEdit({ series, auth }) {
    const { data, setData, post } = useForm({
        name: series.name,
        description: series.description,
        quantity_of_series: series.quantity_of_series,
        rating: series.rating,
        quantity_of_seasons: series.quantity_of_seasons,
        date_of_creation: series.date_of_creation,
        img_url: series.img_url,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('series.update', { series: series.id }), data);
    };
    

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-white-800 leading-tight break-words">{series.name}</h2>}>
            <Head title="Edit Series" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row mb-6">
                        <div className="sm:w-1/2">
                        {data.img_url.startsWith("images/posters/") ? (
                        <img
                            src={`http://127.0.0.1:8000/${data.img_url}`}
                            alt="Series Image"
                            className="w-full h-auto"
                        />
                        ) : (
                        <img src={data.img_url} alt="Series Image" className="w-full h-auto" />
                        )}

                        </div>
                        <div className="sm:w-1/2 p-4 sm:p-8">
                            <h1 className="text-2xl font-bold mb-2 text-black  break-words">{series.name}</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                                    <textarea
                                        id="description"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none overflow-hidden"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="quantity_of_series" className="block text-gray-700 font-bold mb-2">Quantity of Series</label>
                                    <input
                                        id="quantity_of_series"
                                        type="number"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.quantity_of_series}
                                        onChange={(e) => setData('quantity_of_series', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating</label>
                                    <input
                                        id="rating"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.rating}
                                        onChange={(e) => setData('rating', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="quantity_of_seasons" className="block text-gray-700 font-bold mb-2">Quantity of Seasons</label>
                                    <input
                                        id="quantity_of_seasons"
                                        type="number"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.quantity_of_seasons}
                                        onChange={(e) => setData('quantity_of_seasons', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4" style={{ display: 'none' }}>
                                    <label htmlFor="date_of_creation" className="block text-gray-700 font-bold mb-2">Date of Creation</label>
                                    <input
                                        id="date_of_creation"
                                        type="date"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.date_of_creation}
                                        onChange={(e) => setData('date_of_creation', e.target.value)}
                                        readOnly
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="img_url" className="block text-gray-700 font-bold mb-2">Image URL</label>
                                    <input
                                        id="img_url"
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.img_url}
                                        onChange={(e) => setData('img_url', e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
