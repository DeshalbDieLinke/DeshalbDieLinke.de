/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import type {User} from "@/types/User.tsx";
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { DDL } from "@/lib/DDL";
import { Label } from "../ui/label";
export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "ID",
        header: "User ID",
    },
    {
        accessorKey: "Email",
        header: "Email",
    },
    {
        accessorKey: "AccessLevel",
        header: "Access Level",
    },
    {
        accessorKey: "Username",
        header: "Username",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [currentUser, setCurrentUser] = React.useState<User | null>(null)
            const [accessLevel, setAccessLevel] = React.useState(row.original.AccessLevel as 0 | 1 | 2 | 3)
            const [email, setEmail] = React.useState<string | null>("null")
            const [username, setUsername] = React.useState<string | null>("null")
            const [password, setPassword] = React.useState<string | null>("null")
            const [isAdmin, setIsAdmin] = React.useState<boolean>(false)
            
            const setAccessLevelFromString = (value: string): void => {
                    setAccessLevel(parseInt(value) as 0 | 1 | 2 | 3)
            }
            React.useEffect(() => {
                console.log("User: ", row.original)
                setEmail(row.original.Email || "")
                setUsername(row.original.Username || "")
                setCurrentUser(row.original)
                setAccessLevel(row.original.AccessLevel as 0 | 1 | 2 | 3)
            }, [])
            const user = row.original
            return (
                <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-gray-400 rounded-sm w-full p-2"
                            onClick={() => location.href = `/profile?id=${user.ID}`}>
                            Visit Profile

                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="hover:bg-gray-400 rounded-sm w-full p-2"
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        > 
                            <DialogTrigger asChild className="w-full">
                                    <p className="">Edit User</p>
                            </DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="bg-red-600 hover:bg-red-300 rounded-sm w-full p-2" 
                        onClick={() => {
                            DDL.DeleteUser(user.ID, () => {
                                console.log("User Deleted")
                            })
                        }}>
                        Delete User

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                        <DialogContent className="sm:max-w-md bg-white">
                                <DialogHeader>
                                    <DialogTitle>Edit User Profile</DialogTitle>
                                </DialogHeader>
                                    <div className="flex items-center space-x-2">
                                    <div className="grid flex-1 gap-2">
                                        <Input
                                        defaultValue={user.Email}
                                        required
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <Input
                                        defaultValue={user.Username}
                                        required
                                        id="username"
                                        type="name"
                                        placeholder="Username"
                                        autoComplete="username nickname organization"
                                        onChange={(e) => setUsername(e.target.value)}
                                        />
                                        
                                {isAdmin && <DropdownMenu>
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
                                </DropdownMenu>}
                                <Label>Enter Password to confirm identity</Label>
                                        <Input
                                        required
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                </div>
                                </div>
                                <DialogFooter className="sm:justify-start justify-between w-full flex items-center ">
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                        Close
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild 
                                    type="button" className="btn btn-primary btn-md" onClick={() => {
                                            const UpdateRequest: DDL.UserUpdateRequest = {
                                                id: user.ID,
                                                email: email || user.Email,
                                                username: username || user.Username,
                                                password: password || "",
                                                accessLevel: accessLevel
                                            }
                                            DDL.UpdateUser(UpdateRequest, () => {
                                                // Close the dialog
                                                console.log("User Updated")

                                            })
                                        }}>
                                            <p className="text-white translate-y-2"> Update User </p>
                                        </DialogClose>
                                </DialogFooter>
                            </DialogContent>
            </Dialog>

                </>
            )}},
]
