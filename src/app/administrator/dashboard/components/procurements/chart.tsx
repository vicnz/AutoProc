import { Bar } from "react-chartjs-2";
import { randomRange } from "@lib/client/random-range"; //FOR TESTING

const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const demoData = new Array(12).fill(0).map((item) => randomRange(10, 500)); //@FOR TESTING

function Graph(props: { data: { count: number }[] }) {
    return (
        <Bar
            options={{
                responsive: true,
                aspectRatio: 2,
                scales: {
                    y: {
                        min: 0,
                        ticks: {
                            stepSize: 1,
                            format: {
                                notation: "compact",
                            },
                        },
                    },
                },
            }}
            data={{
                labels: Months,
                datasets: [
                    {
                        label: "Purchase Requests",
                        // data: props.data.map((item: { count: number }) => item?.count),
                        data: demoData, //TOGGLE THIS FOR TESTING
                        borderColor: "#C0252A",
                        backgroundColor: "#C0252A60",
                    },
                ],
            }}
            datasetIdKey="id"
        />
    );
}

export default Graph;
