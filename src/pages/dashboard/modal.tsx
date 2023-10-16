import React from 'react'
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
import House from './steps/house'
import Client from './steps/client'
import Files from './steps/files'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useSession } from 'next-auth/react'

const FormModal = ({ isOpen, toggleModal }: { isOpen: boolean; toggleModal: () => void }) => {
	const { data: sessionData } = useSession()

	const steps = ['House', 'Client', 'Files']
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { goToNext, goToPrevious, activeStep } = useSteps({
		index: 1,
		count: steps.length,
	})

	const houseSubmit = (vals: object) => {
		console.log('house', vals)
	}
	const clientSubmit = (vals: object) => {
		console.log('client', vals)
	}
	const filesSubmit = (vals: object) => {
		console.log('files', vals)
	}

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
				<ModalBody className='flex flex-col gap-5'>
					{activeStep === 1 && <House onSubmit={houseSubmit} />}
					{activeStep === 2 && (
						<Client
							onSubmit={clientSubmit}
							userId={Number.parseInt(sessionData?.user.id ?? '0')}
						/>
					)}
					{activeStep === 3 && <Files onSubmit={filesSubmit} />}
				</ModalBody>
				<ModalFooter>
					{activeStep !== 1 && (
						<Button
							variant='ghost'
							disabled={activeStep === 1}
							onClick={() => void goToPrevious()}>
							<ChevronLeftIcon fontSize={20} color='#f3583f' />
						</Button>
					)}
					{activeStep === 3 ? (
						<Button type='submit'>Submit</Button>
					) : (
						<Button
							variant='ghost'
							disabled={activeStep === 3}
							onClick={() => void goToNext()}>
							<ChevronRightIcon fontSize={20} color='#f3583f' />
						</Button>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default FormModal
