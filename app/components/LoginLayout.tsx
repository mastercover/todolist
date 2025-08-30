import React from 'react'
import Image from "next/image";

interface LoginLayoutProps {
    children: React.ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
    return (
        <main className="grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4 px-16 py-20 bg-[#c4c4c4] h-screen relative">
            <div className="bg-[#c4c4c4] h-full rounded-4xl flex flex-col md:flex-row overflow-hidden gap-[3%]">
                <div className="w-full md:w-1/2 rounded-4xl overflow-hidden">
                    <Image
                        src="/todoList.webp"
                        alt="To-do list"
                        width={500}
                        height={500}
                        className="object-cover h-full w-full"
                    />
                </div>
                <div className="w-full md:w-1/2 rounded-4xl shadow-lg flex flex-col justify-center bg-[#FFF9F9]">
                    <div className="pl-30 flex flex-col justify-center w-[90%]">
                        {children}
                    </div>
                </div>
            </div>

        </main>
    )
}

export default LoginLayout
