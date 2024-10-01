"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Cloud,
    Users,
    Search,
    Bell,
    Settings,
    Trash,
    Laptop,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
    { href: "/home", icon: Cloud, label: "My Drive" },
    { href: "/home/teams", icon: Users, label: "Teams" },
    { href: "/home/trash", icon: Trash, label: "Trash" },
    { href: "/home/devices", icon: Laptop, label: "Devices" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <div className="w-64 bg-secondary p-4 hidden md:block">
                <Link href="/" className="flex items-center mb-6">
                    <Cloud className="h-6 w-6 mr-2" />
                    <span className="text-lg font-semibold">CloudDrive</span>
                </Link>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Button
                            key={item.href}
                            variant={
                                pathname === item.href ? "default" : "ghost"
                            }
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href={item.href}>
                                <item.icon className="mr-2 h-4 w-4" />{" "}
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-background border-b p-4 flex items-center justify-between">
                    <div className="flex items-center w-full max-w-md">
                        <Input
                            type="search"
                            placeholder="Search in Drive"
                            className="mr-2"
                        />
                        <Button variant="ghost" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage
                                        src="/placeholder-avatar.jpg"
                                        alt="User"
                                    />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Mobile Navigation */}
                <nav className="md:hidden flex justify-between p-2 bg-secondary">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={
                                    pathname === item.href ? "default" : "ghost"
                                }
                                size="icon"
                            >
                                <item.icon className="h-4 w-4" />
                            </Button>
                        </Link>
                    ))}
                </nav>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
