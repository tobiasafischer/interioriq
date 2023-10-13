import { type Session } from 'next-auth'

import { type AppType } from 'next/app'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import { Providers } from './headers/providers'
import { Header } from './headers/header'
import Layout from '~/components/navigation/layout'

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<Providers session={session}>
			<Header />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Providers>
	)
}

export default api.withTRPC(MyApp)
