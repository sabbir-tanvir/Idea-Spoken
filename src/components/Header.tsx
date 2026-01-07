'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center  gap-2 sm:gap-4">
            {/* Contact Info */}
            <div className="flex flex-wrap py-3 items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm">
              <a href="tel:+8801949212679" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+880 1949-212679</span>
              </a>
              <span className="border-r-2 border-white/30 h-5"></span>
              <a href="mailto:info@idea-bd.com" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@idea-bd.com</span>
              </a>
              <span className="border-r-2 border-white/30 h-5"></span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Khorki, jashore, Bangladesh</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center py-3 gap-3 bg-[#fbbf24] px-4 py-1 ">
              <a href="#" className="text-gray-800 hover:text-blue-600 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-800 hover:text-pink-600 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-gray-800 hover:text-red-600 transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-12 h-12 sm:w-16 sm:h-18">
                <img src="logo.png" alt="" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex  items-center space-x-1">
              <Link
                href="/"
                className={`transition-colors font-medium px-4 py-2 rounded-full ${pathname === '/'
                  ? 'text-purple-600 border-2 border-purple-600'
                  : 'text-gray-700 hover:text-purple-600 hover:border-2 hover:border-purple-200'
                  }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`transition-colors font-medium px-4 py-2 rounded-full ${pathname === '/about'
                  ? 'text-purple-600 border-2 border-purple-600'
                  : 'text-gray-700 hover:text-purple-600 hover:border-2 hover:border-purple-200'
                  }`}
              >
                About Us
              </Link>
              <Link
                href="/courses"
                className={`transition-colors font-medium px-4 py-2 rounded-full ${pathname?.startsWith('/courses')
                  ? 'text-purple-600 border-2 border-purple-600'
                  : 'text-gray-700 hover:text-purple-600 hover:border-2 hover:border-purple-200'
                  }`}
              >
                Courses
              </Link>
              <Link
                href="/our-wings"
                className={`transition-colors font-medium px-4 py-2 rounded-full ${pathname?.startsWith('/our-wings')
                  ? 'text-purple-600 border-2 border-purple-600'
                  : 'text-gray-700 hover:text-purple-600 hover:border-2 hover:border-purple-200'
                  }`}
              >
                Our Wings
              </Link>
              <Link
                href="/blog"
                className={`transition-colors font-medium px-4 py-2 rounded-full ${pathname?.startsWith('/blog')
                  ? 'text-purple-600 border-2 border-purple-600'
                  : 'text-gray-700 hover:text-purple-600 hover:border-2 hover:border-purple-200'
                  }`}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={`transition-colors font-medium px-4 py-2 rounded-full ${pathname === '/contact'
                  ? 'text-purple-600 border-2 border-purple-600'
                  : 'text-gray-700 hover:text-purple-600 hover:border-2 hover:border-purple-200'
                  }`}
              >
                Contact
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/login"
                className="flex px-4 py-2 border-2 h-12 items-center justify-center border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors font-medium text-sm"
              >
                Student Login
              </Link>

              {/* 
              <Link
                href="/courses"
                className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors font-medium text-sm flex items-center gap-2"
              >
                Browse Courses
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link> */}
              <Link
                href="/courses">
                <button
                  className="bg-[#704FE6] text-left w-48 rounded-full h-12 relative text-white text-base group overflow-hidden cursor-pointer"
                  type="button"
                >
                  
                  <p className="absolute left-4 top-1/2 -translate-y-1/2">Browse Courses</p>

                  <div
                    className="bg-[#785DD7] rounded-full h-12 w-1/4 flex items-center justify-center absolute right-0 top-0 group-hover:w-full z-10 duration-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      height="25px"
                      width="25px"
                    >
                      <path
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        fill="#ffffffff"
                      ></path>
                      <path
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        fill="#ffffffff"
                        transform="scale(-1, 1) translate(-1024, 0)"
                      ></path>
                    </svg>
                  </div>
                </button>

              </Link>





            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={`transition-colors font-medium px-4 py-2 rounded-full text-center ${pathname === '/'
                    ? 'text-purple-600 border-2 border-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                    }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`transition-colors font-medium px-4 py-2 rounded-full text-center ${pathname === '/about'
                    ? 'text-purple-600 border-2 border-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                    }`}
                >
                  About Us
                </Link>
                <Link
                  href="/courses"
                  className={`transition-colors font-medium px-4 py-2 rounded-full text-center ${pathname?.startsWith('/courses')
                    ? 'text-purple-600 border-2 border-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                    }`}
                >
                  Courses
                </Link>
                <Link
                  href="/our-wings"
                  className={`transition-colors font-medium px-4 py-2 rounded-full text-center ${pathname?.startsWith('/our-wings')
                    ? 'text-purple-600 border-2 border-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                    }`}
                >
                  Our Wings
                </Link>
                <Link
                  href="/blog"
                  className={`transition-colors font-medium px-4 py-2 rounded-full text-center ${pathname?.startsWith('/blog')
                    ? 'text-purple-600 border-2 border-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                    }`}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className={`transition-colors font-medium px-4 py-2 rounded-full text-center ${pathname === '/contact'
                    ? 'text-purple-600 border-2 border-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                    }`}
                >
                  Contact
                </Link>
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors font-medium text-sm text-center"
                  >
                    Student Login
                  </Link>

                  {/* <Link
                    href="/courses"
                    className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                  >
                    Browse Courses
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link> */}

                  <Link
                    href="/courses">
                    <button
                      className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
                      type="button"
                    >
                      <div
                        className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          height="25px"
                          width="25px"
                        >
                          <path
                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            fill="#000000"
                          ></path>
                          <path
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            fill="#000000"
                          ></path>
                        </svg>
                      </div>
                      <p className="translate-x-2">Go Back</p>
                    </button>

                  </Link>



                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
