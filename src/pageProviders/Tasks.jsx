import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import PageContainer from 'components/PageContainer';
import TasksPage from 'pages/Tasks';

function Tasks() {
    return (
        <PageAccessValidator>
            <PageContainer>
                <TasksPage/>
            </PageContainer>
        </PageAccessValidator>
    )
}

export default Tasks;