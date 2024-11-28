import connectMongoDB from "@/app/libs/mongodb";
import Log from "@/app/models/log";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    try {
        const {email} = await request.json()
        await connectMongoDB()
        await Log.create({email})
        return NextResponse.json({message: 'Login event logged'},
            {status: 201})
    } catch (error) {
        console.error('Error logging login event', error)
    } 
}