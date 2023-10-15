import React, { useEffect, useState } from 'react'
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Input,
	ModalFooter,
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

const Dashboard = () => {
	const { data: sessionData } = useSession()

	const data = api.project.getProjects.useQuery(Number.parseInt(sessionData?.user.id ?? '0'))
	const [isAddingProject, setIsAddingProject] = useState(false)
	const [newProjectName, setNewProjectName] = useState('')
	useEffect(() => console.log(data.data), [data])
	const openAddProjectModal = () => {
		setIsAddingProject(true)
	}

	const closeAddProjectModal = () => {
		setIsAddingProject(false)
		setNewProjectName('')
	}

	const addProject = () => {
		if (newProjectName.trim() !== '') {
			closeAddProjectModal()
		}
	}

	return (
		<div className='w-full h-full p-20 mt-10'>
			<Card className='h-full' boxShadow='lg'>
				<CardHeader>
					<div className='flex w-full justify-between pl-4'>
						<div className={styles.subtitle}>Projects</div>
						<Button onClick={openAddProjectModal}>
							<AddIcon color='#f3583f' />
						</Button>
					</div>
				</CardHeader>
				<CardBody>
					<Table>
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
							<div className='flex justify-center items-center w-full h-full'>
								<Text>There are no projects.</Text>
							</div>
						)}
						{data.isLoading && <SkeletonTable />}
						{!data.isLoading && (data.data?.length ?? 0) > 0 && (
							<Tbody className='w-full h-full'>
								{data.data?.map((row, i) => (
									<Tr key={row.id}>
										<Td>{i + 1}</Td>
										<Td>{row.name}</Td>
										<Td>
											{row.estimatedEndDate instanceof Date
												? format(row.estimatedEndDate, 'mm/yyyy')
												: 'null'}
										</Td>
										<Td>asdasdasdasdasdasdas</Td>
										<Td>asdasdasdasdasdasdas</Td>
										<Td>{format(row.dateAdded, 'mm/yyyy')}</Td>
									</Tr>
								))}
							</Tbody>
						)}
					</Table>
				</CardBody>
			</Card>

			<Modal isOpen={isAddingProject} onClose={closeAddProjectModal}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add New Project</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							placeholder='Project Name'
							value={newProjectName}
							onChange={(e) => setNewProjectName(e.target.value)}
						/>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' onClick={addProject}>
							Add Project
						</Button>
						<Button onClick={closeAddProjectModal}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	)
}

export default Dashboard
