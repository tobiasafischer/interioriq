import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'

const userInput = z.object({
	user: z.object({
		id: z.string(),
		name: z.string().nullable().optional(), // Allow null or string
		emailVerified: z.string().nullable().optional(),
		email: z.string().nullable().optional(),
		image: z.string().nullable().optional(),
		company: z.string().nullable().optional(),
		clients: z.number().nullable().optional(),
		projects: z.array(z.string()).nullable().optional(),
	}),
})

// Assuming you have Prisma Client initialized as ctx.db

export const userRouter = createTRPCRouter({
	initialize: publicProcedure.input(userInput).query(async ({ ctx, input }) => {
		// Here you can create a new user using the provided data
		const updatedUser = await ctx.db.user.update({
			where: {
				id: input.user.id,
			},
			data: {
				...input.user,
				company: '', // Set to an empty string if not provided
				clients: 0, // Set to 0 if not provided
				projects: [],
			},
		})

		// Return the updated user or perform other operations
		return updatedUser
	}),
	getUser: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.db.user.findFirst({ where: { id: input } })
	}),
})
