import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
interface ModuleButtonProps {
    moduleName: string;
    destRoute: string;
}
export default function ModuleButton({
    moduleName,
    destRoute,
}: ModuleButtonProps) {
    return (
        <NavLink to={destRoute}>
            <Button className="w-80 h-80 flex items-center justify-center  border-solid border-2">
                <p>{moduleName}</p>
            </Button>
        </NavLink>
    );
}
