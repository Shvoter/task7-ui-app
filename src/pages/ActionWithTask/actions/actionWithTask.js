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
} from "../constants/actionTypes";
import config from "../../../config";
import {
    getJson,
    postJson,
    putJson,
} from "../../../requests";

const receiveTask = task => (
    {
        type: RECEIVE_TASK,
        task,
    }
);

const simpleTypeAction = (type) => (
    {
        type: type
    }
);

const getTask = (id) => {
    const {
        BASE_URL,
    } = config;

    return getJson({
        params: {
            id: id
        },
        url: `${BASE_URL}/task`,
    });
};

const updateTask = (task) => {
    const {
        BASE_URL,
    } = config;

    return putJson({
        body: {
                title: task.title,
                state: task.state,
                priority: task.priority,
        },
        params: {
            id: task.id
        },
        url: `${BASE_URL}/task`,
    });
};

const createTask = (task) => {
    const {
        BASE_URL,
    } = config;

    return postJson({
        body: {
            title: task.title,
            state: task.state,
            priority: task.priority,
        },
        url: `${BASE_URL}/task`,
    });
};


export const fetchTask = (id) => (dispatch) => {
    dispatch(simpleTypeAction(REQUEST_TASK));
    return getTask(id)
        .then(task => dispatch(receiveTask(task)))
        .catch(() => dispatch(simpleTypeAction(ERROR_RECEIVE_TASK)));
};

export const fetchUpdateTask = (task) => (dispatch) => {
    dispatch(simpleTypeAction(REQUEST_UPDATE_TASK));
    return updateTask(task)
        .then(() => dispatch(simpleTypeAction(UPDATE_TASK)))
        .catch(() => dispatch(simpleTypeAction(ERROR_UPDATE_TASK)));
};

export const fetchCreateTask = (task) => (dispatch) => {
    dispatch(simpleTypeAction(REQUEST_CREATE_TASK));
    return createTask(task)
        .then(() => dispatch(simpleTypeAction(CREATE_TASK)))
        .catch(() => dispatch(simpleTypeAction(ERROR_CREATE_TASK)));
};



