import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Cloud,
    Share2,
    Laptop,
    Server,
    Database,
    HardDrive,
    Cpu,
} from "lucide-react";
import Link from "next/link";

export default function Component() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="/home">
                    <Cloud className="h-6 w-6" />
                    <span className="ml-2 text-2xl font-bold">Astrid-FS</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#"
                    >
                        Features
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#"
                    >
                        Pricing
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#"
                    >
                        About
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#"
                    >
                        Contact
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Your Complete Cloud Solution
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Sync files, manage machines, spin up
                                    services, databases, and object storage -
                                    all from one powerful platform.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button size="lg">Get Started</Button>
                                <Button size="lg" variant="outline">
                                    View Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                            Comprehensive Features
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <Share2 className="h-10 w-10 mb-2" />
                                    <CardTitle>File Sync & Sharing</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Seamlessly sync and share files across
                                        all your devices and with your team.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Laptop className="h-10 w-10 mb-2" />
                                    <CardTitle>Cross-Platform Access</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Access your files and services from
                                        Windows, macOS, Linux, iOS, and Android
                                        devices.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Server className="h-10 w-10 mb-2" />
                                    <CardTitle>Machine Management</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Easily provision and manage virtual
                                        machines for your development and
                                        production needs.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Cpu className="h-10 w-10 mb-2" />
                                    <CardTitle>Service Deployment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Spin up and scale services with just a
                                        few clicks, from web apps to
                                        microservices.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Database className="h-10 w-10 mb-2" />
                                    <CardTitle>Database Solutions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Deploy and manage SQL and NoSQL
                                        databases to power your applications.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <HardDrive className="h-10 w-10 mb-2" />
                                    <CardTitle>Object Storage</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Store and retrieve any amount of data
                                        with our scalable object storage
                                        solution.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Start Your Cloud Journey Today
                                </h2>
                                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Join thousands of developers and businesses
                                    who trust CloudSync for their complete cloud
                                    infrastructure needs.
                                </p>
                            </div>
                            <Button size="lg">Sign Up Now</Button>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 CloudSync. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Security
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
