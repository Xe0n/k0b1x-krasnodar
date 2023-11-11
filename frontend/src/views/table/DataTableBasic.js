import { useState, useEffect } from 'react'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

// ** Reactstrap Imports
import { Button, Card, CardHeader, CardTitle } from 'reactstrap'
const data = [{
    id: 1,
    name: 'video 2023 набержная',
    date: '2022-03-12',
    status: 'Готово'
}]

const DataTablesBasic = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const basicColumns = [
        {
            id: 'id',
            name: 'ID',
            width: '90px',
            sortable: true,
            selector: row => row.id
        },
        {
            id: 'id',
            name: 'Название',
            sortable: true,
            selector: row => row.name
        },
        {
            name: 'Дата загрузки',
            sortable: true,
            selector: row => row.date
        },
        {
            name: 'Статус',
            sortable: true,
            selector: row => row.status
        },
        {
            name: 'Действие',
            selector: row => row.id,
            cell: row => {
                return (
                    <>
                    <Link to={`/analyse/${row.id}`}>
                        <Button className='my-1'>Открыть результаты</Button>
                    </Link>    
                    </> 
                )}
        }
    ]
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }
      // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )
  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <CardTitle tag='h4'>Предыдущие записи</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          pagination
          defaultSortFieldId="id"
          defaultSortAsc={false}
          data={data}
          columns={basicColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </Card>
  )
}

export default DataTablesBasic
