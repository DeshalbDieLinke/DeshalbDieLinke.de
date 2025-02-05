import { SignIn } from "@clerk/nextjs";


function Login () {
	return (  <main className="bg-gray-100 flex justify-center items-center p-20">
		<SignIn />
	</main>);
}

export default Login;