import {ADD_USER,DELETE_USER,EDIT_USER} from './types';

export const addUser = user => {
    return {
        type:ADD_USER,
        payload:user
    }
}

export const deleteUser = obj => {
    return {
        type:DELETE_USER,
        payload:obj
    }
}

export const editProfiles = name => {
    console.log(name)
    return {
        type:EDIT_USER,
        payload:name
    }
}