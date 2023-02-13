import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import useAccessValidate from "../../../hooks/useAccessValidate";
import Typography from 'components/Typography';
import Link from 'components/Link';
import {
    AUTHORITIES
} from '../constants/neededAuthorities'
import {fetchTask} from "../actions/actionWithTask";

function ActionWithTask({ authorities, location }) {
    const id = new URLSearchParams(useLocation().search).get('id');
    const isToUpdate = id !== null;
    const [state, setState] = useState({
        isActualTasksData: false,
    });

    let {
        isLoading,
        isError,
        task,
    } = useSelector(({ reducer }) => reducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isToUpdate) {
            dispatch(fetchTask())
                .then(() =>
                    setState(prevState => ({
                        ...prevState,
                        isActualTasksData: true,
                    })));
        }
    }, []);

    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: AUTHORITIES,
    });

    return (
        <div>
            {/*{canSeeList && (
                <div>
                    {!isLoading && state.isActualTasksData && (
                        <div>
                            <form method={isToUpdate? 'PUT' : 'POST'} action={}>
                                <table>
                                    <tbody>
                                    {isToUpdate && (
                                        <tr>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    )}

                                    </tbody>
                                </table>
                            </form>
                        </div>
                    )}
                </div>
            )}*/}
            hello
        </div>
    )
}

export default ActionWithTask;