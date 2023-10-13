import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import React from 'react'
import Form from '~/components/form/Form'
import Input from '~/components/form/Input'
import SignupLayout from '../../layouts/signup-layout'
import { useRouter } from 'next/router'

const Clients = () => {
	const router = useRouter()
	const onSubmit = (val: object) => {
		console.log(val)
	}

	return (
		<SignupLayout>
			<Form onSubmit={(val: object) => void onSubmit(val)}>
				<div className='flex justify-between items-end'>
					<div>
						<Input
							type='number'
							name='clients'
							label='How many clients do you currently have?'
							placeholder='0'
							variant='flushed'
							autoFocus
							isRequired
							size='lg'
						/>
					</div>
					<Button variant='ghost' type='submit'>
						<ChevronRightIcon color='#f3583f' />
					</Button>
				</div>
			</Form>
		</SignupLayout>
	)
}

export default Clients
