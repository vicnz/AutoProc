﻿"use client";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import Icon from "@ant-design/icons/lib/components/Icon";
//
const PesoSVG = () => {
    return (
        <svg viewBox="0 -4 48 48" width="1em" height="1em">
            <path
                d="M24 4C12.972066 4 4 12.972074 4 24C4 35.027926 12.972066 44 24 44C35.027934 44 44 35.027926 44 24C44 12.972074 35.027934 4 24 4 z M 24 7C33.406615 7 41 14.593391 41 24C41 33.406609 33.406615 41 24 41C14.593385 41 7 33.406609 7 24C7 14.593391 14.593385 7 24 7 z M 19.5 14 A 1.50015 1.50015 0 0 0 18 15.5L18 18.25L16.25 18.25 A 1.250125 1.250125 0 1 0 16.25 20.75L18 20.75L18 22.25L16.25 22.25 A 1.250125 1.250125 0 1 0 16.25 24.75L18 24.75L18 27.253906 A 1.50015 1.50015 0 0 0 18 27.740234L18 33.5 A 1.50015 1.50015 0 1 0 21 33.5L21 29L25.5 29C28.46015 29 31.026566 27.256418 32.244141 24.75L33.75 24.75 A 1.250125 1.250125 0 1 0 33.75 22.25L32.960938 22.25C32.985768 22.003074 33 21.753178 33 21.5C33 21.246822 32.985768 20.996926 32.960938 20.75L33.75 20.75 A 1.250125 1.250125 0 1 0 33.75 18.25L32.244141 18.25C31.026566 15.743582 28.46015 14 25.5 14L19.5 14 z M 21 17L25.5 17C26.716968 17 27.808968 17.477549 28.615234 18.25L21 18.25L21 17 z M 21 20.75L29.925781 20.75C29.966351 20.995 30 21.24267 30 21.5C30 21.75733 29.966351 22.005 29.925781 22.25L21 22.25L21 20.75 z M 21 24.75L28.615234 24.75C27.808968 25.522451 26.716968 26 25.5 26L21 26L21 24.75 z"
                fill="currentColor"
            />
        </svg>
    );
};

function Peso(props: Partial<CustomIconComponentProps>) {
    return <Icon component={PesoSVG} {...props} />;
}

export default Peso;