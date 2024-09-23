"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Server, HardDrive, RefreshCw } from "lucide-react";

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("machines");

    // Mock data
    const machines = [
        { id: 1, name: "Server 1", status: "Running", type: "Web Server" },
        { id: 2, name: "Server 2", status: "Stopped", type: "Database" },
        { id: 3, name: "Server 3", status: "Running", type: "Load Balancer" },
    ];

    const services = [
        { id: 1, name: "Web App", status: "Active", port: 80 },
        { id: 2, name: "API Service", status: "Active", port: 8080 },
        { id: 3, name: "Background Job", status: "Inactive", port: null },
    ];

    const files = [
        {
            id: 1,
            name: "document.pdf",
            size: "2.5 MB",
            lastModified: "2023-09-15",
        },
        {
            id: 2,
            name: "image.jpg",
            size: "1.8 MB",
            lastModified: "2023-09-14",
        },
        { id: 3, name: "data.csv", size: "5.1 MB", lastModified: "2023-09-13" },
    ];

    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };

    const handleSync = () => {
        console.log("Syncing files...");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Search across all data stores..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow"
                        />
                        <Button onClick={handleSearch}>
                            <Search className="mr-2 h-4 w-4" /> Search
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="machines">Machines</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                </TabsList>
                <TabsContent value="machines">
                    <Card>
                        <CardHeader>
                            <CardTitle>Machines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {machines.map((machine) => (
                                        <TableRow key={machine.id}>
                                            <TableCell>
                                                {machine.name}
                                            </TableCell>
                                            <TableCell>
                                                {machine.status}
                                            </TableCell>
                                            <TableCell>
                                                {machine.type}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Server className="mr-2 h-4 w-4" />{" "}
                                                    Manage
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="services">
                    <Card>
                        <CardHeader>
                            <CardTitle>Services</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Port</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {services.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell>
                                                {service.name}
                                            </TableCell>
                                            <TableCell>
                                                {service.status}
                                            </TableCell>
                                            <TableCell>
                                                {service.port || "N/A"}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <HardDrive className="mr-2 h-4 w-4" />{" "}
                                                    Manage
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="files">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                Files
                                <Button onClick={handleSync}>
                                    <RefreshCw className="mr-2 h-4 w-4" /> Sync
                                    Files
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Last Modified</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {files.map((file) => (
                                        <TableRow key={file.id}>
                                            <TableCell>{file.name}</TableCell>
                                            <TableCell>{file.size}</TableCell>
                                            <TableCell>
                                                {file.lastModified}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Search className="mr-2 h-4 w-4" />{" "}
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
