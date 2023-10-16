import React from 'react'

const FormContainer = ({ children, gap = 10 }: { gap?: number; children: React.ReactNode }) => {
	return <div className={`flex flex-col gap-${gap} w-full `}>{children}</div>
}

export default FormContainer
