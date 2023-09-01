
import { ContentWrapperHasHeader } from '../../_components/shared/content';
import Header from '../../_components/recordsview/headersection';
import RecordViewLayout from '../../_components/recordsview/layout';

const RecordItem = () => {
    return (
        <ContentWrapperHasHeader header={<Header title='Record Item No. 3453' />}>
            <RecordViewLayout />
        </ContentWrapperHasHeader>
    )
}

export default RecordItem;