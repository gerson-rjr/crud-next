import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { memberSchemaUpdate } from "@/schemas/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const response = await prisma.member.findUnique({
            where: {
                id,
            }
        })
        if (response === null) {
            return NextResponse.json({ error: "Nenhum membro encontrado." }, { status: 404 })
        }
        return NextResponse.json({ response }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Não foi possível retornar o membro." }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const body = await req.json()
    const { id } = await params
    try {
        const result = memberSchemaUpdate.safeParse(body)
        if (result.success) {
            const response = await prisma.member.update({
                where: {
                    id
                },
                data: result.data,
            })
            return NextResponse.json({ response }, { status: 200 })
        } else {
            return NextResponse.json({ error: "Erro na requisição" }, { status: 400 })
        }
    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            console.error(error)
            return NextResponse.json({ error: "Registro não encontrado." }, { status: 404 })
        } else {
            console.error(error)
            return NextResponse.json({ error: "Não foi possível retornar o membro." }, { status: 500 })
        }
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const response = await prisma.member.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: "Membro excluído com sucesso." }, { status: 200 })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            console.error(error)
            return NextResponse.json({ message: "Membro não encontrado." }, { status: 404 })
        }else{
            console.error(error)
            return NextResponse.json({ message: "Não foi possível excluir o membro." }, { status: 500 })
        }
    }
}