import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    shor: [],
    shor15: [],
    simple: [],
    pollard: [],
    last_result: {}
}

export const getShor = createAsyncThunk('algorithms/getShor',
    async (n) => {
       return fetch(`http://127.0.0.1:8095/shor?number=${n}`)
           .then((res) => res.json())
    })

export const getShor15 = createAsyncThunk('algorithms/getShor15',
    async () => {
        return fetch(`http://127.0.0.1:8095/shor15`)
            .then((res) => res.json())
    })

export  const getSimple = createAsyncThunk('algorithms/getSimple',
    async (n) => {
       return fetch(`http://127.0.0.1:8095/simple?number=${n}`)
           .then((res) => res.json())
    })

export  const getPollard = createAsyncThunk('algorithms/getPollard',
    async (n) => {
       return fetch(`http://127.0.0.1:8095/pollard?number=${n}`)
           .then((res) => res.json())
    })

export const AlgorithmsSlice = createSlice({
    name: 'algorithms',
    initialState,
    reducers: {
        clear_last: (state, action) => {
            state.last_result ={}
        }
    },
    extraReducers: {
        [getShor.fulfilled]: (state, {payload}) => {
            state.shor.push(payload?.time)
            state.last_result = payload
        },
        [getShor15.fulfilled]: (state, {payload}) => {
            state.shor15.push(payload?.time)
            state.last_result = payload
        },
        [getSimple.fulfilled]: (state, {payload}) => {
            state.simple.push(payload?.time)
            state.last_result = payload
        },
        [getPollard.fulfilled]: (state, {payload}) => {
            state.pollard.push(payload?.time)
            state.last_result = payload
        }
    }
}
)

export const clearLastResult = AlgorithmsSlice.actions.clear_last
