import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'
import { type Project } from '@prisma/client'

const projectSchema = z.object({
	id: z.number(),
	name: z.string(),
	type: z.string().optional(),
	rooms: z.number(),
	bath: z.number(),
	squareFootage: z.number(),
	minBudget: z.number(),
	maxBudget: z.number(),
	location: z.string(),
	pricingEstimate: z.number(),
	clientId: z.number().optional(),
	userId: z.number(),
	supportingFiles: z.array(z.string()),
	estimatedEndDate: z.date().optional().nullable(),
	dateAdded: z.date(),
})

const newProjectSchema = z.object({
	name: z.string(),
	type: z.string().optional(),
	rooms: z.number(),
	bath: z.number(),
	squareFootage: z.number(),
	minBudget: z.number(),
	maxBudget: z.number(),
	location: z.string(),
	pricingEstimate: z.number(),
	clientId: z.number().optional(),
	userId: z.number(),
	supportingFiles: z.array(z.string()),
	estimatedEndDate: z.date().optional().nullable(),
})

export const projectRouter = createTRPCRouter({
	createProject: publicProcedure
		.input(newProjectSchema)
		.mutation(async ({ ctx, input }): Promise<Project> => {
			const updatedProject = await ctx.db.project.create({
				data: { ...input, dateAdded: new Date() },
			})

			return updatedProject
		}),
	updateProject: publicProcedure
		.input(projectSchema)
		.mutation(async ({ ctx, input }): Promise<Project> => {
			const updatedProject = await ctx.db.project.update({
				where: {
					id: input.id,
				},
				data: input,
			})
			return updatedProject
		}),
	getProjects: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input }): Promise<Project[]> => {
			const projects = await ctx.db.project.findMany({
				where: {
					userId: input,
				},
			})
			return projects
		}),
	getProject: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input }): Promise<Project | null> => {
			const project = await ctx.db.project.findUnique({
				where: {
					id: input,
				},
			})
			return project
		}),
})
