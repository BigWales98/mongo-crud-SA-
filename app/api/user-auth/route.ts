import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const {user} = await req.json()
    const {name, email} = user

    try {
        await connectMongoDB()
        const userExists = await User.findOne({email})

        if (!userExists) {
            await User.create({name, email})
        }

        const apiUrl = process.env.API_URL
        await fetch(`${apiUrl}/api/log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
        return NextResponse.json({success: true})
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {success: false, error: 'Internal Server Error'},
            {status: 500}
        )
    }
}