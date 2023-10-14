import styles from './index.module.css'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '@chakra-ui/react'
import { api } from '~/utils/api'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
	const { data: sessionData } = useSession()
	const router = useRouter()
	const user = api.user.getUser.useQuery(Number.parseInt(sessionData?.user.id ?? '0'), {
		enabled: !!sessionData,
	})

	useEffect(() => {
		if (!user.data?.companyId && user.isSuccess) void router.push('/signup/company')
	}, [user, router])

	return (
		<div className={styles.container}>
			{!sessionData && (
				<>
					<h1 className={styles.title}>InteriorIQ</h1>
					<Button
						onClick={() => void signIn()}
						style={{ borderColor: '#f3583f', color: '#f3583f' }}
						variant='outline'>
						Login
					</Button>
				</>
			)}
			{sessionData && (
				<Button
					onClick={() => void router.push('/dashboard')}
					style={{ borderColor: '#f3583f', color: '#f3583f' }}
					variant='outline'>
					Dashboard
				</Button>
			)}
		</div>
	)
}
