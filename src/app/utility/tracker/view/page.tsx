import { notFound, redirect } from "next/navigation";
import { preload } from "./preload";
import Modal from "./modal";

async function ViewCurrentDocument(props: {
    params: any;
    searchParams: { token: string; office: string; timestamp: string };
}) {
    if (props.searchParams.token && props.searchParams.office && props.searchParams.timestamp) {
        const data = await preload(
            props.searchParams.token,
            props.searchParams?.office as string,
            props.searchParams?.timestamp as string
        );
        if (data?.error) {
            redirect("/utility/tracker"); //route back
        } else {
            return <Modal data={data?.tracking} number={data?.number as string} />;
        }
    } else {
        notFound();
    }
}

export default ViewCurrentDocument;
