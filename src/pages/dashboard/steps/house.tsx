import { FormLabel } from '@chakra-ui/react'
import React from 'react'
import { z } from 'zod'
import Form from '~/components/form/Form'
import Input from '~/components/form/Input'
import PricingStructure from '~/components/form/PricingStructure'

const houseSchema = z.object({
	name: z.string().min(2).max(50),
	type: z.string().min(2).max(50),
	rooms: z.number().int().min(0),
	bath: z.number().int().min(0),
	squareFootage: z.number().int().min(0),
	pricingStructure: z.string(), // Adjust this based on your pricing structure data type
	address: z.string().min(5), // Adjust min length as needed
	estimatedEndDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Date format validation
})

const House = ({ onSubmit }: { onSubmit: (vals: object) => void }) => {
	return (
		<Form onSubmit={onSubmit} schema={houseSchema}>
			<Input name='name' placeholder='Project name' label='Project name' isRequired />
			<Input name='type' placeholder='Project type' label='Project type' isRequired />
			{/** idk what this is  select probably*/}
			<Input name='rooms' placeholder='0' label='Number of rooms' isRequired type='number' />
			<Input name='bath' placeholder='0' label='Number of bathrooms' isRequired type='number' />
			<Input
				name='squareFootage'
				label='Square Footage'
				placeholder='0'
				type='number'
				isRequired
			/>
			<div>
				<FormLabel textColor='#5c626c'>Pricing structure</FormLabel>
				<PricingStructure />
			</div>
			{/**min max slider */}
			<Input
				name='address'
				placeholder='123 Street, City, State, 12345'
				isRequired
				label='Address'
			/>
			{/** do a google api for address */}

			<Input label='Estimated end date' name='estimatedEndDate' type='date' />
		</Form>
	)
}

export default House
