import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button, FormLabel, ModalBody, ModalFooter, Text } from '@chakra-ui/react'
import React from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import FormContainer from '~/components/form/Container'
import Form from '~/components/form/Form'
import Input from '~/components/form/Input'
import NumberInput from '~/components/form/NumberInput'
import PricingStructure from '~/components/form/PricingStructure'
import Select from '~/components/form/Select'

export const houseSchema = z.object({
	name: z.string().min(2).max(50),
	type: z.string().min(2).max(50),
	rooms: z.string().transform((v) => Number(v) || 0),
	bath: z.string().transform((v) => Number(v) || 0),
	squareFootage: z.string().transform((v) => Number(v) || 0),
	pricingStructure: z.string(), // Adjust this based on your pricing structure data type
	address: z.string().min(5), // Adjust min length as needed
	estimatedEndDate: z.string().transform((v) => `${new Date(v).valueOf()}`), // Date format validation
	minBudget: z.string().transform((v) => Number(v) || 0),
	maxBudget: z.string().transform((v) => Number(v) || 0),
})

const interiorDesignProjects = [
	'Single Room Design',
	'Whole House Design',
	'Office Design',
	'Retail Design',
	'Restaurant Design',
	'Healthcare Facilities',
	'Educational Institutions',
	'Bathroom Design',
	'Kitchen Design',
	'Home Theaters',
	'Home Offices',
	'Bars and Nightclubs',
	'Event and Exhibition Design',
	'Green and Sustainable Design',
	'Historic Preservation',
	'Luxury Design',
	'Universal Design',
	'Outdoor Spaces',
	'Virtual Interior Design',
]

const House = ({
	goToNext,
	methods,
}: {
	goToNext: () => void
	methods: UseFormReturn<z.infer<typeof houseSchema>>
}) => {
	return (
		<Form methods={methods} resetFields={false}>
			<ModalBody className='flex flex-col gap-5 overflow-y-scroll' maxHeight='2xl'>
				<FormContainer gap={5}>
					<Input name='name' placeholder='Project name' label='Project name' />
					<Select name='type' defaultValue={interiorDesignProjects[0]} label='Project type'>
						{interiorDesignProjects.map((project) => (
							<option key={project} value={project}>
								{project}
							</option>
						))}
					</Select>
					<NumberInput name='rooms' placeholder='0' label='Number of rooms' />
					<NumberInput name='bath' placeholder='0' label='Number of bathrooms' />
					<NumberInput name='squareFootage' label='Square Footage' placeholder='0' />
					<div>
						<FormLabel textColor='#5c626c'>Pricing structure</FormLabel>
						<PricingStructure />
					</div>
					<div className='flex gap-5 items-end'>
						<NumberInput name='minBudget' placeholder='0' label='Min budget' />
						<Text marginBottom={2}>to</Text>
						<NumberInput name='maxBudget' placeholder='0' label='Max budget' />
					</div>
					{/**min max slider */}
					<Input
						name='address'
						placeholder='123 Street, City, State, 12345'
						isRequired
						label='Address'
					/>
					<Input label='Estimated end date' name='estimatedEndDate' type='date' />
				</FormContainer>
			</ModalBody>
			<ModalFooter>
				<Button
					variant='ghost'
					type='submit'
					onClick={() => void goToNext()}
					isDisabled={!methods.formState.isValid}>
					<ChevronRightIcon fontSize={20} color='#f3583f' />
				</Button>
			</ModalFooter>
		</Form>
	)
}

export default House
