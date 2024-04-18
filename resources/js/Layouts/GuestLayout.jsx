import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center bg-gradient-to-r from-purple-900 to-red-800 text-white min-h-screen flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
            <div>
                <Link href="/">
                    <ApplicationLogo/>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
