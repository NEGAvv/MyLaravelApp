import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-r from-purple-900 to-red-800 text-white min-h-screen flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                            </div>
                        </header>

                        <main className="mt-6">
                            <div className="text-center">
                                <h2 className="text-5xl mb-6">Welcome To The ForumVision!</h2>
                                <div className="space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-2xl py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-110"
                                    >
                                        Forum
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-2xl py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-110"
                                            >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-2xl py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-110"
                                            >
                                            Register
                                        </Link>

                                    </>
                                )}
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
