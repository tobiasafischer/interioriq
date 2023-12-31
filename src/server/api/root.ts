import { createTRPCRouter } from '~/server/api/trpc'
import { userRouter } from './routers/user'
import { companyRouter } from './routers/company'
import { projectRouter } from './routers/project'
import { clientRouter } from './routers/client'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	company: companyRouter,
	project: projectRouter,
	client: clientRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
