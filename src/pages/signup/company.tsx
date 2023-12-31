import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button, FormLabel } from '@chakra-ui/react'
import React from 'react'
import Form from '~/components/form/Form'
import Input from '~/components/form/Input'
import SignupLayout from '../../layouts/signup-layout'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import Select from '~/components/form/Select'
import { z } from 'zod'
import FormContainer from '~/components/form/Container'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import NumberInput from '~/components/form/NumberInput'

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
	const mutation = api.company.createCompany.useMutation({
		onSuccess: () => void router.push('/dashboard'),
	})

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

	const schema = z.object({
		name: z.string().min(1).max(100), // Adjust min and max as needed
		employees: z.number(),
		clients: z.number(),
		pricingStructure: z.string(),
	})

	const methods = useForm<z.infer<typeof schema>>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	})

	return (
		<SignupLayout>
			<Form onSubmit={onSubmit} methods={methods}>
				<div className='flex justify-between items-end'>
					<FormContainer>
						<Input
							name='name'
							label="What is your company's name?"
							placeholder='Company Name'
							variant='flushed'
							autoFocus
							size='lg'
						/>
						<NumberInput
							name='employees'
							label='How many designers do you have?'
							placeholder='0'
							variant='flushed'
							size='lg'
						/>
						<NumberInput
							name='clients'
							label='How many projects do you have going on right now?'
							placeholder='0'
							variant='flushed'
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
					</FormContainer>
					<Button variant='ghost' type='submit'>
						<ChevronRightIcon fontSize={20} color='#f3583f' />
					</Button>
				</div>
			</Form>
		</SignupLayout>
	)
}

export default Company
