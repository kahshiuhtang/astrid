"use client";

import ServicesSearchBarAST from "./searchBar";
import ServicesTableAST from "./servicesTable";

export default function ServicesPageAST() {
    return (
        <div>
            <div className="w-full flex justify-center">
                <ServicesSearchBarAST />
            </div>
            <div className="p-2">
                <ServicesTableAST />
            </div>
        </div>
    );
}
