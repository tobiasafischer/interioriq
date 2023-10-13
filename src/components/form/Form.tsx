import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const Form = ({
	onSubmit,
	children,
}: {
	onSubmit: (val: object) => void
	children: React.ReactNode
}) => {
	const methods = useForm()

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					onSubmit(methods.getValues())
					methods.reset()
				}}>
				{children}
			</form>
		</FormProvider>
	)
}

export default Form
