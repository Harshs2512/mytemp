import { configureStore } from '@reduxjs/toolkit';
import appSlice from 'store/appSlice';
import chatSlice from 'store/chatSlice';
import taskKanbanSlice from 'store/taskKanbanSlice';

// Added in v2.1.0
//import calendarSlice from 'store/calendarSlice'; 
import mailSlice from 'store/mailSlice';

export const store = configureStore({
  reducer: {
      app:appSlice,
      chat:chatSlice,
      kanban:taskKanbanSlice,
    //  calendar:calendarSlice,
      mail:mailSlice,
  },
})