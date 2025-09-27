import LoginLayout from "@/app/components/LoginLayout";
import Link from "next/link";

/**
 * Home page component for the ToDo Py application.
 *
 * Renders a responsive landing page with a two-column layout:
 * - Left side displays an image.
 * - Right side contains the app title, description, a "Get Started" button, and a sign-in link.
 *
 * @returns {JSX.Element} The rendered home page layout.
 */
export default function Home() {
    return (
        <LoginLayout>
            <h1 className="text-5xl text-center mb-4">ToDo Py</h1>
            <p className="mb-6">
                Stay Organized, Get Things Done: Your Ultimate To-Do List App.
                A todo list app is a digital task management tool designed to help
                users organize and prioritize their daily activities and responsibilities.
            </p>
            <Link href="./register" className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors mb-4 text-center">
                {/* <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors mb-4"> */}
                Get Started
                {/* </button> */}
            </Link>
            <p className="text-center">
                Already have an account?{" "}
                <Link href="./login" className="text-blue-500 hover:underline">
                    Sign In
                </Link>
            </p>
        </LoginLayout>
    );
}
