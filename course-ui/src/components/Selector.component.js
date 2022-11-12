import {useDispatch} from "react-redux";
import { IconNames } from '@blueprintjs/icons'
import {Select} from "@blueprintjs/select";
import {Button, MenuItem, NumericInput, Toast, Toaster} from "@blueprintjs/core";
import {useState} from "react";
import {
    clearLastResult,
    getPollard,
    getShor,
    getShor15,
    getSimple,
    saveImportedData
} from "../store/algorithms.reducer";
import './Selector.css'
import {QUANTUM_WORLD_CONFIG} from "../utils/saveFile";
import {FileUploadComponent} from "./FileUpload.component";

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

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleImport = (data) => {
        const importedData = JSON.parse(data)
        dispatch(saveImportedData(importedData))
        setSuccess('Дані з файлу успішно завантажено')
    }

    const handleImportError = (error) => {
        setError(error)
    }

    const handleToastDissmis = () => {
        setError('')
        setSuccess('')
    }


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
            {(error || success) && <Toaster
                position="top"
                usePortal={false}
            >
                { error && <Toast
                    intent="danger"
                    message={`Cталася помилка під час прочитання файлу: ${error}`}
                    onDismiss={handleToastDissmis}
                />
                }
                { success && <Toast
                    intent="success"
                    message={`${success}`}
                    onDismiss={handleToastDissmis}
                />
                }
            </Toaster>}
            <div className="file-upload-container">
                <FileUploadComponent
                    icon="import"
                    onFulfilled={handleImport}
                    onError={handleImportError}
                    accept={ QUANTUM_WORLD_CONFIG.EXTENSION }
                    text="Завантажити файл"
                />
            </div>

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

                <div className="button-run">
                    <Button
                        intent="success"
                        text="Запустити"
                        onClick={handleAlgoRun}
                    />
                </div>
            </div>
        </>
    )
}
