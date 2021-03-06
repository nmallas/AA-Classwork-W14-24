export const CREATE_TASK = `CREATE_TASK`;
export const DELETE_TASK = `DELETE_TASK`;
export const RESET_TASKS = `RESET_TASKS`;

// TODO: Define `createTask` action creator function
export const createTask = (taskMessage) => {
    return {
        type: CREATE_TASK,
        taskId: new Date().getTime(),
        taskMessage
    }
}
// TODO: Define `deleteTask` action creator function
export const deleteTask = (taskId) => {
    return {
        type: DELETE_TASK,
        taskId
    }
}

export const resetTaskList = () => {
    return {
        type: RESET_TASKS
    }
}
