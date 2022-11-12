import { saveAs } from 'file-saver'

const QUANTUM_WORLD_CONFIG = {
    type: 'application/json',
    EXTENSION: '.qw_lnu'
}

export const saveDataToFile = (data) => {
    const date = new Date()
    const fileName = `${date.toISOString().split('T')[0]}${QUANTUM_WORLD_CONFIG.EXTENSION}`

    const content = JSON.stringify(data, undefined, 2)
    const fileToSave = new Blob([content], {type: QUANTUM_WORLD_CONFIG.type})
    saveAs(fileToSave, fileName)
}
