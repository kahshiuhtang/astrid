"use client"
import React from "react"
import { Plus, FolderPlus, Upload, MoreVertical, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DrivePage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  const files = [
    { name: "Document 1", type: "doc", size: "15 KB", modified: "2023-09-30" },
    { name: "Spreadsheet", type: "sheet", size: "256 KB", modified: "2023-09-29" },
    { name: "Presentation", type: "slide", size: "1.2 MB", modified: "2023-09-28" },
    { name: "Image.jpg", type: "image", size: "3.5 MB", modified: "2023-09-27" },
    { name: "Project Folder", type: "folder", size: "-", modified: "2023-09-26" },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Drive</h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4 flex space-x-2">
        <Button variant="outline" size="sm">
          <FolderPlus className="mr-2 h-4 w-4" /> New Folder
        </Button>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" /> File Upload
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div key={file.name} className="bg-card p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold">{file.name}</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Open</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Move</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-sm text-muted-foreground">{file.type}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.name} className="bg-card p-2 rounded-lg shadow flex justify-between items-center">
                <div>
                  <div className="font-semibold">{file.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {file.type} • {file.size} • Modified {file.modified}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Move</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}