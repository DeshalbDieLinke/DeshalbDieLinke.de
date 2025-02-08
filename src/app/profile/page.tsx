/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Profile from "@/components/Profile/Profile";


async function ProfilePage() {
	return ( 

		<div className="flex flex-col items-center justify-center">
					<SignedIn>
						<Profile />
					</SignedIn>
					<SignedOut >
						<p>Bitte logge dich ein, um dein Profil zu sehen. Das Profil anderer zu sehen ist NOCH nicht implementiert.</p>
						<SignInButton />
					</SignedOut>
		</div>
		// <Profile />
	 );
}

export default ProfilePage;
			

