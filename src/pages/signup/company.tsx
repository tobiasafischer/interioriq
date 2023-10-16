import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button, FormLabel } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Form from '~/components/form/Form'
import Input from '~/components/form/Input'
import SignupLayout from '../../layouts/signup-layout'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import Select from '~/components/form/Select'
import { z } from 'zod'

type Form = {
	id: number
	name: string
	clients: string
	employees: string
	pricingStructure: string
	userId: number
}

const Company = () => {
	const router = useRouter()
	const { data: sessionData } = useSession()
	const mutation = api.company.createCompany.useMutation()

	const onSubmit = (val: object) => {
		const res = { ...val } as Form
		mutation.mutate({
			name: res.name,
			clients: Number.parseInt(res.clients),
			employees: Number.parseInt(res.employees),
			pricingStructure: res.pricingStructure,
			userId: Number.parseInt(sessionData?.user.id ?? ''),
		})
	}

	useEffect(() => {
		if (mutation.isSuccess) void router.push('/dashboard')
	}, [mutation.isSuccess, router])

	const schema = z.object({
		name: z.string().min(1).max(100), // Adjust min and max as needed
		employees: z.number(),
		clients: z.number(),
		pricingStructure: z.string(),
	})

	return (
		<SignupLayout>
			<Form onSubmit={onSubmit} schema={schema}>
				<div className='flex justify-between items-end'>
					<div className='flex flex-col gap-10 w-full'>
						<Input
							name='name'
							label="What is your company's name?"
							placeholder='Company Name'
							variant='flushed'
							autoFocus
							size='lg'
						/>
						<Input
							name='employees'
							label='How many designers do you have?'
							placeholder='0'
							variant='flushed'
							type='number'
							size='lg'
						/>
						<Input
							name='clients'
							label='How many projects do you have going on right now?'
							placeholder='0'
							variant='flushed'
							type='number'
							size='lg'
						/>
						<div>
							<FormLabel textColor='#5c626c'>
								What pricing structure do you use? (you can change this per project)
							</FormLabel>
							<Select name='pricingStructure' defaultValue='Hourly'>
								<option value='Hourly'>Hourly</option>
								<option value='Flat fee'>Flat fee</option>
								<option value='Price per square foot'>Price per square foot</option>
								<option value='Percentage'>Percentage</option>
								<option value='Commission'>Commission</option>
								<option value='Hybrid'>Hybrid</option>
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
