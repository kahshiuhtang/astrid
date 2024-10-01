import React from "react"
import { Laptop, Smartphone, Tablet, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DevicesPage() {
  const connectedDevices = [
    { name: "Work Laptop", type: "laptop", lastSync: "2023-09-30 14:30", storage: "120 GB / 500 GB" },
    { name: "Personal Phone", type: "smartphone", lastSync: "2023-09-30 15:45", storage: "32 GB / 128 GB" },
    { name: "Home Desktop", type: "laptop", lastSync: "2023-09-29 20:15", storage: "750 GB / 2 TB" },
    { name: "Tablet", type: "tablet", lastSync: "2023-09-28 10:00", storage: "45 GB / 64 GB" },
  ]

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "laptop":
        return <Laptop className="mr-2 h-5 w-5" />
      case "smartphone":
        return <Smartphone className="mr-2 h-5 w-5" />
      case "tablet":
        return <Tablet className="mr-2 h-5 w-5" />
      default:
        return <Laptop className="mr-2 h-5 w-5" />
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Connected Devices</h1>
        <Button variant="outline">Add New Device</Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {connectedDevices.map((device) => (
            <div key={device.name} className="bg-card p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {getDeviceIcon(device.type)}
                  <div>
                    <div className="font-semibold">{device.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Last synced: {device.lastSync}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Storage: {device.storage}
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
                    <DropdownMenuItem>Sync Now</DropdownMenuItem>
                    <DropdownMenuItem>View Files</DropdownMenuItem>
                    <DropdownMenuItem>Device Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Remove Device</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}