import { useState } from 'react'

interface PropTypes<T> {
	data: T[]
	renderRow: (item: T) => React.ReactNode
	totalNumberOfPages: number | null
	rowPerPage?: number
	className?: string
	onPageChange?: (pageNumber: number) => void
	loading?: boolean
}

const PAGE_SIZE = 10
const DEFAULT_PAGE = 1
const MAX_BUTTONS_TO_DISPLAY = 5

const Pagination = <T,>({
	data,
	renderRow,
	totalNumberOfPages = null,
	rowPerPage = PAGE_SIZE,
	className = '',
	onPageChange = () => {},
	loading = true,
}: PropTypes<T>): React.ReactElement => {
	const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
	const [pageSize, setPageSize] = useState(rowPerPage)

	const startIndex = totalNumberOfPages ? 0 : (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize

	const pageData = data.slice(startIndex, endIndex)
	console.log(pageData)
	const totalPages = totalNumberOfPages ?? Math.ceil(data.length / pageSize)

	// <---- Handling Page Number Buttons --->
	const pageNumberButtons = Array.from(
		{ length: totalPages },
		(_, index) => index + 1
	)

	const maxButtons = MAX_BUTTONS_TO_DISPLAY
	let buttonsStartIndex = totalNumberOfPages
		? 0
		: currentPage - 1 - Math.floor(maxButtons / 2)
	let buttonsEndIndex = currentPage + Math.floor(maxButtons / 2)

	// Handle case where start index is less than 1
	if (buttonsStartIndex < 1) {
		buttonsStartIndex = 1
		buttonsEndIndex = Math.min(totalPages, maxButtons)
	}

	// Handle case where end index exceeds than totalPages
	if (buttonsEndIndex > totalPages) {
		buttonsEndIndex = totalPages
		buttonsStartIndex = Math.max(1, totalPages - maxButtons + 1)
	}

	// Get the buttons to display
	const buttonsToDisplay = pageNumberButtons.slice(
		buttonsStartIndex - 1,
		buttonsEndIndex
	)

	function handlePageChange(pageNumber: number) {
		setCurrentPage(pageNumber)
		onPageChange(pageNumber)
	}

	return (
		<div className={`pagination space-y-2 ${className}`}>
			{!loading &&
				// Pagination content
				pageData.map((item) => renderRow(item))}
			{loading && <div>Loading...</div>}
			<div className='pagination-footer space-x-2'>
				<button
					onClick={() => handlePageChange(1)}
					disabled={currentPage === 1}
				>
					First
				</button>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				{buttonsToDisplay.map((pageNumber) => (
					<button
						key={pageNumber}
						onClick={() => handlePageChange(pageNumber)}
						disabled={currentPage === pageNumber}
						style={{
							opacity: '1',
							backgroundColor: currentPage === pageNumber ? 'green' : '',
						}}
					>
						{pageNumber}
					</button>
				))}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
				<button
					onClick={() => handlePageChange(totalPages)}
					disabled={currentPage === totalPages}
				>
					Last
				</button>
			</div>
			<p>
				Page Size :
				<select onChange={(e) => setPageSize(Number(e.target.value))}>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={30}>30</option>
					<option value={40}>40</option>
					<option value={50}>50</option>
				</select>
			</p>
		</div>
	)
}

export default Pagination
