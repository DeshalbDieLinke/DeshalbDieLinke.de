
export default function AdminPanel() {
    token = ""
    var token = window.localStorage.getItem("token")


    var users = fetch("http://localhost:8080/auth/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":  token || ""
    }}).then(
        res => res.json().then(json=> {
            if (res.status === 401) {
                window.alert("Du bist nicht eingeloggt")
                // redirect to login
                window.location.href = "/login"
            }
        }
        )
    ).catch(err => {
        console.error(err)
    })
    

    return <>
        <ol>

        </ol>
    </>
}