"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
export default function HomeNavbarAST() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/">Astrid</Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link href="/">Home</Link>
                        <Link href="/api">APIs</Link>
                        <Link href="/data">Data</Link>
                        <Link href="/sources">Sources</Link>
                        <Link href="/permissions">Permissions</Link>
                        <Link href="/services">Services</Link>
                    </div>

                    {/* User Dropdown */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-gray-900">
                            Login
                        </button>
                        <button className="bg-gray-900 text-white px-4 py-2 rounded-md">
                            Sign Up
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-700">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/services">Services</Link>
                        <Link href="/contact">Contact</Link>
                        <div className="mt-3 space-y-1">
                            <button className="block w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                                Login
                            </button>
                            <button className="block w-full text-left bg-gray-900 text-white px-3 py-2 rounded-md">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
