import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {    
          //action.payload can either be a single task or an array of tasks. if an array, then replace entire state array with the new array.
          //task object data passed to action parameter. Then added to tasks[] with action.payload
          if (Array.isArray(action.payload)) {
            state.tasks = action.payload;  // If it's an array, replace tasks - this is the bulk way. replaces entire array
        } else {
          //this was what it was before adding single tasks
            state.tasks.push(action.payload);  
        }
        },
        //also uses task id
        //if you run into .find is not a function - do state.tasks.find the problem is again u cant array function on an object of state.find.
        updateTask: (state, action) => {
          const task = state.tasks.find((task) => task.id === action.payload); // `action.payload` will now be the id

          if (task) {
              // Toggle task status between "incomplete" and "complete"
              task.status = task.status === "incomplete" ? "complete" : "incomplete";
          }
            
        },

        updateText: (state, action) => {
          //destructure to get both text and id
          const { id, updatedTaskText } = action.payload;
          const taskIndex = state.tasks.findIndex((task) => task.id === id);
          if (taskIndex !== -1) {
            // Update the task text
            state.tasks[taskIndex].task = updatedTaskText;
        }
        },
        //uses id value to delete. so when addTask for table u must have id column secretly in there.
        deleteTask: (state, action) => {
          state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        
        clearTasks:(state) =>{
            state.tasks = [];
        }
      },
})

export const { addTask, updateTask, deleteTask, clearTasks, updateText} = taskSlice.actions;
export default taskSlice.reducer;