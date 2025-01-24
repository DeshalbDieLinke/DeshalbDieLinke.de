
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

import { Check, ChevronsUpDown, Copy } from "lucide-react"
import { Button } from "./ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { cn } from "@/lib/utils"
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu"

const AccessLevels = [
    {
        value: 0,
        label: "Admin"
    },
    {
        value: 1,
        label: "Official Source"
    },
    {
        value: 2,
        label: "Verified User"
    },
    {
        value: 3,
        label: "User" 
    }
]

export default function NewUserDialog(props: { onSubmitToken: (email: string, accessLevel: number) => void }) {
    const [accessLevel, setAccessLevel] = React.useState(3)
    const [newToken, setNewToken] = React.useState<string | null>(null)
    const [email, setEmail] = React.useState<string | null>("null")

    const setAccessLevelFromString = (value: string): void => {
        setAccessLevel(parseInt(value))
    }

    const handleTokenRequest = () => {
        var emailInput = document.getElementById("email")
        if (emailInput == null) {
            //TODO show error
            return
        } 
        var email = (emailInput as HTMLInputElement).checkValidity() ? (emailInput as HTMLInputElement).value : null
        if (email == "" || email == null) {
            //TODO show error
            return
        }
        setEmail(email)

        fetch("http://localhost:8080/auth/new-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": window.localStorage.getItem("token") || ""
            },
            body: JSON.stringify({
                email: email,
                accessLevel: accessLevel
            })
        }).then(res => {
            if (res.ok) {
                res.json().then(json => {
                    setNewToken(json.token)
                })
            } else {
                console.error("Failed to generate token: ", res.status)
            }
        }).catch(err => {
            console.error("Failed to generate token", err)
        })

    }

    return <>
        <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New User</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                    {newToken == null && <DialogTitle>Generate Token for new User</DialogTitle>}
                    {newToken != null && <DialogTitle>Token Generated:</DialogTitle>}
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        {newToken == null && <>
                        <Input
                        required
                        id="email"
                        type="email"
                        placeholder="Email"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Access Level: {accessLevel}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Access Level</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={accessLevel.toString()} onValueChange={setAccessLevelFromString}>
                                <DropdownMenuRadioItem value="3">No Uploads.</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="2">Limited Uploads.</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="1">Official Uploads.</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="0">Admin</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </>}
                        {/* If Token is provied show it and the infromation associated */}
                        {newToken != null && 
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="token" className="sr-only">
                                Token
                                </Label>
                                <Label htmlFor="token" >
                                Token for {email}, access level {accessLevel}
                                </Label>
                                <Input
                                id="token"
                                value={newToken}
                                readOnly
                                />
                            </div>
                            <button type="submit" className="px-3 btn" onClick={() => {}}>
                                <span className="sr-only">Copy</span>
                                <Copy />
                            </button>
                        </div>
                        }   
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy />
                    </Button>
                    </div>
                    <DialogFooter className="sm:justify-start justify-between w-full flex items-center ">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                        Close
                        </Button>
                    </DialogClose>
                    {newToken == null && <button type="button" className="btn btn-primary btn-md" onClick={() => handleTokenRequest()}>
                        <p className="text-white"> Generate Token</p>
                    </button>}
                    </DialogFooter>
                </DialogContent>
                </Dialog>
    </>
}