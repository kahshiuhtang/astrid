"use client"
import React from "react"
import { Plus, Folder, MoreVertical, Users } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
interface Team{
    id: number;
    name: string;
    folders: string[];
}
export default function TeamsPage() {
  const [teams, setTeams] = React.useState<Team[]>([
    { id: 1, name: "Marketing", folders: ["Campaigns", "Assets", "Reports"] },
    { id: 2, name: "Development", folders: ["Frontend", "Backend", "DevOps"] },
    { id: 3, name: "Design", folders: ["UI Mockups", "Branding", "Illustrations"] },
  ])

  const [newTeamName, setNewTeamName] = React.useState<string>("")
  const [newFolderName, setNewFolderName] = React.useState<string>("")
  const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null)

  const handleCreateTeam = () => {
    if (newTeamName) {
      setTeams([...teams, { id: teams.length + 1, name: newTeamName, folders: [] }])
      setNewTeamName("")
    }
  }

  const handleCreateFolder = () => {
    if (newFolderName && selectedTeam) {
      setTeams(
        teams.map((team) =>
          team.id === selectedTeam.id
            ? { ...team, folders: [...team.folders, newFolderName] }
            : team
        )
      )
      setNewFolderName("")
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teams</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>Enter a name for your new team.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-name" className="text-right">
                  Team Name
                </Label>
                <Input
                  id="team-name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTeam}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-6">
        <div className="w-64">
          <h2 className="font-semibold mb-2">All Teams</h2>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2">
              {teams.map((team) => (
                <Button
                  key={team.id}
                  variant={selectedTeam?.id === team.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTeam(team)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  {team.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1">
          {selectedTeam ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedTeam.name} Team Folders</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" /> New Folder
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Folder</DialogTitle>
                      <DialogDescription>Enter a name for your new folder.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="folder-name" className="text-right">
                          Folder Name
                        </Label>
                        <Input
                          id="folder-name"
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateFolder}>Create Folder</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedTeam.folders.map((folder) => (
                    <div key={folder} className="bg-card p-4 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Folder className="mr-2 h-5 w-5" />
                          <span className="font-semibold">{folder}</span>
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
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              Select a team to view its folders
            </div>
          )}
        </div>
      </div>
    </div>
  )
}