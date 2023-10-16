import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, ModalBody, ModalFooter } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import FilePicker from '~/components/form/FilePicker'
import Form from '~/components/form/Form'

const Files = ({
	onSubmit,
	goToPrevious,
}: {
	onSubmit: (val: object) => void
	goToPrevious: () => void
}) => {
	const methods = useForm({
		mode: 'onChange',
	})

	return (
		<Form methods={methods} onSubmit={onSubmit}>
			<ModalBody className='flex flex-col gap-5'>
				<FilePicker name='supportingFiles' label='Supporting files' />
			</ModalBody>
			<ModalFooter>
				<Button variant='ghost' onClick={() => void goToPrevious()}>
					<ChevronLeftIcon fontSize={20} color='#f3583f' />
				</Button>
			</ModalFooter>
		</Form>
	)
}

export default Files
