import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'
import { type Client } from '@prisma/client'

export const clientSchema = z.object({
	id: z.number(),
	name: z.string().optional(),
	email: z
		.string()
		.optional()
		.refine((value) => !value || /\S+@\S+\.\S+/.test(value), {
			message: 'Invalid email format',
		}),
	personalityType: z.string(),
})

export const projectRouter = createTRPCRouter({
	getClient: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input }): Promise<Client | null> => {
			const client = await ctx.db.client.findUnique({
				where: {
					id: input,
				},
			})
			return client
		}),
})
