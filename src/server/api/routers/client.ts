import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'
import { type Client } from '@prisma/client'

export const clientSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().refine((value) => !value || /\S+@\S+\.\S+/.test(value), {
		message: 'Invalid email format',
	}),
	personalityType: z.string().optional(),
	userId: z.number(),
})

export const newClientSchema = z.object({
	name: z.string(),
	email: z.string().refine((value) => !value || /\S+@\S+\.\S+/.test(value), {
		message: 'Invalid email format',
	}),
	personalityType: z.string().optional(),
	userId: z.number(),
})

export const clientRouter = createTRPCRouter({
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
	getClients: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input }): Promise<Client[] | null> => {
			const client = await ctx.db.client.findMany({
				where: {
					userId: input,
				},
			})
			return client
		}),
	createClient: publicProcedure
		.input(newClientSchema)
		.mutation(async ({ ctx, input }): Promise<Client> => {
			const newClient = await ctx.db.client.create({
				data: input,
			})
			return newClient
		}),
})
