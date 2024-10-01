"use client"

import React from "react"
import { Search, Plus, FolderPlus, Upload, MoreVertical, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function GoogleDriveClone() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  const files = [
    { name: "Document 1", type: "doc", size: "15 KB", modified: "2023-09-30" },
    { name: "Spreadsheet", type: "sheet", size: "256 KB", modified: "2023-09-29" },
    { name: "Presentation", type: "slide", size: "1.2 MB", modified: "2023-09-28" },
    { name: "Image.jpg", type: "image", size: "3.5 MB", modified: "2023-09-27" },
    { name: "Project Folder", type: "folder", size: "-", modified: "2023-09-26" },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-secondary p-4 hidden md:block">
        <Button className="w-full mb-4" variant="default">
          <Plus className="mr-2 h-4 w-4" /> New
        </Button>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            My Drive
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Shared with me
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Recent
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Starred
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Trash
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center w-full max-w-md">
            <Input type="search" placeholder="Search in Drive" className="mr-2" />
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <ScrollArea className="flex-1 p-4">
          <div className="mb-4 flex space-x-2">
            <Button variant="outline" size="sm">
              <FolderPlus className="mr-2 h-4 w-4" /> New Folder
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" /> File Upload
            </Button>
          </div>

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
    </div>
  )
}