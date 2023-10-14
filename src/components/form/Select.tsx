import React from 'react'
import { Select as ChakraSelect, type SelectProps } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

const Select = ({
	name,
	defaultValue,
	children,
	...rest
}: { name: string; defaultValue: string; children: React.ReactNode } & SelectProps) => {
	const { control } = useFormContext()

	return (
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
	)
}

export default Select
