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
export default function RolesDialogAST() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Configure</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Configure which roles have access to data source</DialogTitle>
                    <DialogDescription>
                        Create, update and adjust settings for authorizing data access.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
