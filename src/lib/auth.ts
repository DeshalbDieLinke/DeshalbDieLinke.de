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