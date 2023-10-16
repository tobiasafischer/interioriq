import { FormControl } from '@chakra-ui/react'
import React from 'react'
import { type FieldValues, FormProvider, type UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MethodType = UseFormReturn<any, any, undefined>

const Form = ({
	onSubmit,
	children,
	inputMethods,
	schema = z.object({}),
}: {
	onSubmit: (val: object) => void
	inputMethods?: MethodType
	children: React.ReactNode
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema?: z.ZodObject<any>
}) => {
	const methods = useForm<z.infer<typeof schema>>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	})

	const getMethod = () => (inputMethods ? inputMethods : methods)

	return (
		<FormProvider {...getMethod()}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					onSubmit(methods.getValues())
					methods.reset()
				}}>
				<FormControl>{children}</FormControl>
			</form>
		</FormProvider>
	)
}

export default Form
