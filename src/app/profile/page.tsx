/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { SignedIn, SignedOut, useAuth, UserProfile } from "@clerk/nextjs";
// import Profile from "@/components/Profile/Profile";
import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../../config";
import Profile from "@/components/Profile/Profile";


function ProfilePage() {
	const [user, setUser] = useState<object | null>(null)

	const { getToken } = useAuth();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async function fetchData() {
			// API call to get user data
			const response = await fetch( API_DOMAIN + "/profile", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${await getToken()}`,
					credentials: "include",
				},
			});
			if (response.status === 200) {
				const data = await response.json();
				setUser(data);
			}
		}
		// fetchData();
	}, [])

	return ( 

		<div className="flex flex-col items-center justify-center">
					<SignedIn>
						<Profile />
					</SignedIn>
					<SignedOut >
						<p>Bitte logge dich ein, um dein Profil zu sehen. Das Profil anderer zu sehen ist NOCH nicht implementiert.</p>
					</SignedOut>
		</div>
		// <Profile />
	 );
}

export default ProfilePage;
			

