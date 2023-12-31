import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'
import { type Client, type Project } from '@prisma/client'

const projectSchema = z.object({
	id: z.number(),
	name: z.string(),
	type: z.string().optional(),
	rooms: z.number(),
	bath: z.number(),
	squareFootage: z.number(),
	minBudget: z.number(),
	maxBudget: z.number(),
	address: z.string(),
	pricingEstimate: z.number().optional(),
	clientId: z.number(),
	userId: z.number(),
	pricingStructure: z.string(),
	supportingFiles: z.array(z.string()),
	estimatedEndDate: z.string(),
	dateAdded: z.string(),
})

const newProjectSchema = z.object({
	name: z.string(),
	type: z.string().optional(),
	rooms: z.number(),
	bath: z.number(),
	pricingStructure: z.string(),
	squareFootage: z.number(),
	minBudget: z.number(),
	maxBudget: z.number(),
	address: z.string(),
	pricingEstimate: z.number().optional(),
	clientId: z.number(),
	userId: z.number(),
	estimatedEndDate: z.string(),
})

export type ProjectType = Project & {
	client: Client | null
}

const select = {
	id: true,
	name: true,
	type: true,
	rooms: true,
	bath: true,
	squareFootage: true,
	minBudget: true,
	maxBudget: true,
	address: true,
	pricingEstimate: true,
	clientId: true,
	pricingStructure: true,
	userId: true,
	estimatedEndDate: true,
	dateAdded: true,
	client: {
		select: {
			id: true,
			name: true,
			email: true,
			personalityType: true,
			userId: true,
		},
	},
}

export const projectRouter = createTRPCRouter({
	createProject: publicProcedure
		.input(newProjectSchema)
		.mutation(async ({ ctx, input }): Promise<Project | null> => {
			// Create the project and connect it to the client
			console.log(input)
			const newProject = await ctx.db.project.create({
				data: {
					...input,
					dateAdded: `${new Date().valueOf()}`,
				},
			})
			return newProject
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
		.query(async ({ ctx, input }): Promise<ProjectType[]> => {
			const projects = await ctx.db.project.findMany({
				where: {
					userId: input,
				},
				select,
			})
			return projects
		}),
	getProject: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input }): Promise<ProjectType | null> => {
			const project = await ctx.db.project.findUnique({
				where: {
					id: input,
				},
				select,
			})
			return project
		}),
})
