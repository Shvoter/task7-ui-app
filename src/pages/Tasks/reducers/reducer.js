import {
    REQUEST_TASKS,
    RECEIVE_TASKS,
    ERROR_RECEIVE_TASKS,
    REQUEST_DELETE_TASK,
    DELETE_TASK,
    ERROR_DELETE_TASK,
} from '../constants/actionTypes';

const initialState = {
    isLoading: false,
    isError: false,
    list: []
}

export default (state = initialState, action) => {

    switch (action.type) {
        case REQUEST_TASKS || REQUEST_DELETE_TASK: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case RECEIVE_TASKS: {
            const {
                tasks,
            } = action;
            return {
                ...state,
                isLoading: false,
                list: tasks,
            };
        }

        case DELETE_TASK: {
            return {
                ...state,
                isLoading: false
            }
        }

        case ERROR_RECEIVE_TASKS || ERROR_DELETE_TASK: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        default: return state;
    }
}