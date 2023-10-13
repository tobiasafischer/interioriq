import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input as ChakraInput, FormLabel, type InputProps } from '@chakra-ui/react'

const Input = ({
	name,
	defaultValue = '',
	label,
	...rest
}: {
	name: string
	defaultValue?: string
	label?: string
} & InputProps) => {
	const { control } = useFormContext()
	return (
		<div className='flex flex-col w-full'>
			{label && <FormLabel textColor='#5c626c'>{label}</FormLabel>}
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field }) => <ChakraInput {...field} {...rest} focusBorderColor='#f3583f' />}
			/>
		</div>
	)
}

export default Input
