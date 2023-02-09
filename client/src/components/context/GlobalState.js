import React, { createContext, useReducer, useEffect } from 'react';
import Axios from "axios";
import {AppReducer} from './AppReducer';

//initial state;
const initialState = {
    kurses: []
}

// create Context
export const GlobalContext = createContext(initialState);

// provider component;
export const GlobalProvider = (({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
        useEffect(() => {
            Axios.get("http://localhost:3004/read").then((response) => {
                dispatch({type: 'INITIAL_DATA', payload: response.data})
            });
        }, []);

    //actions
    const removeKurs = (id) => {
        dispatch({
            type: 'REMOVE_KURS',
            payload: id
        })

    }

    const addKurs = (kurs) => {
        dispatch({
            type: 'ADD_KURS',
            payload: kurs
        })

        setTimeout(() => {
            Axios.get("http://localhost:3004/read").then((response) => {
                dispatch({type: 'INITIAL_DATA', payload: response.data})
            });  
        },500)
    }

    const editKurs = (kurs) => {
        dispatch({
            type: 'EDIT_KURS',
            payload: kurs,
        })
    }
     
    return(
        <GlobalContext.Provider value={{
            kurses: state.kurses,
            removeKurs,
            addKurs,
            editKurs,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}) ;