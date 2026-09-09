import { MembershipMaritalStatus, MembershipOrigin } from "@/generated/prisma/enums"
import { z } from "zod"

export const memberSchema = z.object({
    name: z.string().min(8),
    birthday: z.coerce.date(),
    cpf: z.string().min(11),
    membershipMaritalStatus: z.enum(MembershipMaritalStatus),
    membershipOrigin: z.enum(MembershipOrigin),
    phoneNumber: z.string().min(11),
    conversionDate: z.coerce.date().optional(),
})

export const memberSchemaUpdate = memberSchema.partial()