"use client";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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

type Service = {
    id: string;
    serviceName: string;
    vmName: string;
    ipAddress: string;
    status: "Running" | "Stopped" | "Starting";
    region: string;
    port: number;
    uptime: string; // could also be number of hours
    cpuUsage: number; // percentage
    ramUsage: number; // percentage
    diskUsage: string; // in GB or TB
    autoScaling: boolean;
    lastUpdate: string; // ISO date format or readable date string
};

const services: Service[] = [
    {
        id: "ABC",
        serviceName: "MySQL",
        vmName: "vm-001",
        ipAddress: "192.168.1.2",
        status: "Running",
        region: "US-East",
        port: 3306,
        uptime: "72h",
        cpuUsage: 30,
        ramUsage: 40,
        diskUsage: "50GB",
        autoScaling: true,
        lastUpdate: "2024-09-10T10:30:00Z",
    },
    {
        id: "DEF",
        serviceName: "Apache",
        vmName: "vm-002",
        ipAddress: "192.168.1.3",
        status: "Stopped",
        region: "US-West",
        port: 80,
        uptime: "--",
        cpuUsage: 0,
        ramUsage: 0,
        diskUsage: "25GB",
        autoScaling: false,
        lastUpdate: "2024-08-25T09:00:00Z",
    },
];

export default function ServicesTableAST() {
    return (
        <div>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Machine</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Uptime</TableHead>
                        <TableHead>Scaling</TableHead>
                        <TableHead>Clone</TableHead>
                        <TableHead>Scale</TableHead>
                        <TableHead>Metrics</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services.map((service) => (
                        <TableRow key={service.id}>
                            <TableCell>{service.serviceName}</TableCell>
                            <TableCell>{service.vmName}</TableCell>
                            <TableCell>{service.status}</TableCell>
                            <TableCell>{service.uptime}</TableCell>
                            <TableCell>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                service.autoScaling
                                                    ? "Auto Scale"
                                                    : "Self Scale"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="auto">
                                            Auto Scale
                                        </SelectItem>
                                        <SelectItem value="self">
                                            Self Scale
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            Duplicate
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Are you sure you want to create
                                                another version of this service?
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="flex flex-row">
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            "Choose method of duplication."
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="clone">
                                                        Clone Existing Machine
                                                    </SelectItem>
                                                    <SelectItem value="new">
                                                        New Machine With Same Service
                                                    </SelectItem>
                                                    <SelectItem value="recreate">
                                                        Recreate Service On Machine
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button className="ml-2">
                                                Create
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
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">
                                            Settings
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Scale Service
                                            </DialogTitle>
                                            <DialogDescription>
                                                Change resources allocated to
                                                service
                                            </DialogDescription>
                                        </DialogHeader>
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
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">View</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>
                                                View Metrics
                                            </DialogTitle>
                                            <DialogDescription>
                                                See how many resources are
                                                currently being consumed by this
                                                service.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="cpuusage"
                                                    className="text-right"
                                                >
                                                    CPU Usage
                                                </Label>
                                                <Input
                                                    id="cpuusage"
                                                    value={service.cpuUsage}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="ramusage"
                                                    className="text-right"
                                                >
                                                    RAM Usage
                                                </Label>
                                                <Input
                                                    id="ramusage"
                                                    value={service.ramUsage}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="diskusage"
                                                    className="text-right"
                                                >
                                                    Disk Usage
                                                </Label>
                                                <Input
                                                    id="diskusage"
                                                    value={service.diskUsage}
                                                    className="col-span-3"
                                                />
                                            </div>
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
    );
}
