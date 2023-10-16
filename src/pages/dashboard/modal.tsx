import React, { useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	Button,
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
import Files from './steps/files'
import { useSession } from 'next-auth/react'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const FormModal = ({ isOpen, toggleModal }: { isOpen: boolean; toggleModal: () => void }) => {
	const { data: sessionData } = useSession()
	const [houseData, setHouseData] = useState<z.infer<typeof houseSchema> | null>(null)
	const [clientData, setClientData] = useState<z.infer<typeof clientSchema> | null>(null)
	const [fileData, setFileData] = useState(null)

	const steps = ['House', 'Client', 'Files']
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { goToNext, goToPrevious, activeStep } = useSteps({
		index: 1,
		count: steps.length,
	})

	const houseSubmit = (vals: z.infer<typeof houseSchema>) => {
		console.log('house', vals)
		setHouseData(vals)
	}
	const clientSubmit = (vals: z.infer<typeof clientSchema>) => {
		console.log('client', vals)
		setClientData(vals)
	}
	const filesSubmit = (vals: object) => {
		console.log('files', vals)
	}
	const houseMethods = useForm<z.infer<typeof houseSchema>>({
		mode: 'onChange',
		resolver: zodResolver(houseSchema),
	})
	const clientMethods = useForm<z.infer<typeof clientSchema>>({
		mode: 'onChange',
		resolver: zodResolver(clientSchema),
	})

	return (
		<Modal isOpen={isOpen} onClose={toggleModal} size='5xl'>
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
				{activeStep === 1 && (
					<House
						methods={houseMethods}
						goToNext={goToNext}
						onSubmit={(vals: object) => houseSubmit(vals as z.infer<typeof houseSchema>)}
					/>
				)}
				{activeStep === 2 && (
					<Client
						methods={clientMethods}
						goToNext={goToNext}
						goToPrevious={goToPrevious}
						onSubmit={(vals: object) => clientSubmit(vals as z.infer<typeof clientSchema>)}
						userId={Number.parseInt(sessionData?.user.id ?? '0')}
					/>
				)}
				{activeStep === 3 && <Files onSubmit={filesSubmit} goToPrevious={goToPrevious} />}
			</ModalContent>
		</Modal>
	)
}

export default FormModal
