"use client"
import React, { ChangeEvent, ChangeEventHandler } from "react"
import { Plus, FolderPlus, Upload, MoreVertical, Grid, List, Share, Move, FileText, Info, File, Image, FileSpreadsheet, PresentationIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface AstridFile{
    id: number;
    name: string;
    type: string;
    size: string;
    modified: string;
}
interface AstridFileMetadata {
    name: string;
    description: string;
    tags: string;
    createdAt: string;
    modifiedAt: string;
    size: string;
    type: string;
}
export default function DrivePage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedFile, setSelectedFile] = React.useState<AstridFile | null>(null);
  const [metadata, setMetadata] = React.useState<AstridFileMetadata>({
    name: "",
    description: "",
    tags: "",
    createdAt: "",
    modifiedAt: "",
    size: "",
    type: "",
  })
  const [isOpenModalOpen, setIsOpenModalOpen] = React.useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = React.useState(false);
  const [isMetadataModalOpen, setIsMetadataModalOpen] = React.useState(false);

  const files: AstridFile[] = [
    { id: 1, name: "Document 1", type: "doc", size: "15 KB", modified: "2023-09-30" },
    { id: 2, name: "Spreadsheet", type: "sheet", size: "256 KB", modified: "2023-09-29" },
    { id: 3, name: "Presentation", type: "slide", size: "1.2 MB", modified: "2023-09-28" },
    { id: 4, name: "Image.jpg", type: "image", size: "3.5 MB", modified: "2023-09-27" },
    { id: 5, name: "Project Folder", type: "folder", size: "-", modified: "2023-09-26" },
  ]

  const handleFileSelect = (file: AstridFile) => {
    setSelectedFile(file)
    setMetadata({
      name: file.name,
      description: "A sample description for " + file.name,
      tags: "tag1, tag2",
      createdAt: "2023-09-25",
      modifiedAt: file.modified,
      size: file.size,
      type: file.type,
    })
  }

  const handleMetadataInputChange = (e: ChangeEvent<HTMLInputElement> | undefined) => {
    if (!e) return;
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  };
  const handleMetadataTextareaChange = (e: ChangeEvent<HTMLTextAreaElement> | undefined) => {
    if (!e) return;
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  };

  const handleMetadataSave = () => {
    // In a real application, you would save the metadata to the backend here
    console.log("Saving metadata:", metadata)
    setIsMetadataModalOpen(false)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "doc":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "sheet":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      case "slide":
        return <PresentationIcon className="h-8 w-8 text-yellow-500" />
      case "image":
        return <Image className="h-8 w-8 text-purple-500" />
      case "folder":
        return <FolderPlus className="h-8 w-8 text-orange-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const renderFileItem = (file: AstridFile, isGridView: boolean) => (
    <div
      key={file.id}
      className={`bg-card rounded-lg shadow cursor-pointer transition-all duration-200 hover:shadow-md ${
        isGridView ? 'p-4' : 'p-3 flex items-center'
      }`}
      onClick={() => handleFileSelect(file)}
    >
      <div className={`flex items-center ${isGridView ? 'flex-col' : 'flex-row'} w-full`}>
        <div className={`${isGridView ? 'mb-3' : 'mr-4'}`}>
          {getFileIcon(file.type)}
        </div>
        <div className={`${isGridView ? 'text-center' : 'flex-grow'}`}>
          <div className="font-semibold text-sm mb-1">{file.name}</div>
          <div className="text-xs text-muted-foreground">
            {file.type !== 'folder' && `${file.size} • `}Modified {file.modified}
          </div>
        </div>
        <div className={`${isGridView ? 'mt-2' : 'ml-4'}`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setIsOpenModalOpen(true)}>
                <FileText className="mr-2 h-4 w-4" />
                Open
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsShareModalOpen(true)}>
                <Share className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsMoveModalOpen(true)}>
                <Move className="mr-2 h-4 w-4" />
                Move
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsMetadataModalOpen(true)}>
                <Info className="mr-2 h-4 w-4" />
                File Metadata
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Drive</h1>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
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
            {files.map((file) => renderFileItem(file, true))}
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => renderFileItem(file, false))}
          </div>
        )}
      </ScrollArea>

      {/* Open Modal */}
      <Dialog open={isOpenModalOpen} onOpenChange={setIsOpenModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Open File</DialogTitle>
            <DialogDescription>
              {selectedFile && `Opening ${selectedFile.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>File content would be displayed here.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpenModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              {selectedFile && `Share ${selectedFile.name} with others`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="share-email">Email</Label>
              <Input id="share-email" placeholder="Enter email address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="share-permission">Permission</Label>
              <Select>
                <SelectTrigger id="share-permission">
                  <SelectValue placeholder="Select permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Can view</SelectItem>
                  <SelectItem value="edit">Can edit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsShareModalOpen(false)}>Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move Modal */}
      <Dialog open={isMoveModalOpen} onOpenChange={setIsMoveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move File</DialogTitle>
            <DialogDescription>
              {selectedFile && `Move ${selectedFile.name} to another folder`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="move-destination">Destination Folder</Label>
              <Select>
                <SelectTrigger id="move-destination">
                  <SelectValue placeholder="Select destination folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="images">Images</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsMoveModalOpen(false)}>Move</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Metadata Modal */}
      <Dialog open={isMetadataModalOpen} onOpenChange={setIsMetadataModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File Metadata</DialogTitle>
            <DialogDescription>View and edit file metadata</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">File Name</Label>
              <Input
                id="name"
                name="name"
                value={metadata.name}
                onChange={handleMetadataInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={metadata.description}
                onChange={handleMetadataTextareaChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={metadata.tags}
                onChange={handleMetadataInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Created At</Label>
              <Input value={metadata.createdAt} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Modified At</Label>
              <Input value={metadata.modifiedAt} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Size</Label>
              <Input value={metadata.size} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Input value={metadata.type} readOnly />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMetadataModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMetadataSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}