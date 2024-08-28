import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
interface ItemField {
  field: string;
  value: string;
}
interface ItemTemplate {
  name: string;
  fields: ItemField[];
}
interface ExistingTemplatesProps {
  templates: ItemTemplate[];
}

export default function ExistingTemplatesTable({
  templates,
}: ExistingTemplatesProps) {
  return (
    <>
      <Table className="">
        <TableCaption>Existing templates you have created</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Item Name</TableHead>
            <TableHead>Fields</TableHead>
            <TableHead>Save All</TableHead>
            <TableHead>Destroy All</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.fields.length}</TableCell>
              <TableCell>{<Button variant="default">Save</Button>}</TableCell>
              <TableCell>
                {<Button variant="destructive">Delete</Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
