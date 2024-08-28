import ExistingTemplatesTable from "./existingTemplatesTable";
import InventoryTemplateForm from "./inventoryTemplateForm";

export default function InventoryPage() {
  const exampleTemplates = [
    { name: "Template 1", fields: [] },
    { name: "Template 2", fields: [] },
    { name: "Template 3", fields: [] },
  ];
  return (
    <>
      <ExistingTemplatesTable
        templates={exampleTemplates}
      ></ExistingTemplatesTable>
      <InventoryTemplateForm isEdit={false} />
    </>
  );
}
