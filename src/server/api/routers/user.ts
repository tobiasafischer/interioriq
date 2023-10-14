import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'
import { type User } from '@prisma/client'

export const userSchema = z.object({
	id: z.number(),
	name: z.string().nullable().optional(),
	email: z.string().nullable().optional(),
	emailVerified: z.date().nullable().optional(),
	image: z.string().nullable().optional(),
	companyId: z.number().nullable().optional(),
	projects: z.array(z.string()).optional(),
})

export const userRouter = createTRPCRouter({
	updateUser: publicProcedure.input(userSchema).mutation(async ({ ctx, input }): Promise<User> => {
		const updatedUser = await ctx.db.user.update({
			where: {
				id: input.id,
			},
			data: input,
		})
		return updatedUser
	}),
	getUser: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input }): Promise<User | null> => {
			const user = await ctx.db.user.findUnique({ where: { id: input } })
			return user
		}),
})
