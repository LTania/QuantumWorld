import {AlgorithmsSlice} from "./algorithms.reducer";
import {configureStore} from '@reduxjs/toolkit'

const  store = configureStore({
    reducer: {
        algorithms: AlgorithmsSlice.reducer
    }
})
export default store
