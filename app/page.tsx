import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
            <section className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
                    👋 Welcome to <span className="text-blue-600">Next.js</span>!
                </h1>

                <p className="text-lg text-gray-600 mb-10">
                    Explore the features below and enjoy building your app.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                    <Link
                        href="users/login"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        🔐 Login
                    </Link>
                    <Link
                        href="/todoList"
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        🛒 Products
                    </Link>
                    <Link
                        href="/users/testUseMemo"
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                    >
                        ⚙️ Test useMemo
                    </Link>
                </div>
            </section>
        </main>
    );
}
