import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import InputError from "@/Components/InputError";

export default function ActorEdit({ actor, auth }) {
    const { data, setData, errors, post } = useForm({
        name: actor.name,
        role: actor.role,
        biography: actor.biography,
        birth_date: actor.birth_date,
        gender: actor.gender,
        nationality: actor.nationality,
        img_url: actor.img_url,
        id_series: actor.series.map((series) => series.id),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(route('actors.update', { actor: actor.id }), data);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleImageUrlChange = (e) => {
        setData("img_url", e.target.value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white-800 leading-tight break-words">
                    {actor.name}
                </h2>
            }
        >
            <Head title="Edit Actor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row mb-6">
                        <div className="sm:w-3/3 md:w-3/4 flex justify-center sm:justify-center p-4 sm:pt-8">
                            {data.img_url.startsWith("images/actors/") ? (
                                <img
                                    src={`http://127.0.0.1:8000/${data.img_url}`}
                                    alt="Actor Image"
                                    className="w-full h-auto"
                                />
                            ) : (
                                <img
                                    src={data.img_url}
                                    alt="Series Image"
                                    className="w-full h-auto"
                                />
                            )}
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="sm:w-2/3 md:w-3/4 p-4 sm:p-8"
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.name ? "border-red-500" : ""
                                    }`}
                                    name="name"
                                    value={data.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="role"
                                >
                                    Role
                                </label>
                                <input
                                    id="role"
                                    type="text"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.role ? "border-red-500" : ""
                                    }`}
                                    name="role"
                                    value={data.role}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputError message={errors.role} />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="birth_date"
                                >
                                    Birth Date
                                </label>
                                <input
                                    id="birth_date"
                                    type="date"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.birth_date
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    name="birth_date"
                                    value={data.birth_date}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputError message={errors.birth_date} />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="gender"
                                >
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.gender ? "border-red-500" : ""
                                    }`}
                                    name="gender"
                                    value={data.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <InputError message={errors.gender} />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="nationality"
                                >
                                    Nationality
                                </label>
                                <input
                                    id="nationality"
                                    type="text"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.nationality
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    name="nationality"
                                    value={data.nationality}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputError message={errors.nationality} />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="biography"
                                >
                                    Biography
                                </label>
                                <textarea
                                    id="biography"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.biography ? "border-red-500" : ""
                                    }`}
                                    name="biography"
                                    value={data.biography}
                                    onChange={handleInputChange}
                                    rows="4"
                                    required
                                ></textarea>
                                <InputError message={errors.biography} />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="img_url"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Image URL
                                </label>
                                <input
                                    id="img_url"
                                    type="text"
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.img_url ? "border-red-500" : ""
                                    }`}
                                    value={data.img_url}
                                    onChange={handleImageUrlChange}
                                    required
                                />
                                <InputError message={errors.img_url} />
                            </div>

                            <div className="flex items-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
