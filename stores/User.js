import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'currentUser',
  initialState: {
    value: false,
  },
  reducers: {
    online: (state) => {
      state.value = true
    },
    offline: (state) => {
      state.value = false
    }
  },
})

export const { online, offline } = userSlice.actions

export default userSlice.reducer