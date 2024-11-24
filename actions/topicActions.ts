'use server'

import connectMongoDB from "@/app/libs/mongodb"
import Topic from "@/app/models/topic"
import { revalidatePath } from "next/cache"
import { convertDocToObj } from '@/app/libs/helpers'


export async function createTopic(title: string, description: string) {
    try {
        await connectMongoDB()
        const doc = await Topic.create({ title, description })
        revalidatePath('/')
        return { success: true, topic: convertDocToObj(doc) }
    } catch (error) {
      throw new Error(`토픽 생성에 실패했습니다: ${error}`)
    }
}

export async function updateTopic(
  id: string,
  title: string,
  description: string
) {
  try {
    await connectMongoDB()
    const doc = await Topic.findByIdAndUpdate(
      id,
      { title, description },
      {new: true }
    )
    if (!doc) throw new Error('토픽을 찾을 수 없습니다')
    revalidatePath('/')
    return { success: true, topic: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`토픽 수정에 실패했습니다: ${error}`)
  }
}

export async function getTopic(id: string) {
  try {
    await connectMongoDB()
    const doc = await Topic.findById(id)
    if (!doc) throw new Error('토픽을 찾을 수 없습니다')
    return { success: true, topic: convertDocToObj(doc) }
  } catch (error) {
    throw new Error(`토픽 조회에 실패했습니다: ${error}`)
  }
}

export async function getAllTopics() {
  try {
    await connectMongoDB()
    const docs = await Topic.find({}).sort({ createdAt: -1 })
    const topics = docs.map((doc) => convertDocToObj(doc))
    return { success: true, topics}
  } catch (error) {
    throw new Error(`토픽 목록 조회에 실패했습니다: ${error}`)
  }
}

export async function deleteTopic(id: string) {
  try {
    await connectMongoDB()
    const doc = await Topic.findByIdAndDelete(id)
    if (!doc) throw new Error('토픽을 찾을 수 없습니다')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    throw new Error(`토픽 삭제에 실패했습니다: ${error}`)
  }
}
