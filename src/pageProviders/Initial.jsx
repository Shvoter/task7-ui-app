import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import PageContainer from 'components/PageContainer';
import InitialPage from 'pages/Initial';

const Initial = () => (
    <PageAccessValidator>
        <PageContainer>
            <InitialPage/>
        </PageContainer>
    </PageAccessValidator>
);

export default Initial;
