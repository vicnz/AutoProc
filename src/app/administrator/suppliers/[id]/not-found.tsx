"use client";
import { Button, Result } from "antd";

import { useRouter } from "next/navigation";

function NotFound() {
    const router = useRouter();
    return (
        <Result
            title="Supplier Not Found"
            subTitle="Supplier Either Does Not Exists Yet or The Supplier was Removed"
            status="404"
            extra={
                <>
                    <Button type="dashed" onClick={() => router.back()}>
                        Return Back
                    </Button>
                </>
            }
        />
    );
}

export default NotFound;
