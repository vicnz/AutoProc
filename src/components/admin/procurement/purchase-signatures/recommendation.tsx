"use client";
//
import fullname from "@lib/client/fullname";
import { CSSProperties, memo, useMemo } from "react";

//types
interface RecommendationProps {
    officers: any[];
    enduser?: {
        name: string;
        department: string;
    };
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
    width: "auto",
};
//
const Recommendation = function (props: RecommendationProps) {
    //
    const signatureBlockItems = useMemo(() => {
        const renderedusers = [
            //BAC MEMBERS
            ...props.officers
                .filter((item) => item.position === "MEMBER")
                .map((item) => {
                    return {
                        name: fullname(
                            {
                                fname: item.fname,
                                mname: item.mname,
                                lname: item.lname,
                                suffix: item.suffix,
                            },
                            true
                        ),
                        department: `${item.title}`,
                        label: "Reviewed",
                    };
                }),
            //END USER
            props.enduser && {
                name: props.enduser.name,
                department: props.enduser.department,
                label: "Prepared",
            },
            //VICE CHAIRMAN
            ...props.officers
                .filter((item) => item.position === "VICE")
                .map((item) => {
                    return {
                        name: fullname(
                            {
                                fname: item.fname,
                                mname: item.mname,
                                lname: item.lname,
                                suffix: item.suffix,
                            },
                            true
                        ),
                        department: `${item.title}`,
                        label: "Reviewed",
                    };
                }),
            //CHAIRMAN
            ...props.officers
                .filter((item) => item.position === "CHAIR")
                .map((item) => {
                    return {
                        name: fullname(
                            {
                                fname: item.fname,
                                mname: item.mname,
                                lname: item.lname,
                                suffix: item.suffix,
                            },
                            true
                        ),
                        department: `${item.title}`,
                        label: "Approved",
                    };
                }),
        ];

        return renderedusers;
    }, [props.officers, props.enduser]);
    //
    return (
        <>
            <div style={WrapperStyles}>
                {signatureBlockItems.map((item) => {
                    return (
                        <div key={item?.name} style={{ flex: "1 1 200px", margin: "0px 5px", textAlign: "center" }}>
                            <br />
                            <br />
                            <div style={SignatureBlockItem}>{item?.name}</div>
                            <span style={{ textTransform: "capitalize", fontSize: ".9em" }}>{item?.department}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default memo(Recommendation);
