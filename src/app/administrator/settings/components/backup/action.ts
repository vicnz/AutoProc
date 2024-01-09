'use server';
import { generateBackup } from '@lib/backup'
import dayjs from 'dayjs';

export const backup = async (props: { label: string }) => {
    try {
        const currentTimestamp = dayjs().toISOString()
        const filePath = await generateBackup(currentTimestamp, props.label)
        return { ok: true, filePath }
    } catch (err) {
        return { error: true }
    }
}