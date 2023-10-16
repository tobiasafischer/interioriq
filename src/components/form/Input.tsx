/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { Controller, type FieldValues, type RegisterOptions, useFormContext } from 'react-hook-form'
import {
	Input as ChakraInput,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Text,
	type InputProps,
} from '@chakra-ui/react'

const Input = ({
	name,
	label,
	...rest
}: {
	name: string
	label?: string
} & InputProps) => {
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
				render={({ field }) => <ChakraInput {...rest} {...field} />}
			/>
			{errors[name] && <Text color='#e53e3e'>{errors[name]!.message as string}</Text>}
		</div>
	)
}

export default Input
