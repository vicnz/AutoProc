import PocketBase, { FileQueryParams, Record } from "pocketbase";

const HOST = process.env.NEXT_PUBLIC_PB_URL
const PB_URL = process.env.NEXT_PUBLIC_PB_URL_API || '/api/'

export const pb_client = new PocketBase(HOST);
export type PB_CLIENT = typeof pb_client;


export function getPBImageUrl(
    record: Pick<Record, "id" | "collectionId" | "collectionName">,
    filename: string,
    queryParams?: FileQueryParams | undefined
) {
    return pb_client.files.getUrl(record, filename, queryParams);
}

export const makeImageUrl = (
    coll_name: string,
    record_id: string,
    media_name: string
) => {
    if (media_name) {
        return `${PB_URL}/api/files/${coll_name}/${record_id}/${media_name}`;
    }
    return;
};
