'use client';

import { Flex, Input, Button, Alert, Tag, Form, InputRef, App } from 'antd'
import React, { PropsWithChildren, useCallback, useRef, useState } from 'react'
import { backup } from './action'
import { useConfirm } from '@components/password-confirm';

function Index(props: PropsWithChildren<{ userid: string }>) {
  const [label, setLabel] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { message, modal } = App.useApp()


  const onConfirmed = async (value: boolean) => {
    if (value === true) {
      await createUpdate()
    }
  };

  const { Component, trigger } = useConfirm(props.userid, "/administrator/api/utils/confirm-password", onConfirmed);

  const createUpdate = useCallback(async () => {

    const parsed = label.trim().replace(/[^0-9a-zA-Z]/g, "_").replace(/[- ~]/g, "_")
    const result = await backup({ label: parsed })
    if (result.error) {
      message.error("Failed to create backup, please try again...")
    } else {
      const filePath = result.filePath
      message.success("Created a backup a custom backup")
      modal.confirm({
        async onOk() {
          fetch(`/administrator/settings/api/backup?download=${encodeURIComponent(filePath?.filePath as string)}`)
            .then(response => response.blob())
            .then(blob => {
              var url = window.URL.createObjectURL(blob);
              var a = document.createElement('a');
              a.href = url;
              a.download = filePath?.fileName as string; // or any other extension
              a.style.display = 'none';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            })
            .catch(error => console.error(error));
        },
        async onCancel() {

        },
        title: "Download Backup File",
        content: (
          <>
            Download the backup file to your computer,
            <br />
            <br />
            <Alert
              message="Restore"
              type='error'
              description="If you want to restore the database from the downloaded backup, you must send the backup and request to the server admin for this permission."
            />
          </>
        )
      })
    }
  }, [label, message, modal])


  return (
    <>
      {Component}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 10 }}>
        <div>
          <strong>Create Backup</strong>
        </div>
        <div>
          <Input addonBefore="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
          <p>Create a Custom Backup, add a label to exclude it from the rest of the pregenerated backups</p>
          <Button block type='dashed' onClick={
            () => {
              if (label.length < 3 || label === "") {
                message.warning("Please specify a label for this backup")
                return;
              } else {
                trigger()
              }
            }
          }>Create Backup</Button>
        </div>
      </div>
      {/* <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 10 }}>
        <div>
          <strong>Scheduling</strong>
        </div>
        <div>
          <Input addonBefore="Every" disabled addonAfter="Day(s)" />
          <br />
          <br />
          <Alert
            type="error"
            message="Backup Schedule"
            description={
              <>
                <p>Customize Backup Schedule, Customization of backup scheduling is undergoing development and testing. By default the scheduling is set to <strong>(Every Sunday at 12:00 AM)</strong> which is assigned upon the deployment date.</p>
              </>
            }
          />
        </div>
      </div> */}
    </>
  )
}

export default Index