'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import UserMenu from './UserMenu';

// Wings dropdown items - routes that have dedicated pages use absolute paths
const wingsDropdownItems = [
  { title: 'Rise and Thrive', slug: '/rise-and-thrive', hasPage: true },
  { title: 'WINI', slug: '/widen', hasPage: true },
  { title: 'IDEA SPOKEN – The Game Method', slug: '/game-method', hasPage: true },
  { title: 'IDEA Pitha Pathshala', slug: '/pitha', hasPage: true },
  { title: 'Bangla Pitha Research Institute', slug: '/bangla-pitha-research-institute', hasPage: true },
  { title: 'IDEA Youth Development Center', slug: 'youth-development', hasPage: false },
  { title: 'IDEA Social Welfare Organization', slug: 'social-welfare', hasPage: false },
];

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
}

export default function Header({ isLoggedIn = false, userName }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wingsDropdownOpen, setWingsDropdownOpen] = useState(false);
  const [mobileWingsOpen, setMobileWingsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileWingsOpen(false);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle dropdown open with delay clear
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setWingsDropdownOpen(true);
  };

  // Handle dropdown close with delay
  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setWingsDropdownOpen(false);
    }, 300);
  };

  // Get the href for a wing item
  const getWingHref = (item: typeof wingsDropdownItems[0]) => {
    return item.slug.startsWith('/') ? item.slug : `/${item.slug}`;
  };

  // Check if current path is one of the wings
  const isWingsActive = pathname?.startsWith('/widen') ||
    pathname?.startsWith('/pitha') ||
    pathname?.startsWith('/english-debate') ||
    pathname?.startsWith('/rise-and-thrive') ||
    pathname?.startsWith('/game-method') ||
    pathname?.startsWith('/bangla-pitha-research-institute') ||
    pathname?.startsWith('/youth-development') ||
    pathname?.startsWith('/social-welfare');

  // Desktop nav link classes with underline active indicator
  const getNavLinkClasses = (isActive: boolean) =>
    `relative transition-colors font-medium px-4 py-2 ${
      isActive
        ? 'text-purple-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-[2.5px] after:bg-purple-600 after:rounded-full'
        : 'text-gray-700 hover:text-purple-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2.5px] after:bg-purple-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-3/4'
    }`;

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#1e3a8a] text-white">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Contact Info - Hidden on mobile, visible on sm+ */}
            <div className="hidden sm:flex flex-wrap py-3 items-center gap-4 text-xs sm:text-sm">
              <a href="tel:+8801990822023" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+880 1990-822023</span>
              </a>
              <span className="border-r-2 border-white/30 h-5"></span>
              <a href="mailto:info@idea-bd.com" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>ideaspokengamemethod@gmail.com</span>
              </a>
              <span className="border-r-2 border-white/30 h-5 hidden lg:block"></span>
              <div className="hidden lg:flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Khorki, jashore, Bangladesh</span>
              </div>
            </div>

            {/* Mobile: Phone number on left */}
            <div className="flex sm:hidden py-2 items-center text-xs">
              <a href="tel:+8801990822023" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+880 1990-822023</span>
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 bg-[#fbbf24] px-3 sm:px-4 py-2 sm:py-3">
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
      <div className="bg-white ">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-2">
            {/* Logo Section */}
            <Link href="/" className="flex items-center">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <Image
                  src="/images/logo.png"
                  alt="IDEA Spoken Logo"
                  fill
                  sizes="(max-width: 640px) 48px, 64px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 pl-6 xl:pl-8 flex-1">
              <Link href="/" className={getNavLinkClasses(pathname === '/')}>
                Home
              </Link>
              <Link href="/about" className={getNavLinkClasses(pathname === '/about')}>
                About Us
              </Link>
              <Link href="/courses" className={getNavLinkClasses(pathname?.startsWith('/courses') ?? false)}>
                Courses
              </Link>
              <Link href="/notice-board" className={getNavLinkClasses(pathname?.startsWith('/notice-board') ?? false)}>
                Notice Board
              </Link>

              {/* Our Wings with Dropdown - Gradient Badge Style */}
              <div
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`flex items-center gap-1.5 font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                    isWingsActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-300/40'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-200/30 hover:shadow-lg hover:shadow-purple-300/40 hover:scale-[1.03]'
                  }`}
                >
                  Our Wings
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${wingsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {wingsDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100/80 overflow-hidden z-50 animate-[fadeInDown_0.2s_ease-out]"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Gradient accent bar */}
                    <div className="h-1 bg-gradient-to-r from-purple-600 to-indigo-500" />
                    <div className="py-2">
                      {wingsDropdownItems.map((item, index) => {
                        const href = getWingHref(item);
                        const isActive = pathname === href || pathname?.startsWith(href + '/');
                        return (
                          <Link
                            key={index}
                            href={href}
                            className={`flex items-center gap-3 px-5 py-3 text-[15px] transition-all duration-200 ${
                              isActive
                                ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 font-semibold border-l-[3px] border-purple-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600 hover:pl-7 border-l-[3px] border-transparent'
                            }`}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/contact" className={getNavLinkClasses(pathname === '/contact')}>
                Contact
              </Link>
            </nav>

            {/* CTA Buttons - positioned to the right */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              {!isLoggedIn && (
                <Link
                  href="/auth/login"
                  className="flex px-6 border-2 h-12 items-center top-1/2 justify-center border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors font-medium text-base"
                >
                  Student Login
                </Link>
              )}

              <Link
                href="/courses"
                className="flex items-center">
                <button
                  className="bg-[#704FE6]  text-left w-48 rounded-full h-12 relative text-white text-base group overflow-hidden cursor-pointer"
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

              {isLoggedIn && (
                <UserMenu userName={userName} />
              )}

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors ml-auto"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE OVERLAY MENU ===================== */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl lg:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="IDEA Spoken Logo"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
          </Link>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-4">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                pathname === '/'
                  ? 'bg-purple-50 text-purple-700 border-l-[3px] border-purple-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600 border-l-[3px] border-transparent'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                pathname === '/about'
                  ? 'bg-purple-50 text-purple-700 border-l-[3px] border-purple-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600 border-l-[3px] border-transparent'
              }`}
            >
              About Us
            </Link>

            <Link
              href="/courses"
              onClick={closeMobileMenu}
              className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                pathname?.startsWith('/courses')
                  ? 'bg-purple-50 text-purple-700 border-l-[3px] border-purple-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600 border-l-[3px] border-transparent'
              }`}
            >
              Courses
            </Link>

            <Link
              href="/notice-board"
              onClick={closeMobileMenu}
              className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                pathname?.startsWith('/notice-board')
                  ? 'bg-purple-50 text-purple-700 border-l-[3px] border-purple-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600 border-l-[3px] border-transparent'
              }`}
            >
              Notice Board
            </Link>

            {/* Our Wings - Mobile Accordion */}
            <div>
              <button
                onClick={() => setMobileWingsOpen(!mobileWingsOpen)}
                className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                  isWingsActive
                    ? 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500"></span>
                  Our Wings
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${mobileWingsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Wings sub-items with smooth height transition */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileWingsOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-4 pl-4 border-l-2 border-purple-200 space-y-0.5">
                  {wingsDropdownItems.map((item, index) => {
                    const href = getWingHref(item);
                    const isActive = pathname === href || pathname?.startsWith(href + '/');
                    return (
                      <Link
                        key={index}
                        href={href}
                        className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                          isActive
                            ? 'bg-purple-50 text-purple-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className={`flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                pathname === '/contact'
                  ? 'bg-purple-50 text-purple-700 border-l-[3px] border-purple-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600 border-l-[3px] border-transparent'
              }`}
            >
              Contact
            </Link>
          </div>
        </nav>

        {/* CTA Buttons at bottom */}
        <div className="px-4 py-5 border-t border-gray-100 space-y-3">
          {!isLoggedIn ? (
            <Link
              href="/auth/login"
              onClick={closeMobileMenu}
              className="flex items-center justify-center h-12 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors font-medium text-sm"
            >
              Student Login
            </Link>
          ) : (
            <div className="flex items-center justify-center">
              <UserMenu userName={userName} />
            </div>
          )}

          <Link
            href="/courses"
            onClick={closeMobileMenu}
          >
            <button
              className="bg-[#704FE6] text-center w-full rounded-full h-12 relative text-white text-base group overflow-hidden cursor-pointer"
              type="button"
            >
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Browse Courses</p>
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
      </div>
    </header>
  );
}
