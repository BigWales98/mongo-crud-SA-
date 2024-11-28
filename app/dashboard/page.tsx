import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function Dashboard() {
    const session = await auth()
    //if (!session) return <div className="text-2xl">Not authenticated...</div>
    //console.log(session)
    if(!session) {
        redirect('/login')
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard 대시보드</h1>
            <pre className="mt-4">{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}