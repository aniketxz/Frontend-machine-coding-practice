import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [data, setData] = useState(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [pageData, setPageData] = useState()
	const [next, setNext] = useState(1)
	const [prev, setPrev] = useState(0)
	const [pages, setPages] = useState()

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(
				'https://68c51eb7a712aaca2b67e5e5.mockapi.io/vendors/api/v1/vendors'
			)
			setData(await data.json())
		}

		fetchData()
		if (data) {
			const numberOfPages = data.length / 10
			setPages(numberOfPages)
		}
	}, [])

	useEffect(() => {
		setPageData(data.slice(10))
	}, [next])

	return (
		<>
			<div>
				{pageData &&
					pageData.map((item) => <div key={item.id}>{item.name}</div>)}
				<button onClick={() => setNext((prev) => prev + 1)}>next</button>
				<button>prev</button>
			</div>
		</>
	)
}

export default App
