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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";
import EditUserDialog from "../EditUserDialog";
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
            const user = row.original
            const [isOpen, setIsOpen] = React.useState(false)
            return (
                <>
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
                        <DropdownMenuItem
                            onClick={() => location.href = `/profile?id=${user.ID}`}
                        > Visit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setIsOpen(true)}
                        > Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="bg-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {isOpen && <EditUserDialog />}
                </>
            )}},
]
