import AdminPanel from "@/components/Admin/AdminPanel";
import { isAdmin } from "@/lib/auth";

async function adminPage() {
	const isAdm = await isAdmin();

	return (
		<main className="w-full h-full text-center p-10 font-bold text-2xl">
				{isAdm ?
			<AdminPanel /> : "You are not an admin."}
			
	</main> );
}

export default adminPage;
