import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'

// Define a schema for the User model
const userInput = z.object({
	id: z.string(),
	name: z.string().optional(),
	email: z.string().email().optional(),
	emailVerified: z.date().optional(),
	image: z.string().optional(),
	accounts: z
		.array(
			z.object({
				id: z.string(),
				userId: z.string(),
				type: z.string(),
				provider: z.string(),
				providerAccountId: z.string(),
				refresh_token: z.string().optional(),
				access_token: z.string().optional(),
				expires_at: z.number().int().optional(),
				token_type: z.string().optional(),
				scope: z.string().optional(),
				id_token: z.string().optional(),
				session_state: z.string().optional(),
			}),
		)
		.optional(),
	sessions: z
		.array(
			z.object({
				id: z.string(),
				sessionToken: z.string().min(1),
				userId: z.string(),
				expires: z.date(),
			}),
		)
		.optional(),
	projects: z.array(z.string()).optional(),
	company: z
		.object({
			id: z.string(),
			name: z.string(),
			clients: z.number().int(),
			pricingStructure: z.enum([
				'hourly',
				'flatFee',
				'ppsqft',
				'percentage',
				'commission',
				'hybrid',
				'multiple',
			]),
		})
		.optional(),
})

// Assuming you have Prisma Client initialized as ctx.db

export const userRouter = createTRPCRouter({
	initialize: publicProcedure.input(userInput).query(async ({ ctx, input }) => {
		// Here you can create a new user using the provided data
		const prismaUserData = {
			...input,
			accounts: {
				upsert: input.accounts?.map((account) => ({
					where: { id: account.id },
					update: { ...account },
					create: { ...account },
				})),
			},
			sessions: {
				upsert: input.sessions?.map((session) => ({
					where: { id: session.id },
					update: { ...session },
					create: { ...session },
				})),
			},
			projects: { set: input.projects ?? [] },
		}
		const updatedUser = await ctx.db.user.update({
			where: {
				id: input.id,
			},
			data: prismaUserData,
		})

		// Return the updated user or perform other operations
		return updatedUser
	}),
	update: publicProcedure.input(userInput).mutation(async ({ ctx, input }) => {
		// Here you can create a new user using the provided data
		const updatedUser = await ctx.db.user.update({
			where: {
				id: input.id,
			},
			data: input,
		})

		// Return the updated user or perform other operations
		return updatedUser
	}),
	getUser: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.db.user.findFirst({ where: { id: input } })
	}),
})
