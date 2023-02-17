import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useAccessValidate from "../../../hooks/useAccessValidate";
import {
    AUTHORITIES
} from '../constants/neededAuthorities'
import {fetchCreateTask, fetchTask, fetchUpdateTask} from "../actions/actionWithTask";
import {TASKS} from "../../../constants/pages"
import useChangePage from "../../../hooks/useChangePage";
import useLocationSearch from "../../../hooks/useLocationSearch";
import Typography from "../../../components/Typography";




function ActionWithTask({ authorities }) {
    const locationSearch = useLocationSearch();
    const changePage = useChangePage();

    const requestId = locationSearch.id;
    const isToUpdate = requestId !== undefined;

    const [isActualTasksData, setIsActualTasksData] = useState(false);
    const [title, setTitle] = useState('');
    const [state, setState] = useState('');
    const [priority, setPriority] = useState('');

    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: AUTHORITIES,
    });

    const dispatch = useDispatch();
    const {
        isLoading,
        isError,
        task,
    } = useSelector(({ reducer }) => reducer);


    useEffect(() => {
        if (isActualTasksData) {
            setState(task.state);
            setPriority(task.priority);
            setTitle(task.title);
        }
    }, [task])

    useEffect(() => {
        if (isToUpdate) {
            dispatch(fetchTask(requestId))
        }
        setIsActualTasksData(true)
    }, []);



    const submitHandler = ( e ) => {
        e.preventDefault()

        const taskInfo = {
            title: title,
            state: state,
            priority: priority,
        }

        if (isToUpdate) {
            taskInfo.id = requestId;
            dispatch(fetchUpdateTask(taskInfo))
        } else {
            dispatch(fetchCreateTask(taskInfo))
        }

        delete locationSearch.id;
        changePage({
            locationSearch: locationSearch.redirectLocationSearch
                ? JSON.parse(locationSearch.redirectLocationSearch)
                : locationSearch,
            path: locationSearch.redirectPathname || `/${TASKS}`,
        });
    }

    return (
        <div>
            {canSeeList && (
                <div>
                    {!isLoading && isActualTasksData && (
                        <div>
                            <form
                                onSubmit={submitHandler}
                            >
                                    <div>
                                        {isToUpdate && (
                                            <input
                                            type="text"
                                            value={requestId}
                                            placeholder="Id"
                                            readOnly
                                            />
                                            )}
                                        <input
                                            type="text"
                                            defaultValue={title}
                                            placeholder="Title"
                                            onChange={(e) => setTitle(
                                                e.target.value
                                            )}
                                        />
                                        <input
                                            type="text"
                                            defaultValue={state}
                                            placeholder="State"
                                            onChange={(e) => setState(
                                                e.target.value
                                            )}
                                        />
                                        <input
                                            type="text"
                                            defaultValue={priority}
                                            placeholder="Priority"
                                            onChange={(e) => setPriority(
                                                e.target.value
                                            )}
                                        />
                                        <button
                                            type="submit"
                                        >
                                            {isToUpdate? 'Update' : 'Create'}
                                        </button>
                                    </div>
                            </form>
                        </div>
                    )}
                    {(isLoading || !isActualTasksData) && (
                        <div>
                            <Typography>Loading...</Typography>
                        </div>
                    )}
                    {isError && (
                        <div>
                            <Typography>Error!!!</Typography>
                        </div>
                    )}
                </div>
            )}

            {!canSeeList && (
                <div>
                    <Typography>No access</Typography>
                </div>
            )}
        </div>
    )
}

export default ActionWithTask;