import {
	NumberInput as ChakraNumberInput,
	FormLabel,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInputField,
	type NumberInputProps,
	NumberInputStepper,
	Text,
} from '@chakra-ui/react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const NumberInput = ({
	name,
	label,
	...rest
}: {
	name: string
	label?: string
} & NumberInputProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	return (
		<div className='flex flex-col w-full'>
			{label && <FormLabel textColor='#5c626c'>{label}</FormLabel>}
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<ChakraNumberInput {...rest} {...field}>
						<NumberInputField
							onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
						/>
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</ChakraNumberInput>
				)}
			/>
			{errors[name] && <Text color='#e53e3e'>{errors[name]!.message as string}</Text>}
		</div>
	)
}

export default NumberInput
