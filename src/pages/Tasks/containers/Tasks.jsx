import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAccessValidate from "../../../hooks/useAccessValidate";
import Typography from 'components/Typography';
import Link from 'components/Link';
import { fetchTasks, fetchDeleteTask } from "../actions/tasks";
import { AUTHORITIES } from '../constants/neededAuthorities'
import {makeStyles} from "@material-ui/core/styles";
import * as PAGES from 'constants/pages';

const getClasses = makeStyles(() => ({
    hiddenButton: {
        display: "none"
    },
    row: {
        height: '65px',
        '&:hover': {
            color: 'grey',
            '& button': {
                display: 'block',
            },
        },
    },
}));

function Tasks({ authorities }) {

    const [state, setState] = useState({
        isActualTasksData: false,
    });

    const {
        isLoading,
        isError,
        list,
    } = useSelector(({ reducer }) => reducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!state.isActualTasksData) {
            dispatch(fetchTasks())
                .then(() =>
                    setState(prevState => ({
                        ...prevState,
                        isActualTasksData: true,
                    })));
        }
    }, [state.isActualTasksData]);

    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: AUTHORITIES,
    });

    const clickDeleteHandler = useCallback((id) => {
        dispatch(fetchDeleteTask(id))
            .then(() => setState({
                ...state,
                isActualTasksData: false
            }))
    }, []);

    const classes = getClasses();

    return (
        <div>
            {canSeeList && (
                <div>
                    {!isLoading && state.isActualTasksData && (
                        <div>
                            <table>
                                <thead>
                                <tr>
                                    <th><Typography>id</Typography></th>
                                    <th><Typography>title</Typography></th>
                                    <th><Typography>state</Typography></th>
                                    <th><Typography>priority</Typography></th>
                                    <th><Typography>updatedAt</Typography></th>
                                </tr>
                                </thead>
                                <tbody>
                                {list.map((task) => (
                                    <tr key={task.id} className={classes.row}>
                                        <td><Typography>{task.id}</Typography></td>
                                        <td><Typography>{task.title}</Typography></td>
                                        <td><Typography>{task.state}</Typography></td>
                                        <td><Typography>{task.priority}</Typography></td>
                                        <td><Typography>{task.updatedAt}</Typography></td>
                                        <td>
                                            <button
                                                className={classes.hiddenButton}
                                                onClick={() => clickDeleteHandler(task.id)}
                                            >
                                                <Typography>Delete</Typography>
                                            </button>
                                            <Link
                                                to={(location => ({
                                                    ...location,
                                                    pathname:`/${PAGES.ACTION_WITH_TASK}`,
                                                    search: `${location.search}&id=${task.id}`
                                                }))}>
                                                <button
                                                    className={classes.hiddenButton}
                                                >
                                                    <Typography>Update</Typography>
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Link
                                to={(location => ({
                                    ...location,
                                    pathname:`/${PAGES.ACTION_WITH_TASK}`,
                                    search: `${location.search}`
                                }))}>
                                <button
                                >
                                    <Typography>Create</Typography>
                                </button>
                            </Link>
                        </div>
                    )}
                    {(isLoading || !state.isActualTasksData) && (
                    <div>
                        <Typography>Загрузка...</Typography>
                    </div>
                    )}
                    {isError && (
                        <div>
                            <Typography>Error</Typography>
                        </div>
                    )}
                </div>
            )}
            {!canSeeList && (
                <div>
                    <Typography>Нет доступа</Typography>
                </div>
            )}
        </div>
    );
}

export default Tasks;