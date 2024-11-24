'use client'

import { createTopic } from "@/actions/topicActions"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function AddTopicForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createTopic(title, description)
            router.push('/')
        } catch (error) {
            console.error('토픽 생성 중 오류:', error)
            alert('토픽 생성 중 오류가 발생했습니다.')
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="border border-slate-500 p-4"
              type="text"
              placeholder="Topic Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <textarea
              className="border border-slate-500 p-4 h-32"
              placeholder="Topic description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
            <button
              className="bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-md"
              type="submit"
            >
              Add Topic
            </button>
        </form>
    )
}