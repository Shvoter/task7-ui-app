import {
    REQUEST_TASK,
    RECEIVE_TASK,
    ERROR_RECEIVE_TASK,
    REQUEST_UPDATE_TASK,
    UPDATE_TASK,
    ERROR_UPDATE_TASK,
    REQUEST_CREATE_TASK,
    CREATE_TASK,
    ERROR_CREATE_TASK,
} from '../constants/actionTypes';

const initialState = {
    isLoading: false,
    isError: false,
    task: {}
}

export default (state = initialState, action) => {

    switch (action.type) {
        case REQUEST_TASK || REQUEST_UPDATE_TASK || REQUEST_CREATE_TASK: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case RECEIVE_TASK: {
            const {
                task,
            } = action;
            return {
                ...state,
                isLoading: false,
                task: task,
            };
        }

        case CREATE_TASK || UPDATE_TASK : {
            return {
                ...state,
                isLoading: false
            }
        }

        case ERROR_RECEIVE_TASK || ERROR_UPDATE_TASK || ERROR_CREATE_TASK: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        default: return state;
    }
}