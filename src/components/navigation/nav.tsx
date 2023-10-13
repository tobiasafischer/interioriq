import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

import { Avatar, IconButton, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { AtSignIcon, CalendarIcon, MoonIcon, SettingsIcon, SunIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Nav = () => {
	const { data: sessionData } = useSession()
	const router = useRouter()
	return (
		<>
			{router.pathname !== '/signup' && (
				<div className='flex justify-between'>
					{sessionData && (
						<Link className='flex absolute top-5 left-5' href={'/'}>
							<h2 style={{ color: '#f3583f', fontWeight: 800, fontSize: 26 }}>InteriorIQ</h2>
						</Link>
					)}
					<div className='flex absolute top-10 right-10 justify-evenly gap-4 align-middle'>
						{sessionData && <h2 className='my-1'>{sessionData.user.name}</h2>}
						<Menu>
							<MenuButton
								as={IconButton}
								aria-label='Options'
								icon={
									<Avatar
										className='rounded-full'
										src='https://bit.ly/broken-link'
										icon={
											sessionData?.user.image ? (
												<Image
													className='rounded-full'
													src={sessionData?.user.image ?? undefined}
													alt='avatar'
												/>
											) : undefined
										}
									/>
								}
								variant='outline'
							/>
							<MenuList>
								<MenuItem icon={<AtSignIcon />}>
									<Link href='/profile'>
										<h2 className='my-1'>Profile</h2>
									</Link>
								</MenuItem>
								<MenuItem icon={<SettingsIcon />}>
									<Link href='/settings'>
										<h2 className='my-1'>Settings</h2>
									</Link>
								</MenuItem>
								<MenuItem icon={<CalendarIcon />}>
									<Link href='/projects'>
										<h2 className='my-1'>Projects</h2>
									</Link>
								</MenuItem>
								<MenuItem
									icon={sessionData ? <MoonIcon /> : <SunIcon />}
									onClick={sessionData ? () => void signOut() : () => void signIn()}>
									{sessionData ? 'Sign out' : 'Sign in'}
								</MenuItem>
							</MenuList>
						</Menu>
					</div>
				</div>
			)}
		</>
	)
}

export default Nav
