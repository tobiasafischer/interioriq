import { Button, FormLabel } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useFormContext } from 'react-hook-form'

const FilePicker = ({ name, label }: { name: string; label?: string }) => {
	const { control } = useFormContext()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onDrop = useCallback((acceptedFiles: any) => {
		console.log(acceptedFiles)
		// Do something with the files
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
	return (
		<div {...getRootProps()}>
			{label && <FormLabel textColor='#5c626c'>{label}</FormLabel>}
			<Controller
				name={name}
				control={control}
				render={({ field }) => <input {...field} {...getInputProps()} />}
			/>
			<Button
				variant='outline'
				style={{ border: '2px dotted #f3583f' }}
				color='#f3583f'
				height={20}
				width='full'
				borderWidth={2}>
				{isDragActive
					? 'Drop the files here'
					: "Drag 'n' drop some files here, or click to select files"}
			</Button>
		</div>
	)
}

export default FilePicker
