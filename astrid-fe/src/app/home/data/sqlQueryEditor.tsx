"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { QueryResult, isSQLQuery } from "@/app/home/data/query";
var dataSource: string[] = ["Mongo1", "Mongo2", "Postgres1"];
export default function SQLQueryEditor() {
    const [query, setQuery] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState<QueryResult>(null);
    const handleSubmit = () => {};
    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="flex w-full">
                <h1 className="text-2xl font-bold mb-4 mr-2">
                    SQL Query Editor
                </h1>
                <div className="w-1/8">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a data source" />
                        </SelectTrigger>
                        <SelectContent>
                            {dataSource.map((source: string, index: number) => (
                                <SelectItem
                                    key={index}
                                    value={source}
                                >{source}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your SQL query here..."
                    className="font-mono"
                    rows={5}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Executing..." : "Execute Query"}
                </Button>
            </form>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {data && isSQLQuery(data) && (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {data.columns.map(
                                    (column: string, index: number) => (
                                        <TableHead key={index}>
                                            {column}
                                        </TableHead>
                                    )
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.rows.map(
                                (row: string[], rowIndex: number) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <TableCell key={cellIndex}>
                                                {cell}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
