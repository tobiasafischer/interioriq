import React from 'react'
import {
	Card,
	CardBody,
	Text,
	Grid,
	GridItem,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	TabIndicator,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import Pie from './pie'
import Form from '~/components/form/Form'
import { useForm } from 'react-hook-form'
import Slider from '~/components/form/Slider'

const data = [
	{
		id: 'java',
		label: 'java',
		value: 195,
		color: 'hsl(90, 70%, 50%)',
	},
	{
		id: 'erlang',
		label: 'erlang',
		value: 419,
		color: 'hsl(56, 70%, 50%)',
	},
	{
		id: 'ruby',
		label: 'ruby',
		value: 407,
		color: 'hsl(103, 70%, 50%)',
	},
	{
		id: 'haskell',
		label: 'haskell',
		value: 474,
		color: 'hsl(186, 70%, 50%)',
	},
	{
		id: 'go',
		label: 'go',
		value: 71,
		color: 'hsl(104, 70%, 50%)',
	},
]

const ProjectsPage = () => {
	const { data: sessionData } = useSession()
	const router = useRouter()

	const id = router.query['project-id']
	const project = api.project.getProject.useQuery(Number.parseInt((id as string) ?? ''), {
		enabled: !!id,
	})

	const methods = useForm()

	const getPricing = (pricingStructure: string) => {
		switch (pricingStructure) {
			case 'Hourly':
				return (
					<Slider
						label='Cost per hour'
						name='costPerHour'
						min={25}
						max={750}
						defaultValue={100}
						prefix='$'
					/>
				)

			case 'Flat fee':
				return (
					<Slider
						label='Flat fee'
						name='pricePerSqFt'
						min={0}
						max={100000}
						defaultValue={10000}
						prefix='$'
					/>
				)
			case 'Price per square foot':
				return (
					<Slider
						label='Price per Square foot'
						name='pricePerSqFt'
						min={2}
						max={25}
						defaultValue={10}
						prefix='$'
					/>
				)
			case 'Commission':
				return (
					<Slider
						label='Comission rate for cost of items'
						name='commissionRate'
						min={5}
						max={30}
						defaultValue={7.5}
						suffix='%'
					/>
				)

			case 'Hybrid':
				return (
					<>
						<Slider
							label='Flat fee'
							name='pricePerSqFt'
							min={0}
							max={100000}
							defaultValue={10000}
							prefix='$'
						/>
						<Slider
							label='Cost per hour'
							name='costPerHour'
							min={25}
							max={750}
							defaultValue={100}
							prefix='$'
						/>
						<Slider
							label='Comission rate for cost of items'
							name='commissionRate'
							min={5}
							max={30}
							defaultValue={7.5}
							suffix='%'
						/>
						<Slider
							label='Price per Square foot'
							name='pricePerSqFt'
							min={2}
							max={25}
							defaultValue={10}
							prefix='$'
						/>
					</>
				)

			default:
				// Default case with reasonable values
				return (
					<Slider
						label='Default'
						name='defaultRate'
						min={0}
						max={100}
						defaultValue={50}
						suffix=''
					/>
				)
		}
	}
	return (
		<div className='w-full h-full p-20 mt-10'>
			<Card className='h-full' boxShadow='lg'>
				{/* <CardHeader>
					<div className='flex w-full justify-between pl-4'>
						<div className={styles.subtitle}>Projects</div>
					</div>
				</CardHeader> */}
				<CardBody className='h-full '>
					<Tabs size='md' variant='unstyled'>
						<TabList>
							<Tab>Project Details</Tab>
							<Tab>Pricing Estimation</Tab>
							<Tab>Client Information</Tab>
						</TabList>
						<TabIndicator mt='-1.5px' height='2px' bg='#f3583f' borderRadius='1px' />
						<TabPanels>
							<TabPanel>
								{project.data && (
									<Grid templateColumns='repeat(2, 1fr)' gap={6}>
										<GridItem colSpan={1}>
											<Text fontWeight='bold'>Basic Information</Text>
											<Text>Name:</Text>
											<Text>{project.data.name}</Text>
											<Text>Address:</Text>
											<Text>{project.data.address}</Text>
											<Text>Type:</Text>
											<Text>{project.data.type ?? 'N/A'}</Text>
											<Text>Rooms:</Text>
											<Text>{project.data.rooms}</Text>
											<Text>Bath:</Text>
											<Text>{project.data.bath}</Text>
											<Text>Pricing Structure:</Text>
											<Text>{project.data.pricingStructure}</Text>
										</GridItem>
										<GridItem colSpan={1}>
											<Text fontWeight='bold'>Additional Information</Text>
											<Text>Square Footage:</Text>
											<Text>{project.data.squareFootage}</Text>
											<Text>Budget:</Text>
											<Text>
												${project.data.minBudget} - ${project.data.maxBudget}
											</Text>
											<Text>Pricing Estimate:</Text>
											<Text>{project.data.pricingEstimate ?? 'N/A'}</Text>
											<Text>Estimated End Date:</Text>
											<Text>{project.data.estimatedEndDate}</Text>
											<Text fontWeight='bold' mt={6}>
												Client Information
											</Text>
											<Text>Client Name:</Text>
											<Text>{project.data.client?.name}</Text>
											<Text>Client Email:</Text>
											<Text>{project.data.client?.email}</Text>
											<Text>Personality Type:</Text>
											<Text>{project.data.client?.personalityType ?? 'N/A'}</Text>
										</GridItem>
									</Grid>
								)}
							</TabPanel>
							<TabPanel className='h-full w-full flex justify-center items-center relative'>
								<div
									style={{ width: 600, height: 600 }}
									className='flex items-center justify-center h-max'>
									<Pie data={data} />
								</div>
								<div className='absolute left-10 bottom-10 w-96'>
									<Form methods={methods}>
										<div className='w-full flex flex-col gap-5'>
											{project.data?.client?.personalityType &&
												getPricing(project.data?.client?.personalityType)}
											<Slider
												label='Cost adjustment per additional project'
												name='costPerRoom'
												min={0}
												max={5}
												defaultValue={2}
												suffix='%'
												step={0.1}
											/>
											<Slider
												label='Client ease adjustment'
												name='clientAdjustment'
												min={0}
												max={20}
												defaultValue={2}
												suffix='%'
												step={0.1}
											/>
											<Slider
												label='3'
												name='3'
												min={0}
												max={200}
												defaultValue={100}
												prefix='$'
											/>
											<Slider
												label='4'
												name='14'
												min={0}
												max={200}
												defaultValue={100}
												prefix='$'
											/>
										</div>
									</Form>
								</div>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</CardBody>
			</Card>
		</div>
	)
}

export default ProjectsPage
