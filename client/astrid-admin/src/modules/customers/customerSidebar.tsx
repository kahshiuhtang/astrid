import CustomerSidebarItem from "./customerSidebarItem";

export default function CustomerSidebar() {
    return (
        <div>
            <CustomerSidebarItem itemName="Deals" />
            <CustomerSidebarItem itemName="Leads" />
            <CustomerSidebarItem itemName="Contacts" />
            <CustomerSidebarItem itemName="Accounts" />
            <CustomerSidebarItem itemName="Activities" />
            <CustomerSidebarItem itemName="Dashboard" />
        </div>
    );
}
