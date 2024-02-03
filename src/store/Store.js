import {configureStore} from '@reduxjs/toolkit'
import itemReducer from '../redux/ItemSlice'

export const store=configureStore({
    reducer:{
        itemShop:itemReducer
    }
})

