"use client";

import CreateDataSourceCardAST from "@/app/data/createDataSource";
import DataSourceTableAST from "@/app/data/dataSourceTable";

export default function DataPageAST() {
    return (
        <div className="w-3/4 align-items">
            <div>
                <DataSourceTableAST />
            </div>
            <CreateDataSourceCardAST />
        </div>
    );
}
