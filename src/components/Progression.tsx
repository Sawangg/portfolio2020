import React, { useState, useEffect, useRef } from "react";
import { createUseStyles } from 'react-jss';

export const Progression = () => {

    const [value, setValue] = useState(Math.floor((window.scrollY / (window.document.body.offsetHeight - Math.max(document.documentElement.clientHeight, window.innerHeight || 0))) * 100));
    const componentRef = useRef<any>(); // TODO : Remove ref and use a spring

    const handleScroll = () => {
        setValue((window.scrollY / (window.document.body.offsetHeight - Math.max(document.documentElement.clientHeight, window.innerHeight || 0))) * 100);
        if (componentRef) {
            const styleRef = componentRef?.current;
            styleRef.style = 'transition: stroke-dashoffset 850ms ease-in-out;';
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const useStyles = createUseStyles({
        svgRootCircle: {
            position: "absolute",
            top: 0,
            left: 0,
            margin: "2em",
            maxWidth: "100%",
        },
        svgCircle: {
            fill: "none",
        },
        svgRootLine: {
            position: "absolute",
            top: 0,
            left: 0,
            maxWidth: "100%",
        },
    });

    const classes = useStyles();

    if (window.innerWidth > 800) {
        const size = 50;
        const strokeWidth = 3;

        const radius = size / 2 - strokeWidth / 2;
        const circumference = 2 * Math.PI * radius;

        return (
            <>
                <svg className={classes.svgRootCircle} width={size} height={size}>
                    <circle
                        className={classes.svgCircle}
                        ref={componentRef}
                        stroke={'#cbdff4'}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={((100 - value) / 100) * circumference}
                    />
                </svg>
            </>
        );
    } else {
        return (
            <>
                <svg className={classes.svgRootLine} width={window.innerWidth} height={5}>
                    <line
                        ref={componentRef}
                        x1="0"
                        y1="0"
                        y2="0"
                        x2={value * (window.innerWidth * 0.01)}
                        stroke={'#cbdff4'}
                        strokeWidth="7"
                    />
                </svg>
            </>
        );
    }

}

export default React.memo(Progression);