import { configureStore } from '@reduxjs/toolkit'

import cosmeticReducer from './reducers/cosmeticReducer'
import userReducer from './reducers/userReducer';
// import ingredientReducer from './reducers/ingredientReducer'


const store = configureStore({
  reducer: {
    cosmetic: cosmeticReducer,
    user: userReducer,
    // ingredient: ingredientReducer,
  },
})

export default store;