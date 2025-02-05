// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuRadioGroup,
//     DropdownMenuRadioItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
// import type { User } from "@/types/User";
// import React from "react";
// import { Button } from "../ui/button";
// import { MoreHorizontal } from "lucide-react";
// import { DDL } from "@/lib/DDL";
// import { Input } from "../ui/input";
// import { Label } from "recharts";

// export default function EditUserDialog(props: { user: User }) {
//     const userData = props.user
//     // TODO get this from session inseat. 
//     const [currentUser, setCurrentUser] = React.useState<User | null>(null)
//     const [accessLevel, setAccessLevel] = React.useState(userData.AccessLevel as 0 | 1 | 2 | 3)
//     const [email, setEmail] = React.useState<string | null>(userData.Email ?? null)
//     const [username, setUsername] = React.useState<string | null>(userData.Username ?? "")
//     const [password, setPassword] = React.useState<string | null>(null)
//     const [isAdmin, setIsAdmin] = React.useState<boolean>(false)

//     React.useEffect(() => {
//         DDL.GetAuthStatus((user) => {
//             setCurrentUser(user)
//             setIsAdmin(user.AccessLevel == 0)
//             setEmail(user.Email ? user.Email : "")
//             setUsername(user.Username ?? "")
//             setCurrentUser(user)
//             console.log("User: ", user.AccessLevel)
//             setAccessLevel(user.AccessLevel as 0 | 1 | 2 | 3)
//         })

//     }, [])

//     return <>
//     <Dialog>
//         <DialogTrigger asChild className="w-full btn">
//                 <p className="text-black">Edit Profile</p>
//         </DialogTrigger>
//                 <DialogContent className="sm:max-w-md bg-white">
//                         <DialogHeader>
//                             <DialogTitle>Edit User Profile</DialogTitle>
//                         </DialogHeader>
//                             <div className="flex items-center space-x-2 ">
//                             <form  id="editprofile" className="grid flex-1 gap-2">
//                                 <Input
//                                 defaultValue={currentUser?.Email}
//                                 required
//                                 id="email"
//                                 type="email"
//                                 placeholder="Email"
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 />
//                                 <Input
//                                 defaultValue={userData.Username}
//                                 required
//                                 id="username"
//                                 type="name"
//                                 placeholder="Username"
//                                 autoComplete="username nickname organization"
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 />
//                                 <Label>Enter Password to confirm identity</Label>
//                                 <Input
//                                 required
//                                 id="password"
//                                 type="password"
//                                 placeholder="Password"
//                                 autoComplete="current-password"
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 />
//                         </form>
//                         </div>
//                         <DialogFooter className="sm:justify-start justify-between w-full flex items-center ">
//                             <DialogClose asChild>
//                                 <Button type="button"  variant="secondary">
//                                 Close
//                                 </Button>
//                             </DialogClose>
//                             <Button form="editprofile" type="submit" className="btn btn-primary btn-md" onClick={(event) => {
//                                     event.preventDefault()
//                                     console.log("Updating User with access level: ", accessLevel)
//                                     console.log("Original User ", userData.AccessLevel)
//                                     const UpdateRequest: DDL.UserUpdateRequest = {
//                                         id: userData.ID,
//                                         email: email || userData.Email,
//                                         username: username || userData.Username,
//                                         password: password || "",
//                                         accessLevel: accessLevel
//                                     }

//                                     if (UpdateRequest.password) {
//                                         DDL.UpdateUser(UpdateRequest, () => {
                                            
//                                             // Close the dialog
//                                             console.log("User Updated")
    
//                                         })
//                                     } else {{
//                                         console.log("Password is required") 

//                                     }
                                    
                                    
//                                 }}}>
//                                     <p className="text-white translate-y-2"> Update User </p> </Button>
//                             <DialogClose asChild id="close">

//                             </DialogClose>
//                         </DialogFooter>
//                     </DialogContent>
//     </Dialog>
// </> 
// }