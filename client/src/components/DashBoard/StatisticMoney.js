import './statistic.css';
import {Pie} from 'react-chartjs-2';
import {useState} from 'react';


function StatiscticMoney () {
    const [chartData,setChartData] = useState({
        labels:['Кол-ство потраченных денег','Кол-ство заработанных денег'],
        datasets:[
            {
                labals:'population',
                data:[1000,2500],
                backgroundColor:[
                    'rgba(255,99,132,0.6)',
                    'rgba(54,162,235,0.6)'
                ]
            }
        ]
    })

    return (
        <div className='wrapper_block'>
        <Pie 
        data={chartData}
        width={100}
        height={50}
        options={{
            maintainAspectRatio:false
        }}
        />    



        </div>
    )
}

export default StatiscticMoney;