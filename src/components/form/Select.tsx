import React from 'react'
import { Select as ChakraSelect, FormLabel, Text, type SelectProps } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

const Select = ({
	label,
	name,
	defaultValue,
	children,
	...rest
}: {
	label?: string
	name: string
	defaultValue?: string
	children: React.ReactNode
} & SelectProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	return (
		<div className='flex flex-col w-full'>
			{label && <FormLabel textColor='#5c626c'>{label}</FormLabel>}
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field }) => (
					<ChakraSelect {...field} {...rest}>
						{children}
					</ChakraSelect>
				)}
			/>
			{errors[name] && <Text color='#e53e3e'>{errors[name]!.message as string}</Text>}
		</div>
	)
}

export default Select
