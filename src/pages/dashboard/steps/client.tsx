import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import Input from '~/components/form/Input'
import Select from '~/components/form/Select'
import { api } from '~/utils/api'
import Form from '~/components/form/Form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type ClientType = {
	userId: number
	name: string
	email: string
	personalityType?: string | undefined
}

const schema = z
	.object({
		name: z
			.string()
			.min(2)
			.max(50)
			.refine(
				(name) => {
					const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/
					return nameRegex.test(name)
				},
				{
					message: 'Please enter a valid first and last name',
				},
			), // Adjust min and max as needed
		email: z.string().email(),
	})
	.required()

const Client = ({ userId, onSubmit }: { userId: number; onSubmit: (val: object) => void }) => {
	const data = api.client.getClients.useQuery(userId, {
		onSuccess: (dat) => {
			if (dat && dat.length > 0) setIsMakingNewClient(false)
		},
	})
	const mutate = api.client.createClient.useMutation()

	const [isMakingNewClient, setIsMakingNewClient] = useState(true)

	const onClientSubmit = (val: object) => {
		const input: ClientType = {
			...(val as Pick<ClientType, 'name' | 'email'>),
			userId,
			personalityType: 'not-input',
		}
		mutate.mutate(input)
	}

	return (
		<>
			<div className='h-full w-full'>
				{isMakingNewClient ? (
					<Form onSubmit={onClientSubmit} schema={schema}>
						<div className='h-full w-full flex flex-col gap-10'>
							<Input label="Client's name" name='name' />
							<Input name='email' label="Client's email address" />
							<Button type='submit'>asdasd</Button>
						</div>
					</Form>
				) : (
					<Form onSubmit={onSubmit} schema={z.object({ pricingStructure: z.string() })}>
						<Select name='pricingStructure' defaultValue='Hourly'>
							{data.data?.map((client) => (
								<option key={client.id} value={client.id}>
									{client.name}
								</option>
							))}
						</Select>
					</Form>
				)}
			</div>
		</>
	)
}

export default Client
