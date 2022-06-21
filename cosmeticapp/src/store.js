import { configureStore } from '@reduxjs/toolkit'

import cosmeticReducer from './reducers/cosmeticReducer'


const store = configureStore({
  reducer: {
    cosmetic: cosmeticReducer
  }
})

export default store