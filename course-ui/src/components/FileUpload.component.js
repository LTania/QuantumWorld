import { useCallback, useRef } from 'react'
import { Button } from '@blueprintjs/core'
import './FileUpload.css'


export const FileUploadComponent = ({ onFileLoadStart, onError, onFulfilled, accept, icon, text }) => {
    const fileUploadRef = useRef(null)

    const openFileUpload = () => {
        fileUploadRef.current.click()
    }

    const fileName = useRef('')

    const handleFileUpload = useCallback((fileInputEvent) => {
        const reader = new FileReader()

        reader.onload = async(fileReaderEvent) => {
            try {
                const fileContent = fileReaderEvent.target.result
                onFulfilled?.(fileContent, fileName.current)
            } catch (e) {
                onError?.(e)
            } finally {
                //Clear cache after upload
                fileInputEvent.target.value = null
                fileName.current = ''
            }
        }

        const fileData = fileInputEvent.target.files[0]
        onFileLoadStart?.(fileData)
        reader.readAsText(fileData)
        fileName.current = fileData.name
    }, [onError, onFileLoadStart, onFulfilled])

    return (
        <Button
            text={ text }
            icon={ icon }
            onClick={ openFileUpload }
        >
            <input
                type="file"
                accept={ accept }
                onChange={ handleFileUpload }
                ref={ fileUploadRef }
                className={ 'file-input' }
            />
        </Button>
    )
}
