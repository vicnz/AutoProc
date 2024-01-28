import React from 'react'

function Manual() {
    return (
        <>
            <iframe src='/docs/index.pdf#pagemode=bookmarks&page=3&scrollbar=0&toolbar=1&navpanes=1%statusbar=0' style={{
                width: '100%', height: 'calc(100vh - 56px)', background: 'transparent', border:
                    'none',
            }} />
        </>
    )
}

export default Manual