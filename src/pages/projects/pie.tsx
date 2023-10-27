import { ResponsivePie } from '@nivo/pie'
import React from 'react'

export type PieDataType = {
	id: string
	label: string
	value: number
	color: string
}

const Pie = ({ data }: { data: PieDataType[] }) => {
	return (
		<ResponsivePie
			data={data}
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			innerRadius={0.5}
			padAngle={0.7}
			cornerRadius={3}
			activeOuterRadiusOffset={8}
			borderWidth={1}
			borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
			arcLinkLabelsSkipAngle={10}
			arcLinkLabelsTextColor='#333333'
			arcLinkLabelsThickness={2}
			arcLinkLabelsColor={{ from: 'color' }}
			arcLabelsSkipAngle={10}
			arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
		/>
	)
}

export default Pie
