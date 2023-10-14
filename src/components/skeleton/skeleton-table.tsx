import React from 'react'
import { Skeleton, Td, Tr } from '@chakra-ui/react'

const SkeletonRow = ({ width }: { width: number }) => (
	<Tr>
		<Td>
			<Skeleton height='10px' w={width} my={4} />
		</Td>
		<Td>
			<Skeleton height='10px' w={width} my={4} />
		</Td>
		<Td>
			<Skeleton height='10px' w={width} my={4} />
		</Td>
		<Td>
			<Skeleton height='10px' w={width} my={4} />
		</Td>
	</Tr>
)

const SkeletonTable = () => {
	return (
		<tbody>
			<SkeletonRow width={75} />
			<SkeletonRow width={125} />
			<SkeletonRow width={50} />
			<SkeletonRow width={100} />
			<SkeletonRow width={75} />
		</tbody>
	)
}

export default SkeletonTable
