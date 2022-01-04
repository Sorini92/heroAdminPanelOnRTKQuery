import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import { filtersApiSlice } from '../api/filtersApiSlice';
import { heroesApiSlice } from '../api/heroesApiSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};
        
const store = configureStore({
    reducer: { filters,
                [filtersApiSlice.reducerPath]: filtersApiSlice.reducer, 
                [heroesApiSlice.reducerPath]: heroesApiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, heroesApiSlice.middleware, filtersApiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production', 
})

export default store;