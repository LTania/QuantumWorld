import {useSelector} from "react-redux";
import {getPollardSelector, getShor15Selector, getShorSelector, getSimpleSelector} from "../store/algorithms.selector";
import {LineChart, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";
import './Charts.css'

const generateChartData = (shor15, shor, simple, pollard) => {
    const maxLength = Math.max(shor15.length, shor.length, simple.length, pollard.length)
    const data = []
    for (let i = 0; i<maxLength; i++){
        const temp = {'name' : i+1}
        if (shor15[i] !== undefined) { temp['Шор 15'] = shor15[i]}
        if (shor[i] !== undefined ) { temp['Шор'] = shor[i]}
        if (simple[i] !== undefined) { temp['Решето Ератосфена'] = simple[i]}
        if (pollard[i] !== undefined) { temp['Поллард'] = pollard[i]}

        data.push(temp)
    }
    return data
}

export const ChartsComponent = () => {
    const shor15 = useSelector(getShor15Selector)
    const shor = useSelector(getShorSelector)
    const simple = useSelector(getSimpleSelector)
    const pollard = useSelector(getPollardSelector)

   const chartData = generateChartData(shor15, shor, simple, pollard)

    return (
        <div className='chart'>
            <LineChart width={730} height={250} data={chartData}
                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Шор 15" stroke="#972678" />
                <Line type="monotone" dataKey="Шор" stroke="#8884d8" />
                <Line type="monotone" dataKey="Решето Ератосфена" stroke="#eae000" />
                <Line type="monotone" dataKey="Поллард" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}
