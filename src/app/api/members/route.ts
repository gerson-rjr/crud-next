import { prisma } from "@/lib/prisma";
import { memberSchema } from "@/schemas/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    try {
        const result = memberSchema.safeParse(body)
        if (result.success) {

            await prisma.member.create({
                data: result.data
            })
            return NextResponse.json({ message: 'Cadastro realizado com sucesso' }, { status: 200 })
        } else {
            console.error(result.error)
            return NextResponse.json({ error: "Não foi possível completar a solicitação." }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}

export async function GET() {

    try {
        const response = await prisma.member.findMany()
        return NextResponse.json({ response }, { status: 200 })
    }catch(error){
        return NextResponse.json({error: error}, {status: 500})
    }
}