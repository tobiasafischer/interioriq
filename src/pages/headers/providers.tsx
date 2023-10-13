import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import type { Session } from 'next-auth'

export function Providers({
	session,
	children,
}: {
	session: Session | null
	children: React.ReactNode
}) {
	return (
		<CacheProvider>
			<SessionProvider session={session}>
				<ChakraProvider>{children}</ChakraProvider>
			</SessionProvider>
		</CacheProvider>
	)
}
