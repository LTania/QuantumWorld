import {useDispatch} from "react-redux";
import { IconNames } from '@blueprintjs/icons'
import {Select} from "@blueprintjs/select";
import {Button, MenuItem, NumericInput} from "@blueprintjs/core";
import {useState} from "react";
import {clearLastResult, getPollard, getShor, getShor15, getSimple} from "../store/algorithms.reducer";
import './Selector.css'

const items = [
    {id: 2, name: 'Класичні'},
    {id: 1, name: 'Квантові'}
    ]

const algoItems = {
    1: [
        {id: 3, name: 'Алгоритм Шора для 15'},
        {id: 4, name: 'Алгоритм Шора з Qiskit'}
    ],
    2: [
        {id: 5, name: 'Алгоритм решета Ератосфена'},
        {id: 6, name: 'Ро-алгортм Полларда'}
    ]
}
export const SelectorComponent = () => {
    const dispatch = useDispatch()
    const [algoType, setAlgoType] = useState(items[0])
    const [specificAlgo, setSpecificAlgo] = useState(algoItems[algoType.id][0])
    const [factor, setFactor] = useState(15)

    const handleAlgoRun = () => {
        dispatch(clearLastResult())
        switch (specificAlgo.id){
            case 3: {
                return dispatch(getShor15())
            }
            case 4: {
                return dispatch(getShor(factor))
            }
            case 5: {
                return dispatch(getSimple(factor))
            }
            case 6: {
                return dispatch(getPollard(factor))
            }
        }
    }

    const handleItemSelection = (id) => {
        let newItem  = items.find((item)=> item.id === id)
        if (newItem) {
            setAlgoType(newItem)
            setSpecificAlgo(algoItems[newItem.id][0])
        } else {
            newItem = algoItems[algoType.id].find((item)=> item.id===id)
            setSpecificAlgo(newItem)
        }
    }

    const renderMenuItem = (item) => {
        return (
            <div
                key={item.name}
            >
                <MenuItem
                    text={item.name}
                    onClick={()=>handleItemSelection(item.id)}
                />
            </div>
        )
    }
    return (
        <>
            <div className="select-container">
                <div>
                    <h5>Оберіть тип алгоритму:</h5>
                    <Select
                        items={items}
                        filterable={false}
                        itemRenderer={renderMenuItem}
                        onItemSelect={handleItemSelection}
                    >
                        <Button
                            text={`${algoType.name}`}
                            rightIcon={IconNames.CaretDown}
                        />
                    </Select>
                </div>

                <div>
                    <h5>Оберіть алгоритм:</h5>
                    <Select
                        items={algoItems[algoType.id]}
                        filterable={false}
                        itemRenderer={renderMenuItem}
                        onItemSelect={handleItemSelection}
                    >
                        <Button
                            text={`${specificAlgo.name}`}
                            rightIcon={IconNames.CaretDown}
                        />
                    </Select>
                </div>

                <div>
                    <h5>Введіть число:</h5>
                    <NumericInput
                        value={factor}
                        onValueChange={setFactor}
                    />
                </div>
            </div>

            <Button
                intent="success"
                text="Запустити"
                onClick={handleAlgoRun}
            />
        </>
    )
}
