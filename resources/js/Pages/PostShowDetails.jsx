import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/inertia-react';

export default function PostShowDetails({ series, userComments, numComments, auth }) {
    console.log(series);
    console.log(userComments);
    console.log(numComments);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white-800 leading-tight">{series.name}</h2>}
        >
            <Head title="ForumVision" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h3>Series Information:</h3>
                    <p>Name: {series.name}</p>
                    <p>Quantity of Series: {series.quantity_of_series}</p>
                    <p>Rating: {series.rating}</p>

                    <h3>Comments:</h3>
                    <p>Total Comments: {numComments}</p>
                    <ul>
                        {userComments.map(comment => (
                            <li key={comment.id}>
                                <p>User: {comment.user.name}</p>
                                <p>Comment: {comment.comment}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
