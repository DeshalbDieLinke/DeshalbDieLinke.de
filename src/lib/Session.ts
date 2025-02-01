import type { ContentItem } from "@/types/ContentItem"
import type { User } from "@/types/User"
import type { string } from "astro:schema"
import { API_DOMAIN } from "config"



/**
 * Utilities for managing the current session.
 * The Session stores the current user's information.
 * It can store the user's ID, email, access level, username, and token.
 * Cookies should be opted in to store the Session.
 */
export namespace Session {
    export function SetUser(user: User) {
        // localStorage.setItem("user", JSON.stringify(user))
    }

    export function GetUser(): User {
        // return JSON.parse(localStorage.getItem("user") || "{}")
        return {
            ID: 1,
            Email: "",
            AccessLevel: 3,
            Username: ""}
    }

    export function ClearUser() {
        // localStorage.removeItem("user")
    }

    export function GetEmail(): string {
        return Session.GetUser().Email
    }

    export function GetAccessLevel(): number {
        return Session.GetUser().AccessLevel || 3
    }

    export function GetID(): number {
        return Session.GetUser().ID
    }
}
