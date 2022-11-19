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
            return value.map(({time,res}, index) => ({
                    number: index+1,
                    name,
                    time,
                    res
                }))
        })
    },[data])

    const renderResult = (num) => {
        return (
            <span>
                { num }
                <span>, </span>
            </span>
        )
    }

    const renderRow = ({number,name,time,res}) => {
        return (
            <tr>
                <td>{number}</td>
                <td>{name}</td>
                <td>{time}</td>
                <td>{res.map(renderResult)}</td>
                <td></td>
            </tr>
        )
    }

    return (
        <div className="table-container">
            <HTMLTable className="table-res">
                <thead>
                <tr>
                    <th>Номер</th>
                    <th>Алгоритм</th>
                    <th>Час</th>
                    <th>Результати</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {dataArr.map(renderRow)}
                </tbody>
            </HTMLTable>
        </div>
    )
}
