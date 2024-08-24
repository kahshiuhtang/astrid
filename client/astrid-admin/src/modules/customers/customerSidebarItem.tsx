interface CustomerSidebarItemProps {
    itemName: string;
}
export default function CustomerSidebarItem({
    itemName,
}: CustomerSidebarItemProps) {
    return (
        <div>
            <p>{itemName}</p>
        </div>
    );
}
