import React from 'react'
import styles from '../pages/index.module.css'

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex h-full flex-col justify-start py-60'>
			<div className='flex flex-col justify-start items-center mb-20'>
				<h1 className={styles.title}>Welcome to InteriorIQ!</h1>
				<h1 className={styles.subtitle}>Let&apos;s get to know eachother!</h1>
				<div className='w-full mt-20'>{children}</div>
			</div>
		</div>
	)
}

export default SignupLayout
