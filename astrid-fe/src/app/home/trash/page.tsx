import React from "react"
import { Trash2, MoreVertical, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TrashPage() {
  const deletedFiles = [
    { name: "Old Document", type: "doc", size: "15 KB", deletedDate: "2023-09-30" },
    { name: "Unused Spreadsheet", type: "sheet", size: "256 KB", deletedDate: "2023-09-29" },
    { name: "Outdated Presentation", type: "slide", size: "1.2 MB", deletedDate: "2023-09-28" },
    { name: "Duplicate Image.jpg", type: "image", size: "3.5 MB", deletedDate: "2023-09-27" },
    { name: "Archived Project", type: "folder", size: "-", deletedDate: "2023-09-26" },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trash</h1>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Empty Trash
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {deletedFiles.map((file) => (
            <div key={file.name} className="bg-card p-4 rounded-lg shadow flex justify-between items-center">
              <div className="flex items-center">
                <Trash2 className="mr-2 h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-semibold">{file.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {file.type} • {file.size} • Deleted on {file.deletedDate}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Restore</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete Permanently</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}