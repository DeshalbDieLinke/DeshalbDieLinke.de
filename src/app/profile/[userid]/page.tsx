/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Profile from "@/components/Profile/Profile";


async function ProfilePage({ params }: { params: { userid: string } }) {

	const { userid } = params;
	console.log("ProfilePage id", userid);
	return ( 

		<div className="flex flex-col items-center justify-center">
				<Profile id={userid} />
		</div>
		// <Profile />
	 );
}

export default ProfilePage;
			

