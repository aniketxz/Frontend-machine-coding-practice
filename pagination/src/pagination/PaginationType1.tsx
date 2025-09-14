import { Fragment, useState } from 'react'

interface DataItem {
	category: string
	cost: number
	createdAt: Date
	currency: string
	id: string
	location: string
	name: string
}

interface PropTypes {
	data: DataItem[]
	renderRow: (item: DataItem) => React.ReactNode
	rowPerPage: number
	className?: string
}

const PAGE_SIZE = 10
const DEFAULT_PAGE = 1
const MAX_BUTTONS_TO_DISPLAY = 5

const Pagination: React.FC<PropTypes> = ({
	data,
	renderRow,
	rowPerPage = PAGE_SIZE,
	className = '',
}) => {
	const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
	const [pageSize, setPageSize] = useState(rowPerPage)

	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize

	const pageData = data.slice(startIndex, endIndex)

	const totalPages = Math.ceil(data.length / pageSize)

	// <---- Handling Page Number Buttons --->
	const pageNumberButtons = Array.from(
		{ length: totalPages },
		(_, index) => index + 1
	)

	const maxButtons = MAX_BUTTONS_TO_DISPLAY
	let buttonsStartIndex = currentPage - Math.floor(maxButtons / 2)
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

	return (
		<div className={`pagination space-y-2 ${className}`}>
			<div className='pagination-content'>
				{pageData.map((item) => (
					<Fragment key={item.id}>{renderRow(item)}</Fragment>
				))}
			</div>
			<div className='pagination-footer space-x-2'>
				<button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
					First
				</button>
				<button
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				{buttonsToDisplay.map((pageNumber) => (
					<button
						key={pageNumber}
						onClick={() => setCurrentPage(pageNumber)}
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
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
				<button
					onClick={() => setCurrentPage(totalPages)}
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
