import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'
import Form from '~/components/form/Form'
import Input from '~/components/form/Input'
import SignupLayout from '../../layouts/signup-layout'
import { useRouter } from 'next/router'
import { PricingStructure } from '~/types/types'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'

const Company = () => {
	const router = useRouter()
	const onSubmit = async (val: object) => {
		console.log(val)
		await router.push('/signup/clients')
	}
	const { data: sessionData } = useSession()
	const update = api.user.update.useMutation()

	return (
		<SignupLayout>
			<Form onSubmit={(val: object) => void onSubmit(val)}>
				<div className='flex justify-between items-end'>
					<div className='flex flex-col gap-10 w-full'>
						<Input
							name='company-name'
							label="What is your company's name?"
							placeholder='Company Name'
							variant='flushed'
							autoFocus
							isRequired
							size='lg'
						/>
						<Input
							name='employees'
							label='How many designers do you have?'
							placeholder='0'
							variant='flushed'
							type='number'
							isRequired
							size='lg'
						/>
						<div>
							<FormLabel textColor='#5c626c'>
								What pricing structure do you use? (you can change this per project)
							</FormLabel>
							<Select>
								{Object.values(PricingStructure).map((priceType) => (
									<option key={priceType} value={priceType}>
										{priceType}
									</option>
								))}
								<option value='multiple'>Multiple</option>
							</Select>
						</div>
					</div>
					<Button variant='ghost' type='submit'>
						<ChevronRightIcon fontSize={20} color='#f3583f' />
					</Button>
				</div>
			</Form>
		</SignupLayout>
	)
}

export default Company
