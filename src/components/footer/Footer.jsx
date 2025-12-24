import React from 'react'

const Footer = () => {
    return (
        <footer className="text-mutedText border-t bg-headerBg">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">HridyaTarangini</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-6 sm:gap-6 sm:grid-cols-3">
                        {/* Resources */}
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
                            <ul className="font-medium">
                                <li className="mb-4">
                                    <a href="" className="hover:underline">Paintings</a>
                                </li>
                                <li>
                                    <a href="" className="hover:underline">Pottery</a>
                                </li>
                            </ul>
                        </div>

                        {/* Why Choose Us */}
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Why Choose Us</h2>
                            <ul className="font-medium">
                                <li className="mb-4">High quality hand-crafted products</li>
                                <li className="mb-4">Unique and authentic designs</li>
                                <li>Excellent customer support</li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
                            <ul className="font-medium">
                                <li className="mb-4">
                                    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/terms-conditions" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 sm:mx-auto border-mutedText lg:my-8" />

                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm sm:text-center">
                        © 2025 <a href="/" className="hover:underline">HridyaTarangini</a>. All Rights Reserved.
                    </span>

                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        {/* Facebook */}
                        {/* <a href="#" className="hover:text-buttonText">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>

                        {/* Instagram */}
                        {/* <a href="#" className="hover:text-buttonText ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.338 3.608 1.313.975.975 1.251 2.242 1.313 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.338 2.633-1.313 3.608-.975.975-2.242 1.251-3.608 1.313-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.338-3.608-1.313-.975-.975-1.251-2.242-1.313-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.338-2.633 1.313-3.608.975-.975 2.242-1.251 3.608-1.313C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.012 7.052.07 5.772.127 4.668.36 3.677 1.351 2.686 2.342 2.453 3.446 2.396 4.726.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.057 1.28.29 2.384 1.281 3.375.991.991 2.095 1.224 3.375 1.281C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.057 2.384-.29 3.375-1.281.991-.991 1.224-2.095 1.281-3.375C23.988 15.668 24 15.264 24 12s-.012-3.668-.07-4.948c-.057-1.28-.29-2.384-1.281-3.375-.991-.991-2.095-1.224-3.375-1.281C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                            </svg>
                            <span className="sr-only">Instagram</span>
                        </a> */}

                        {/* YouTube */}
                        {/* <a href="#" className="hover:text-buttonText ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a2.996 2.996 0 0 0-2.108-2.12C19.385 3.5 12 3.5 12 3.5s-7.385 0-9.39.566a2.996 2.996 0 0 0-2.108 2.12A31.88 31.88 0 0 0 0 12a31.88 31.88 0 0 0 .502 5.814 2.996 2.996 0 0 0 2.108 2.12C4.615 20.5 12 20.5 12 20.5s7.385 0 9.39-.566a2.996 2.996 0 0 0 2.108-2.12A31.88 31.88 0 0 0 24 12a31.88 31.88 0 0 0-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
                            </svg>
                            <span className="sr-only">YouTube</span>
                        </a>  */}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
