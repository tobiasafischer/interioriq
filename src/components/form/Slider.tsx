import {
	FormLabel,
	Slider as ChakraSlider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const Slider = ({
	min,
	max,
	label,
	defaultValue,
	name,
	prefix,
	suffix,
	step,
}: {
	name: string
	min: number
	max: number
	label?: string
	defaultValue?: number
	prefix?: string
	suffix?: string
	step?: number
}) => {
	const [sliderValue, setSliderValue] = useState(defaultValue ?? max / 2)
	const [showTooltip, setShowTooltip] = React.useState(false)

	const {
		control,
		formState: { errors },
	} = useFormContext()
	return (
		<div className='flex flex-col w-full'>
			{label && <FormLabel textColor='#5c626c'>{label}</FormLabel>}
			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<ChakraSlider
						{...field}
						aria-label='slider-ex-6'
						min={min}
						max={max}
						defaultValue={defaultValue}
						onChange={(val) => setSliderValue(val)}
						onMouseEnter={() => setShowTooltip(true)}
						onMouseLeave={() => setShowTooltip(false)}
						step={step}>
						<SliderMark
							value={sliderValue}
							textAlign='center'
							bg='#f3583f'
							color='white'
							mt='-10'
							ml='-5'
							w='16'
						/>
						<SliderTrack>
							<SliderFilledTrack bg='#f3583f' />
						</SliderTrack>
						<Tooltip
							hasArrow
							bg='#f3583f'
							color='white'
							placement='top'
							isOpen={showTooltip}
							label={`${prefix ?? ''}${sliderValue}${suffix ?? ''}`}>
							<SliderThumb />
						</Tooltip>
					</ChakraSlider>
				)}
			/>

			{errors[name] && <Text color='#e53e3e'>{errors[name]!.message as string}</Text>}
		</div>
	)
}

export default Slider
