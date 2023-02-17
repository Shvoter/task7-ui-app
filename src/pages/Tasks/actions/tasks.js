import {
    REQUEST_TASKS,
    RECEIVE_TASKS,
    ERROR_RECEIVE_TASKS,
    REQUEST_DELETE_TASK,
    DELETE_TASK,
    ERROR_DELETE_TASK,
} from '../constants/actionTypes';
import config from "../../../config";
import {
    getJson,
    deleteJson,
} from "../../../requests";

const requestTasks = () => (
    {
        type: REQUEST_TASKS,
    }
);

const receiveTasks = tasks => (
    {
        type: RECEIVE_TASKS,
        tasks,
    }
);

const errorReceiveTasks = () => (
    {
        type: ERROR_RECEIVE_TASKS,
    }
);

const requestDeleteTask = () => (
    {
        type: REQUEST_DELETE_TASK,
    }
);

const deleteTask = () => (
    {
        type: DELETE_TASK,
    }
);

const errorDeleteTask = () => (
    {
        type: ERROR_DELETE_TASK,
    }
);

const getTasks = () => {
    const {
        BASE_URL,
    } = config;

    return getJson({
        url: `${BASE_URL}/tasks`,
    });
};

const removeTask = (id) => {
    const {
        BASE_URL,
    } = config;

    return deleteJson({
        params: {
            id: id
        },
        url: `${BASE_URL}/tasks`
    });
}

export const fetchTasks = () => (dispatch) => {
    dispatch(requestTasks());
    return getTasks()
        .then(tasks => dispatch(receiveTasks(tasks)))
        .catch(() => dispatch(errorReceiveTasks()));
};

export const fetchDeleteTask = (id) => (dispatch) => {
    dispatch(requestDeleteTask())
    return removeTask(id)
        .then(() => dispatch(deleteTask()))
        .catch(() => dispatch(errorDeleteTask()));
}

/*
const fetchDeleteTasks = ( id ) => (dispatch) => {

    dispatch(requestMathExamples());
    fetch('localhost:8080/math/examples?count=' + id)
        .then((response) => response.json())
        .then((mathExamples) => dispatch(receiveMathExamples(mathExamples)))
        .catch(() => dispatch(errorReceiveMathExamples()));
};

export default {
    fetchMathExamples,
}*/
