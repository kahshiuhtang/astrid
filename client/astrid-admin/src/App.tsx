import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/home/homePage";
import RootBoundary from "@/errors/rootBoundary";
import AccountingPage from "@/modules/accounting/accountingPage";
import CustomersPage from "@/modules/customers/customersPage";
import FilesPage from "@/modules/files/filesPage";
import WebDesignPage from "@/modules/webDesign/webDesignPage";
import TicketsPage from "@/modules/tickets/ticketsPage";
import InventoryPage from "@/modules/inventory/inventoryPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <RootBoundary />,
    },
    {
        path: "accounting",
        element: <AccountingPage />,
    },
    {
        path: "customers",
        element: <CustomersPage />,
    },
    {
        path: "accounting",
        element: <AccountingPage />,
    },
    {
        path: "files",
        element: <FilesPage />,
    },
    {
        path: "inventory",
        element: <InventoryPage />,
    },
    {
        path: "tickets",
        element: <TicketsPage />,
    },
    {
        path: "web",
        element: <WebDesignPage />,
    },
]);
export default function App() {
    return <RouterProvider router={router} />;
}
