// ** Third Party Components
import Chart from 'react-apexcharts'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'

const ApexBarChart = ({ data, info, direction, title, type }) => {
  // ** Chart Options
  console.log(data)
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: type,
        barHeight: '30%',
        borderRadius: 8,
        borderRadiusApplication: 'end'
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: info,
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: data?.map((item) => item.name)
    },
    yaxis: {
      opposite: direction === 'ltr'
    }
  }

  // ** Chart Series
  const series = [
    {
      data: data?.map((item) => item.count)
    }
  ]

  return (
    <Card>
      <CardBody>
        <h4 className='card-title'>{title}</h4>
        <Chart options={options} series={series} type='bar' height={400} />
      </CardBody>
    </Card>
  )
}

export default ApexBarChart
