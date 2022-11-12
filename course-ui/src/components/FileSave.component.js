import {Button} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import {getAllRunsToSaveSelector} from "../store/algorithms.selector";
import {saveDataToFile} from "../utils/saveFile";
import './FileSave.css'

export const FileSaveComponent = () => {
    const dataToSave = useSelector(getAllRunsToSaveSelector)

    const handleSaveClick = () => {
        saveDataToFile(dataToSave)
    }

    return (
        <div className="file-save-container">
            <Button
                icon="export"
                text="Зберегти у файл"
                onClick={handleSaveClick}
            />
        </div>
    )
}
