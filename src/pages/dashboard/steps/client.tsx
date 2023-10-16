import { Button, ModalBody, ModalFooter } from '@chakra-ui/react'
import React, { useState } from 'react'
import Input from '~/components/form/Input'
import Select from '~/components/form/Select'
import { api } from '~/utils/api'
import Form from '~/components/form/Form'
import { z } from 'zod'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { type UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type ClientType = {
	userId: number
	name: string
	email: string
	personalityType?: string | undefined
}

export const newClientSchema = z
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

export const clientSchema = z.object({ id: z.string() })

const Client = ({
	userId,
	onSubmit,
	goToPrevious,
	goToNext,
	methods,
}: {
	userId: number
	onSubmit: (val: object) => void
	goToPrevious: () => void
	goToNext: () => void
	methods: UseFormReturn<z.infer<typeof clientSchema>>
}) => {
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

	const clientMethods = useForm<z.infer<typeof newClientSchema>>({
		mode: 'onChange',
		resolver: zodResolver(newClientSchema),
	})

	return (
		<>
			{isMakingNewClient ? (
				<Form methods={clientMethods} onSubmit={onClientSubmit}>
					<ModalBody className='flex flex-col gap-5'>
						<Input label="Client's name" name='name' />
						<Input name='email' label="Client's email address" />
					</ModalBody>
					<ModalFooter className='flex gap-5'>
						<Button
							variant='outline'
							color='#f3583f'
							borderColor='#f3583f'
							onClick={() => {
								clientMethods.reset()
								setIsMakingNewClient(false)
							}}>
							Cancel
						</Button>
						<Button
							variant='outline'
							color='#f3583f'
							borderColor='#f3583f'
							type='submit'
							isDisabled={!clientMethods.formState.isValid}>
							Create new Client
						</Button>
					</ModalFooter>
				</Form>
			) : (
				<Form methods={methods} onSubmit={onSubmit}>
					<ModalBody className='flex flex-col gap-5'>
						<Select name='id' label='Choose a client'>
							{data.data?.map((client) => (
								<option key={client.id} value={client.id}>
									{client.name}
								</option>
							))}
						</Select>
						<Button
							variant='outline'
							color='#f3583f'
							borderColor='#f3583f'
							marginTop={5}
							onClick={() => setIsMakingNewClient(true)}>
							Make a new Client
						</Button>
					</ModalBody>
					<ModalFooter>
						<Button variant='ghost' onClick={() => void goToPrevious()}>
							<ChevronLeftIcon fontSize={20} color='#f3583f' />
						</Button>
						<Button
							variant='ghost'
							type='submit'
							onClick={() => void goToNext()}
							isDisabled={!methods.formState.isValid}>
							<ChevronRightIcon fontSize={20} color='#f3583f' />
						</Button>
					</ModalFooter>
				</Form>
			)}
		</>
	)
}

export default Client
