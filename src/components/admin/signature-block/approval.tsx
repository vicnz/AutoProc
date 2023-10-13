"use client";
//libs
import { memo, useMemo, CSSProperties } from "react";
//components
import fullname from "@/lib/fullname";
//types
type officer = {
    fname: string;
    mname?: string | null;
    lname: string;
    suffix?: string | null;
    position: string;
    title: string;
};
interface ApprovalProps {
    officers: officer[];
    enduser?: {
        name: string;
        department: string;
    };
    single?: boolean; //ONLY HEAD will be shown
}
//styles
const WrapperStyles: CSSProperties = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
};
const SignatureBlockItem: CSSProperties = {
    borderBottom: "solid lightgray 1px",
    fontWeight: "bold",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    width: "100%",
};

const Approval = function (props: ApprovalProps) {
    //
    const signatureBlockItems = useMemo(() => {
        let renderedusers = [];
        if (!props.single) {
            //ENDUSER
            renderedusers.push(
                props.enduser && {
                    name: props.enduser.name,
                    department: props.enduser.department,
                    label: "Prepared By",
                }
            );
            //COLLEGE PRESIDENT
            renderedusers.push(
                ...props.officers
                    .filter((item) => item.position === "HEAD")
                    .map((item) => {
                        return {
                            label: "Approved By",
                            name: fullname(
                                {
                                    fname: item.fname,
                                    mname: item.mname,
                                    lname: item.lname,
                                    suffix: item.suffix,
                                },
                                true
                            ),
                            department: item.title,
                        };
                    })
            );
        } else {
            //SHOW ONLY THE COLLEGE PRESIDENT
            renderedusers.push(
                ...props.officers
                    .filter((item) => item.position === "HEAD")
                    .map((item) => {
                        return {
                            label: "Approved By",
                            name: fullname(
                                {
                                    fname: item.fname,
                                    mname: item.mname,
                                    lname: item.lname,
                                    suffix: item.suffix,
                                },
                                true
                            ),
                            department: item.title,
                        };
                    })
            );
        }

        return renderedusers;
    }, [props.officers, props.enduser, props.single]);
    //
    return (
        <>
            <div style={WrapperStyles}>
                {signatureBlockItems.map((item) => {
                    return (
                        <div
                            key={item?.label}
                            style={{ flex: "1 1 200px", margin: 5, textAlign: "center" }}
                        >
                            <br />
                            <br />
                            <div style={SignatureBlockItem}>{item?.name}</div>
                            <span style={{ textTransform: "capitalize", fontSize: ".9em" }}>
                                {item?.department}
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default memo(Approval);
