import ModuleButton from "./moduleButton";

export default function HomePage() {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full grid grid-cols-3 grid-rows-4">
                <ModuleButton moduleName="Customers" destRoute="customers" />
                <ModuleButton moduleName="Tickets" destRoute="tickets" />
                <ModuleButton moduleName="Inventory" destRoute="inventory" />
                <ModuleButton moduleName="Web Designer" destRoute="web" />
                <ModuleButton moduleName="Files" destRoute="files" />
                <ModuleButton moduleName="Accounting" destRoute="accounting" />
            </div>
        </div>
    );
}
