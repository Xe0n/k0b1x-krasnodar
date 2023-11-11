// ** Third Party Components
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** heat chart data generator
function generateDataHeat(count, yrange) {
  let i = 0
  const series = []
  while (i < count) {
    const x = `w${(i + 1).toString()}`
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

    series.push({
      x,
      y
    })
    i++
  }
  return series
  
}

const ApexHeatmapChart = () => {
  // ** Chart Options
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      heatmap: {
        enableShades: false,

        colorScale: {
          ranges: [
            {
              from: 0,
              to: 20,
              name: '0-20',
              color: '#fa771f'
            },
            {
              from: 21,
              to: 40,
              name: '20-40',
              color: '#e86922'
            },
            {
              from: 41,
              to: 60,
              name: '40-60',
              color: '#d15623'
            },
            {
              from: 71,
              to: 90,
              name: '71-90',
              color: '#9c312d'
            },
            {
              from: 91,
              to: 95,
              name: '90-95',
              color: '#8f2731'
            },
            {
                from: 96,
                to: 100,
                name: '95-100',
                color: '#8f2731'
              }
          ]
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom'
    },
    grid: {
      padding: {
        top: -20
      }
    },

    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    }
  }
  console.log(options)
  // ** Chart Series
  const series = [
    {
      name: 'ВОСКР',
      data: generateDataHeat(24, {
        min: 0,
        max: 60
      })
    },
    {
      name: 'СУБ',
      data: generateDataHeat(24, {
        min: 0,
        max: 60
      })
    },
    {
      name: 'ПЯТ',
      data: generateDataHeat(24, {
        min: 0,
        max: 60
      })
    },
    {
      name: 'ЧТВ',
      data: generateDataHeat(24, {
        min: 0,
        max: 60
      })
    },
    {
      name: 'СРЕДА',
      data: generateDataHeat(24, {
        min: 0,
        max: 60
      })
    },
    {
      name: 'ВТОР',
      data: generateDataHeat(24, {
        min: 0,
        max: 60
      })
    },
    {
      name: 'ПНД',
      data: generateDataHeat(24, {
        min: 0,
        max: 60
      })
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Загруженность маршрутов по дням</CardTitle>
      </CardHeader>
      <CardBody className='apex-charts-heatmap'>
        <Chart options={options} series={series} type='heatmap' height={350} />
      </CardBody>
    </Card>
  )
}

export default ApexHeatmapChart
