import React from 'react'
import FilePicker from '~/components/form/FilePicker'
import Form from '~/components/form/Form'

const Files = ({ onSubmit }: { onSubmit: (val: object) => void }) => {
	return (
		<Form onSubmit={onSubmit}>
			<FilePicker name='supportingFiles' label='Supporting files' />
		</Form>
	)
}

export default Files
