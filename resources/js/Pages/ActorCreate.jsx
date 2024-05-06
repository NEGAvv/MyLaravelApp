import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import InputError from "@/Components/InputError";

export default function ActorCreate({ auth }) {
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        biography: "",
        birth_date: new Date().toISOString().slice(0, 10),
        gender: "",
        nationality: "",
        img_url: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form fields
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.role.trim()) {
            errors.role = "Role is required";
        }
        if (!formData.biography.trim()) {
            errors.biography = "Biography is required";
        }
        if (!formData.birth_date.trim()) {
            errors.birth_date = "Birth date is required";
        }
        if (!formData.gender.trim()) {
            errors.gender = "Gender is required";
        }
        if (!formData.nationality.trim()) {
            errors.nationality = "Nationality is required";
        }
        if (!formData.img_url.trim()) {
            errors.img_url = "Image URL is required";
        }

        // Check if the birth date is not in the future
        const currentDate = new Date().toISOString().slice(0, 10);
        if (formData.birth_date > currentDate) {
            errors.birth_date = "Birth date cannot be in the future";
        }

        // If there are errors, set them and prevent form submission
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // If no errors, submit the form data
        Inertia.post(route("actors.store"), formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white-800 leading-tight">
                    Create Actor
                </h2>
            }
        >
            <Head title="Create Actor" />
            <div className="py-4">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                    errors.name && "border-red-500"
                                }`}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Role
                            </label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                    errors.role && "border-red-500"
                                }`}
                            />
                            <InputError message={errors.role} />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="biography"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Biography
                            </label>
                            <textarea
                                id="biography"
                                name="biography"
                                value={formData.biography}
                                onChange={handleChange}
                                rows="3"
                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                    errors.biography && "border-red-500"
                                }`}
                            ></textarea>
                            <InputError message={errors.biography} />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="birth_date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Birth Date
                            </label>
                            <input
                                type="date"
                                id="birth_date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                    errors.birth_date && "border-red-500"
                                }`}
                                max={new Date().toISOString().slice(0, 10)}
                            />
                            <InputError message={errors.birth_date} />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                    errors.gender && "border-red-500"
                                }`}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <InputError message={errors.gender} />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="nationality"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nationality
                            </label>
                            <input
                                type="text"
                                id="nationality"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                    errors.nationality && "border-red-500"
                                }`}
                            />
                            <InputError message={errors.nationality} />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="img_url"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="img_url"
                                name="img_url"
                                value={formData.img_url}
                                onChange={handleChange}
                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                    errors.img_url && "border-red-500"
                                }`}
                            />
                            <InputError message={errors.img_url} />
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Create Actor
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
