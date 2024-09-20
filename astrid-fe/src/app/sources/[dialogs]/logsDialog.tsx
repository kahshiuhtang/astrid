"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
export default function LogsDialogAST() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Configure</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>View data source logs</DialogTitle>
                    <DialogDescription>
                        Check for any anomalies and view debugging details.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
