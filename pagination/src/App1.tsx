import { useEffect, useState } from 'react'
import Pagination from './pagination/PaginationType1'
import './App.css'

function App1() {
	const [data, setData] = useState([])

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(
				'https://68c51eb7a712aaca2b67e5e5.mockapi.io/vendors/api/v1/vendors'
			)
			const data = await res.json()
			setData(data)
		}

		getData()
	}, [])

	return (
		<div>
			<Pagination
				data={data}
				renderRow={function (item) {
					return (
						<div>
							{item.id}. {item.name}
						</div>
					)
				}}
				rowPerPage={10}
				className=''
			/>
		</div>
	)
}

export default App1

/*
  renderRow can be used to pass custom styling for each row of data
	className can be used to pass custom styling for the pagination block
*/
