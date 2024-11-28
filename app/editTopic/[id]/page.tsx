import { getTopic } from "@/actions/topicActions"
import { auth } from "@/auth"
import EditTopicForm from "@/components/EditTopicForm"
import { redirect } from "next/navigation"


export default async function EditTopic({params,}: {params: { id: string}
}) {
  const { topic } = await getTopic(params.id)
  const session = await auth()
  if(!session) {
    redirect('/login')
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">토픽 수정</h1>
      <EditTopicForm 
       id={topic._id}
       title={topic.title}
       description={topic.description}
       
       />
    </div>
  )
}