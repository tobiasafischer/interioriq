import React from 'react'
import Select from './Select'

const PricingStructure = () => {
	return (
		<Select name='pricingStructure' defaultValue='Hourly'>
			<option value='Hourly'>Hourly</option>
			<option value='Flat fee'>Flat fee</option>
			<option
				value='Price per square
								foot'>
				Price per square foot
			</option>
			<option value='Percentage'>Percentage</option>
			<option value='Commission'>Commission</option>
			<option value='Hybrid'>Hybrid</option>
			<option value='multiple'>Multiple</option>
		</Select>
	)
}

export default PricingStructure
