import { useEffect, useState } from 'react'
import Pagination from './pagination/PaginationType2'
import './App.css'

interface Item {
	id: number
	name: string
}

function App2() {
	const [data, setData] = useState<Item[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setData(
			Array.from({ length: 10 }, (_, i) => ({
				id: i + 1,
				name: `Item ${i + 1}`,
			}))
		)
	}, [])

	function handlePageChange(pageNumber: number) {
		setLoading(true)
		console.log("page: ", pageNumber)
		setTimeout(() => {
			setLoading(false)
			setData(
				Array.from({ length: 10 }, (_, i) => ({
					id: (pageNumber - 1) * 10 + i + 1,
					name: `Item ${(pageNumber - 1) * 10 + i + 1}`,
				}))
			)
		}, 3000)
	}

	return (
		<div>
			<Pagination
				data={data}
				totalNumberOfPages={100}
				renderRow={function (item) {
					return (
						<div key={item.id}>
							{item.id}. {item.name}
						</div>
					)
				}}
				// rowPerPage={10}
				// className=''
				loading={loading}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}

export default App2

/*
  renderRow can be used to pass custom styling for each row of data
	className can be used to pass custom styling for the pagination block
*/
