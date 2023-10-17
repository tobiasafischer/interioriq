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
import { Client } from '@prisma/client'

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
	goToPrevious,
	methods,
	onSubmit,
}: {
	userId: number
	goToPrevious: () => void
	onSubmit: () => void
	methods: UseFormReturn<z.infer<typeof clientSchema>>
}) => {
	const data = api.client.getClients.useQuery(userId, {
		onSuccess: (dat: Client[]) => {
			if (dat && dat.length > 0) {
				methods.setValue('id', `${dat[0]?.id}`)
				setIsMakingNewClient(false)
			}
		},
	})
	const mutate = api.client.createClient.useMutation({ onSuccess: () => data.refetch() })

	const [isMakingNewClient, setIsMakingNewClient] = useState(true)

	const clientMethods = useForm<z.infer<typeof newClientSchema>>({
		mode: 'onChange',
		resolver: zodResolver(newClientSchema),
	})

	const onClientSubmit = () => {
		const val = clientMethods.getValues()
		const input: ClientType = {
			...val,
			userId,
			personalityType: 'not-input',
		}
		mutate.mutate(input)
		setIsMakingNewClient(false)
	}

	return (
		<>
			{isMakingNewClient ? (
				<Form methods={clientMethods}>
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
							onClick={() => void onClientSubmit()}
							isDisabled={!clientMethods.formState.isValid}>
							Create new Client
						</Button>
					</ModalFooter>
				</Form>
			) : (
				<Form methods={methods}>
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
							variant='outline'
							type='submit'
							onClick={onSubmit}
							isDisabled={!methods.formState.isValid}>
							Submit
						</Button>
					</ModalFooter>
				</Form>
			)}
		</>
	)
}

export default Client
