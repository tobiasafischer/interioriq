import { FormControl } from '@chakra-ui/react'
import React from 'react'
import { FormProvider, type UseFormReturn } from 'react-hook-form'

const Form = ({
	onSubmit,
	children,
	resetFields = true,
	methods,
}: {
	onSubmit?: (val: object) => void
	children: React.ReactNode
	resetFields?: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	methods: UseFormReturn<any>
}) => {
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					if (onSubmit) onSubmit(methods.getValues())
					if (resetFields) methods.reset()
				}}>
				<FormControl>{children}</FormControl>
			</form>
		</FormProvider>
	)
}

export default Form
