import { auth, clerkClient, User } from "@clerk/nextjs/server";

type Role = keyof typeof ROLES 
type Permission = (typeof ROLES)[Role][number]


const ROLES = {
    admin: [
        "upload:official",
        "upload:permission",
    ],
    official_user: [
        "upload:official",
        "upload:permission",
    ],
    user: [
        "upload:permission",
    ]
} as const


export function hasPermission(
    user: { id: string; role: Role },
    permission: Permission
) {
    return (ROLES[user.role] as readonly Permission[]).includes(permission)
}

export async function getUserDDL() {
    const {userId, } = await auth()

    if (!userId) {
        return null
    }
    
    const client = await clerkClient()

    const user = await client.users.getUser(userId)

    return user
    
}

export async function isAdmin(user? : User) {
    let usr = user
    if (!usr) {
     // Chech if it is permitted to delete
    const {userId, } = await auth()

    if (!userId) {
        return false
    }
    
    const client = await clerkClient()

    usr = await client.users.getUser(userId) 
    }

    if (usr.privateMetadata["role"] == "admin") {
        return true
    }
}