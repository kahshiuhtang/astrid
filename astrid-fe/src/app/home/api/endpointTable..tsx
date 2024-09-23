"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

const tempData = [
    {
        id: 1,
        name: "Get Users",
        endpoint: "/api/users",
        description: "Fetches all users",
    },
    {
        id: 2,
        name: "Add User",
        endpoint: "/api/users",
        description: "Adds a new user",
    },
    {
        id: 3,
        name: "Get User",
        endpoint: "/api/users/[id]",
        description: "Fetches a user by ID",
    },
];

export default function ApiEndpointsTable() {
    const [data, setData] = useState(tempData);

    return (
        <div className="mt-2 w-full flex items-center justify-center">
            <div>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Endpoint</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.endpoint}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">
                                                Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Share link
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Anyone who has this link
                                                    will be able to view this.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex items-center space-x-2">
                                                <div className="grid flex-1 gap-2">
                                                    <Label
                                                        htmlFor="link"
                                                        className="sr-only"
                                                    >
                                                        Link
                                                    </Label>
                                                    <Input
                                                        id="link"
                                                        defaultValue="https://ui.shadcn.com/docs/installation"
                                                        readOnly
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    className="px-3"
                                                >
                                                    <span className="sr-only">
                                                        Copy
                                                    </span>
                                                    <CopyIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <DialogFooter className="sm:justify-start">
                                                <DialogClose asChild>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                    >
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
