// ** Third Party Components
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const ApexRadialbar = ({data, title}) => {
  const donutColors = {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1'
  }

  // ** Chart Options
  const options = {
    colors: [donutColors.series1, donutColors.series2, donutColors.series4],
    plotOptions: {
      radialBar: {
        size: 185,
        hollow: {
          size: '25%'
        },
        track: {
          margin: 15
        },
        dataLabels: {
          name: {
            fontSize: '1rem',
            fontFamily: 'Montserrat'
          },
          value: {
            fontSize: '1rem',
            fontFamily: 'Montserrat'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30
      }
    },
    legend: {
      show: true,
      position: 'bottom'
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Минимальная', 'AVG', 'Максимальная']
  }
  console.log(data)
  return (
    <Card>
      <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
        <CardTitle tag='h4'>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        
        <Chart options={options} series={data?.map(item => Math.round(item))} type='radialBar' height={350} />
      </CardBody>
    </Card>
  )
}

export default ApexRadialbar
