import React from 'react'
import OpenModal from './components/open-modal'

function Administrator(props: { params: { param: string } }) {
    console.log(props.params.param)
    return (
        <OpenModal title={'Default'}>
            Lorem {props.params.param}
        </OpenModal>
    )
}

export default Administrator