"use client";

import CreateDataSourceCardAST from "@/app/sources/createDataSource";
import DataSourceTableAST from "@/app/sources/dataSourceTable";

export default function SourcePageAST() {
    return (
        <div className="w-3/4 align-items">
            <div>
                <DataSourceTableAST />
            </div>
            <CreateDataSourceCardAST />
        </div>
    );
}
