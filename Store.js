import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './stores/User'

export default configureStore({
  reducer: {
      currentUser: currentUserReducer
  },
})