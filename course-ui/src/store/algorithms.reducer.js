import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    own_shor: [],
    simple: []
}

export const getOwnShor = createAsyncThunk('algorithms/getOwnShor',
    async (n) => {
       return fetch(`http://127.0.0.1:8095/shor?number=${n}`)
           .then((res) => res.json())
    })

export const getSimple = createAsyncThunk('algorithms/getOwnShor',
    async (n) => {
       return fetch(`http://127.0.0.1:8095/simple?number=${n}`)
           .then((res) => res.json())
    })

export const AlgorithmsSlice = createSlice({
    name: 'algorithms',
    initialState,
    extraReducers: {
        [getOwnShor.fulfilled]: (state, {payload}) => {
            state.own_shor = payload
        },
        [getSimple.fulfilled]: (state, {payload}) => {
            state.simple = payload
        }
    }
}
)
