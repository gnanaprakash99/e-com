import React from 'react'

const LoginRequest = ({ label, onclose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-sm bg-cardBg text-primaryText p-6 rounded-primaryRadius shadow-lg flex flex-col items-center gap-4">
                <h2 className="text-center text-lg font-medium">
                    Please login to continue <span className="font-semibold">{label}</span>
                </h2>

                <button
                    onClick={onclose}
                        className="mx-auto block bg-primaryBtn text-buttonText border border-buttonBorder py-2 px-6 rounded-primaryRadius font-semibold cursor-pointer hover:scale-105 transition"
                >
                    OK
                </button>
            </div>
        </div>
    )
}

export default LoginRequest;
