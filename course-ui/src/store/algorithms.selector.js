import {createSelector} from "@reduxjs/toolkit";

const getState = (state) => {
    return state.algorithms
}

export const getLastResult = createSelector(
    getState,
    (state) =>{
        return state?.last_result
    }
)


export const getShorSelector = createSelector(
    getState,
    (state) =>{
        return state?.shor?.map(({time}) => time ) ?? []
    }
)


export const getShor15Selector = createSelector(
    getState,
    (state) =>{
        return state?.shor15?.map(({time}) => time ) ?? []
    }
)


export const getSimpleSelector = createSelector(
    getState,
    (state) =>{
        return state?.simple?.map(({time}) => time ) ?? []
    }
)


export const getPollardSelector = createSelector(
    getState,
    (state) =>{
        return state?.pollard?.map(({time}) => time ) ?? []
    }
)
