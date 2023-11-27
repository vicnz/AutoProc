import ScrollView from "@components/scrollview";
function PrLayout(props: any) {
    return <ScrollView height={"calc(100vh - 122px)"}>{props.children}</ScrollView>;
}

export default PrLayout;
