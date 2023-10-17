import React from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	Stepper,
	useSteps,
	Step,
	StepIndicator,
	StepStatus,
	StepNumber,
	StepIcon,
	StepTitle,
	StepSeparator,
} from '@chakra-ui/react'
import House, { houseSchema } from './steps/house'
import Client, { clientSchema } from './steps/client'
import { useSession } from 'next-auth/react'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'

const FormModal = ({ isOpen, toggleModal }: { isOpen: boolean; toggleModal: () => void }) => {
	const { data: sessionData } = useSession()

	const steps = ['House', 'Client']
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { goToNext, goToPrevious, activeStep } = useSteps({
		index: 1,
		count: steps.length,
	})

	const houseMethods = useForm<z.infer<typeof houseSchema>>({
		mode: 'onChange',
		resolver: zodResolver(houseSchema),
	})
	const clientMethods = useForm<z.infer<typeof clientSchema>>({
		mode: 'onChange',
		resolver: zodResolver(clientSchema),
	})

	const handleClose = () => {
		houseMethods.reset()
		clientMethods.reset()
		toggleModal()
	}

	const mutation = api.project.createProject.useMutation({ onSuccess: () => handleClose() })

	const onSubmit = () => {
		const vals = houseMethods.getValues()
		const input = {
			...vals,
			estimatedEndDate: `${new Date(vals.estimatedEndDate).valueOf()}`,
			bath: Number.parseInt(`${vals.bath}`),
			maxBudget: Number.parseInt(`${vals.maxBudget}`),
			minBudget: Number.parseInt(`${vals.minBudget}`),
			rooms: Number.parseInt(`${vals.rooms}`),
			squareFootage: Number.parseInt(`${vals.squareFootage}`),
			clientId: Number.parseInt(clientMethods.getValues().id),
			userId: Number.parseInt(sessionData?.user.id ?? ''),
			pricingEstimate: 0,
		}
		mutation.mutate(input)
	}

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<ModalOverlay />
			<ModalContent className='p-5'>
				<ModalHeader className='pr-10'>
					<Stepper size='lg' index={activeStep} colorScheme='red' width='auto'>
						{steps.map((step, index) => (
							<Step key={index}>
								<StepIndicator>
									<StepStatus
										complete={<StepIcon />}
										incomplete={<StepNumber />}
										active={<StepNumber />}
									/>
								</StepIndicator>
								<StepTitle>{step}</StepTitle>
								<StepSeparator />
							</Step>
						))}
					</Stepper>
				</ModalHeader>
				<ModalCloseButton />
				{activeStep === 1 && <House methods={houseMethods} goToNext={goToNext} />}
				{activeStep === 2 && (
					<Client
						onSubmit={onSubmit}
						methods={clientMethods}
						goToPrevious={goToPrevious}
						userId={Number.parseInt(sessionData?.user.id ?? '0')}
					/>
				)}
			</ModalContent>
		</Modal>
	)
}

export default FormModal
