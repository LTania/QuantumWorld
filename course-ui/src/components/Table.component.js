import {HTMLTable} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import {getAllRunsToSaveSelector} from "../store/algorithms.selector";
import {useMemo} from "react";
import './Table.css';

const getNameByType = (type) => {
    let name = ''
    switch (type) {
        case 'pollard':
            name = 'Поллард'
            break
        case 'eratosfen':
            name = 'Ератосфен'
            break
        case 'shor':
            name = 'Шора'
            break
        case 'shor15':
            name = 'Шора 15'
            break
    }
    return name
}

export const TableComponent = () => {
    const data = useSelector(getAllRunsToSaveSelector)
    const dataArr = useMemo(()=>{
        return Object.entries(data).flatMap(([key, value])=>{
            const name = getNameByType(key)
            return value.map(({time,res, num}, index) => ({
                    number: index+1,
                    num,
                    name,
                    time: time.toFixed(3),
                    res
                }))
        })
    },[data])

    const renderResult = (num, index, name) => {
        return (
            <span className="res" key={`${num}.${index}.${name}`}>
                { num }
                <span className="comma">, </span>
            </span>
        )
    }

    const renderRow = ({number,name,time,res,num}) => {
        return (
            <tr>
                <td>{number}</td>
                <td>{name}</td>
                <td>{num}</td>
                <td>{res.map((n, index)=>renderResult(n,index, name))}</td>
                <td>{time}</td>
            </tr>
        )
    }

    return (
        <div className="table-container">
            {dataArr.length ? <HTMLTable className="table-res">
                <thead>
                <tr>
                    <th>Номер</th>
                    <th>Алгоритм</th>
                    <th>Число</th>
                    <th>Результати</th>
                    <th>Час</th>
                </tr>
                </thead>
                <tbody>
                {dataArr.map(renderRow)}
                </tbody>
            </HTMLTable> : null}
        </div>
    )
}
