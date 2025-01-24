import type { User } from "@/types/User"


export default function UserListItem(props: { user: User }) {
    const user = props.user

    return <li key={user.ID}>
        <div className="flex flex-row [&>*]:border-b-2 *:border [&>*]:p-2 h-10">
            <p className="text-sm h-full">{user.Email}</p>
            <p className="text-sm h-full">{user.AccessLevel}</p>
            <p className="text-sm h-full">{user.Username || "No Username"}</p>
            <button className="bg-red-500 text-white rounded-md p-2 text-xs w-15 h-full">Delete</button>

        </div>
    </li>
}
