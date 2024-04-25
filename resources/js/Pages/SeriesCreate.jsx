import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function SeriesCreate({ auth }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity_of_series: '',
    rating: '',
    quantity_of_seasons: '',
    date_of_creation: new Date().toISOString().slice(0, 10),
    img_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the server
    Inertia.post(route('series.store'), formData);
  };

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white-800 leading-tight">Create Series</h2>}
        >
          <Head title="Create Series" />
          <div className="py-4">
            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="quantity_of_series" className="block text-sm font-medium text-gray-700">Quantity of Series</label>
                  <input type="number" id="quantity_of_series" name="quantity_of_series" value={formData.quantity_of_series} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                  <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label htmlFor="quantity_of_seasons" className="block text-sm font-medium text-gray-700">Quantity of Seasons</label>
                  <input type="number" id="quantity_of_seasons" name="quantity_of_seasons" value={formData.quantity_of_seasons} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                <label htmlFor="date_of_creation" className="block text-sm font-medium text-gray-700">Date of Creation</label>
                  <input type="date" id="date_of_creation" name="date_of_creation" value={formData.date_of_creation} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" readOnly />
                </div>
                <div className="mb-4">
                  <label htmlFor="img_url" className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input type="url" id="img_url" name="img_url" value={formData.img_url} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md">Create Series</button>
              </form>
            </div>
        </div>
    </AuthenticatedLayout>
  );
  
};

