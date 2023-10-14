import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'
import { type Company } from '@prisma/client'

const companySchema = z.object({
	id: z.number(),
	name: z.string(),
	clients: z.number(),
	employees: z.number(),
	pricingStructure: z.string(),
	userId: z.number(),
})

const newCompanySchema = z.object({
	name: z.string(),
	clients: z.number(),
	employees: z.number(),
	pricingStructure: z.string(),
	userId: z.number(),
})

export const companyRouter = createTRPCRouter({
	createCompany: publicProcedure
		.input(newCompanySchema)
		.mutation(async ({ ctx, input }): Promise<Company> => {
			const updatedCompany = await ctx.db.company.create({
				data: input,
			})
			await ctx.db.user.update({
				where: {
					id: input.userId,
				},
				data: { companyId: updatedCompany.id },
			})
			return updatedCompany
		}),
	updateCompany: publicProcedure
		.input(companySchema)
		.mutation(async ({ ctx, input }): Promise<Company> => {
			const updatedCompany = await ctx.db.company.update({
				where: {
					id: input.id,
				},
				data: input,
			})

			return updatedCompany
		}),
})
