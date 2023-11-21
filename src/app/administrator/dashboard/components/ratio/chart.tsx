import { randomRange } from "@lib/client/random-range";
import { memo, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

const demoData = new Array(4).fill(0).map((item) => randomRange(10, 100)); //DEMO DATA

type PlotGraphProps = {
    data: Array<{ type: string; count: number }>;
};

function PlotGraph(props: PlotGraphProps) {
    const [labels, values] = useMemo(() => {
        const types = new Array();
        const counts = props.data.map((item) => {
            types.push(item?.type);
            return item?.count;
        });

        return [types, counts];
    }, [props]);
    const data = useMemo(() => props.data, [props]);
    return (
        <Doughnut
            options={{
                responsive: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        align: "center",
                        position: "left",
                    },
                },
            }}
            data={{
                labels: labels,
                datasets: [
                    {
                        label: "Procured Types",
                        // data: values,
                        data: demoData,
                    },
                ],
            }}
            datasetIdKey="id"
        />
    );
}

export default memo(PlotGraph);
