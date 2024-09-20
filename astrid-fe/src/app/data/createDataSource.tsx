"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./dataSourceFormSchema";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;
export default function CreateDataSourceCardAST({
    className,
    ...props
}: CardProps) {
    const [dataSourceType, setDataSourceType] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            postgres: {},
            seaweedfs: {},
            mongodb: {},
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader className="pb-2">
                <CardTitle>Add Data Source</CardTitle>
                <CardDescription>
                    You have 3 connected data sources
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Select onValueChange={(value) => setDataSourceType(value)}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a data source" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Object Store</SelectLabel>
                            <SelectItem value="seaweedfs">Seaweed</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>RelationalDB</SelectLabel>
                            <SelectItem value="postgres">Postgres</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Nonreleational DB</SelectLabel>
                            <SelectItem value="mongodb">MongoDB</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {dataSourceType === "seaweedfs" && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="seaweedfs.masterServerUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Master Server URL
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="http://localhost:9333"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="seaweedfs.volumeServerUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Volume Server URL
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="http://localhost:8080"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {dataSourceType === "postgres" && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="postgres.host"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Host</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Host"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="postgres.port"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Port</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="5432"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="postgres.database"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Database Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Database"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="postgres.user"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="User"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="postgres.password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {dataSourceType === "mongodb" && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="mongodb.host"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Host</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="localhost"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mongodb.port"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Port</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="27017"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mongodb.database"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Database Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="mydb"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mongodb.user"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mongodb.password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
