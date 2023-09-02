
import { ContentWrapperHasHeader } from '@components/shared/content';
import Header from '@components/admin/recordview/header';
import RecordViewLayout from '@components/admin/recordview/layout';

const RecordItem = () => {
    return (
        <ContentWrapperHasHeader header={<Header title='Record Item No. 3453' />}>
            <RecordViewLayout />
        </ContentWrapperHasHeader>
    )
}

export default RecordItem;