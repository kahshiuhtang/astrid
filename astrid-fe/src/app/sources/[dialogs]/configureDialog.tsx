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
export default function ConfigureDialogAST() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Configure</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Configure data source</DialogTitle>
                    <DialogDescription>
                        Make changes to configuration settings of data source.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
