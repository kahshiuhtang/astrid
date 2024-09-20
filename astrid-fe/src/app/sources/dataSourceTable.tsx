"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import MetricsDialogAST from "@/app/sources/[dialogs]/metricsDialog";
import LogsDialogAST from "@/app/sources/[dialogs]/logsDialog";
import RolesDialogAST from "@/app/sources/[dialogs]/rolesDialog";
import ConfigureDialogAST from "@/app/sources/[dialogs]/configureDialog";
interface DataSourceType {
    id: string;
    name: string;
    type: string;
    specification: string;
}
const dataSources: DataSourceType[] = [
    {
        id: "XI1D4CSXAW",
        name: "Prod NoSQL",
        type: "MongoDB",
        specification: "MongoDB",
    },
    {
        id: "5TFQAKN42A",
        name: "Dev NoSQL",
        type: "MongoDB",
        specification: "MongoDB",
    },
    {
        id: "PFLKE32DNB",
        name: "Prod SQL",
        type: "Postgres",
        specification: "Postgres",
    },
    {
        id: "MDX00VOT7N",
        name: "Dev SQL",
        type: "Postgres",
        specification: "Postgres",
    },
    {
        id: "14EZI4QG2O",
        name: "Object Store",
        type: "SeaweedFS",
        specification: "S3",
    },
];
export default function DataSourceTableAST() {
    return (
        <Table>
            <TableCaption>
                Here is a list of connected data sources.
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Specification</TableHead>
                    <TableHead>Metrics</TableHead>
                    <TableHead>Logs</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Settings</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dataSources.map((dataSource) => (
                    <TableRow key={dataSource.id}>
                        <TableCell className="font-medium">
                            {dataSource.name}
                        </TableCell>
                        <TableCell>{dataSource.type}</TableCell>
                        <TableCell>{dataSource.specification}</TableCell>
                        <TableCell>
                            <MetricsDialogAST/>
                        </TableCell>
                        <TableCell>
                            <LogsDialogAST/>
                        </TableCell>
                        <TableCell>
                            <RolesDialogAST/>
                        </TableCell>
                        <TableCell>
                            <ConfigureDialogAST/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
