import { FormLabel } from '@chakra-ui/react'
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
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag &apos;n&apos; drop some files here, or click to select files</p>
			)}
		</div>
	)
}

export default FilePicker
