// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button, Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const DataTablesBasic = ({getData, data}) => {

    const basicColumns = [
        {
            id: 'id',
            name: 'ID',
            sortable: true,
            selector: row => row.id
        },
        {
            name: 'Дата создания',
            selector: row => row.created_at
        },
        {
            name: 'Описание',
            sortable: true,
            selector: row => row.description
        },
        {
            name: 'Файл',
            selector: row => row.id,
            cell: row => {
                return (
                    <a href={`https://675c-188-0-169-150.eu.ngrok.io/${row.output_file.path}`} target="_blank">
                        <Button className='my-1'>Скачать {row.output_file.filename}</Button>
                    </a> 
                )
            }
        }
    ]
    console.log(data)
  return (
    <>
        <Card className='overflow-hidden'>
        <CardHeader>
            <CardTitle tag='h4'>Результаты по файлу {data[0]?.output_file.filename}</CardTitle>
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
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            />
        </div>
        </Card>
    </>
  )
}

export default DataTablesBasic
