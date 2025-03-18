import React from 'react'

export const Sign = () => {
    return (
        <div className="h-screen bg-cover flex items-center justify-center" style={{ backgroundImage: "url('/cred.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Username" className="p-2 border rounded" />
                    <input type="password" placeholder="Password" className="p-2 border rounded" />
                    <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit</button>
                </form>
            </div>
        </div>
    )
}
