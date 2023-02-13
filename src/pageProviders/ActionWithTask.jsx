import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import PageContainer from 'components/PageContainer';
import ActionWithTaskPage from "../pages/ActionWithTask";

function ActionWithTask() {
    return (
        <PageAccessValidator>
            <PageContainer>
                <ActionWithTaskPage/>
            </PageContainer>
        </PageAccessValidator>
    )
}

export default ActionWithTask;