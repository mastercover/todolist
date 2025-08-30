"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-red-600">Đã xảy ra lỗi!</h1>
            <p className="text-gray-700 mt-2">{error.message}</p>
            <button
                onClick={() => reset()}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg"
            >
                Thử lại
            </button>
        </div>
    );
}
