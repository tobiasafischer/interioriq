import React, { useEffect, useState } from 'react'
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Button,
	Card,
	CardHeader,
	CardBody,
	Text,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import styles from '../index.module.css'
import SkeletonTable from '~/components/skeleton/skeleton-table'
import { AddIcon } from '@chakra-ui/icons'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import FormModal from './modal'
import { useRouter } from 'next/router'

const Dashboard = () => {
	const { data: sessionData } = useSession()

	const data = api.project.getProjects.useQuery(Number.parseInt(sessionData?.user.id ?? '0'))
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()

	const toggleModal = () => setIsOpen((prev) => !prev)
	const openClient = (idx: number) => {
		if (data?.data) void router.push(`/projects/${data?.data[idx]?.id}`)
	}

	return (
		<div className='w-full h-full p-20 mt-10'>
			<Card className='h-full' boxShadow='lg'>
				<CardHeader>
					<div className='flex w-full justify-between pl-4'>
						<div className={styles.subtitle}>Projects</div>
						<Button onClick={toggleModal}>
							<AddIcon color='#f3583f' />
						</Button>
					</div>
				</CardHeader>
				<CardBody className='h-full '>
					<Table className='relative'>
						<Thead>
							<Tr>
								<Th>#</Th>
								<Th>Name</Th>
								<Th>Projected End Date</Th>
								<Th>Pricing Estimate</Th>
								<Th>Client</Th>
								<Th>Date Added</Th>
							</Tr>
						</Thead>
						{data.data?.length === 0 && (
							<div className='absolute flex justify-center items-center flex-col w-full h-5/6 gap-5'>
								<Text fontSize={22} color='#f3583f' fontWeight='bold'>
									There are no projects.
								</Text>
							</div>
						)}
						{data.isLoading && <SkeletonTable />}
						{!data.isLoading && (data.data?.length ?? 0) > 0 && (
							<Tbody className='w-full '>
								{data.data?.map((row, i) => (
									<Tr key={row.id} onClick={() => openClient(i)}>
										<Td>{i + 1}</Td>
										<Td>{row.name}</Td>
										<Td>{format(Number.parseInt(row.estimatedEndDate), 'MM/dd/yyyy')}</Td>
										<Td>{row.pricingEstimate}</Td>
										<Td>{row.client?.name}</Td>
										<Td>{format(Number.parseInt(row.dateAdded), 'MM/dd/yyyy')}</Td>
									</Tr>
								))}
							</Tbody>
						)}
					</Table>
				</CardBody>
			</Card>
			<FormModal isOpen={isOpen} toggleModal={toggleModal} />
		</div>
	)
}

export default Dashboard
