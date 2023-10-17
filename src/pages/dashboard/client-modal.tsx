import React from 'react'
import {
	Grid,
	GridItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react'
import { type ProjectType } from '~/server/api/routers/project'

const ClientModal = ({
	isOpen,
	onClose,
	selectedClient,
}: {
	isOpen: boolean
	onClose: () => void
	selectedClient: ProjectType | null | undefined
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size='5xl'>
			<ModalOverlay />
			<ModalContent className='p-5'>
				<ModalHeader className='pr-10'>Project Details</ModalHeader>
				<ModalCloseButton />
				{selectedClient && (
					<ModalBody>
						<Grid templateColumns='repeat(2, 1fr)' gap={6}>
							<GridItem colSpan={1}>
								<Text fontWeight='bold'>Basic Information</Text>
								<Text>Name:</Text>
								<Text>{selectedClient.name}</Text>
								<Text>Address:</Text>
								<Text>{selectedClient.address}</Text>
								<Text>Type:</Text>
								<Text>{selectedClient.type ?? 'N/A'}</Text>
								<Text>Rooms:</Text>
								<Text>{selectedClient.rooms}</Text>
								<Text>Bath:</Text>
								<Text>{selectedClient.bath}</Text>
								<Text>Pricing Structure:</Text>
								<Text>{selectedClient.pricingStructure}</Text>
							</GridItem>
							<GridItem colSpan={1}>
								<Text fontWeight='bold'>Additional Information</Text>
								<Text>Square Footage:</Text>
								<Text>{selectedClient.squareFootage}</Text>
								<Text>Budget:</Text>
								<Text>
									${selectedClient.minBudget} - ${selectedClient.maxBudget}
								</Text>
								<Text>Pricing Estimate:</Text>
								<Text>{selectedClient.pricingEstimate ?? 'N/A'}</Text>
								<Text>Estimated End Date:</Text>
								<Text>{selectedClient.estimatedEndDate}</Text>
								<Text fontWeight='bold' mt={6}>
									Client Information
								</Text>
								<Text>Client Name:</Text>
								<Text>{selectedClient.client?.name}</Text>
								<Text>Client Email:</Text>
								<Text>{selectedClient.client?.email}</Text>
								<Text>Personality Type:</Text>
								<Text>{selectedClient.client?.personalityType ?? 'N/A'}</Text>
							</GridItem>
						</Grid>
					</ModalBody>
				)}
			</ModalContent>
		</Modal>
	)
}

export default ClientModal
