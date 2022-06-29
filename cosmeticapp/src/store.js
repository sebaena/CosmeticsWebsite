import { configureStore } from '@reduxjs/toolkit'

import cosmeticReducer from './reducers/cosmeticReducer'
import ingredientReducer from './reducers/ingredientReducer'


const store = configureStore({
  reducer: {
    cosmetic: cosmeticReducer
    ingredient: ingredientReducer
  }
})

export default store