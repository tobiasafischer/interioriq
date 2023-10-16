import { FormControl } from '@chakra-ui/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const Form = ({
	onSubmit,
	children,
	schema = z.object({}),
}: {
	onSubmit: (val: object) => void
	children: React.ReactNode
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema?: z.ZodObject<any>
}) => {
	const methods = useForm<z.infer<typeof schema>>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	})

	return (
		<FormProvider {...methods}>
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
