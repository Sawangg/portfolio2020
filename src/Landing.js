import React, { useEffect } from 'react';
import { useSpring, animated } from "react-spring";
import { useTranslation } from "react-i18next";
import { useDrag } from 'react-use-gesture';
import { createUseStyles } from 'react-jss';

export default function Landing() {

    const [{ offset = 0 }, set] = useSpring(() => ({ offset: 0 }));
    const [{ xy }, set2] = useSpring(() => ({ xy: [0, 0] }))
    const bind = useDrag(({ event, down, movement }) => {
        event.preventDefault();
        set2({ xy: down ? movement : [0, 0] });
    }, {
        rubberband: true, 
        bounds: { left: -100, right: 100, top: -50, bottom: 50 },
    });

    const { t, i18n } = useTranslation();

    const handleScroll = () => {
        set({ offset: window.scrollY });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const calc = o => { return `translateY(${o * 0.1}px)`; };

    const useStyles  = createUseStyles({
        root: {
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "75vh",
            width: "100vw",
            textAlign: 'center',
            willChange: "transform",
        },
        logo: {
            background: `url(${process.env.PUBLIC_URL + '/assets/logo.png'}) no-repeat center`,
            width: "310px",
            height: "310px",
            borderRadius: "50%",
            boxShadow: "1px 2px 10px #191919",
            overflow: "hidden",
            cursor: "grab",
            touchAction: "none",
            MozUserSelect: "none",
            WebkitUserDrag: "none",
            userSelect: "none",
        },
        textlanding: {
            marginTop: "2em",
        },
        text: {
            fontSize: "32pt",
            lineHeight: "36pt",
        },
        textHighlight: {
            color: "#cbdff4", // #904783
            fontSize: "35pt",
        },
        '@media screen and (max-width: 600px)': {
            logo: {
                width: "270px",
                height: "270px",
                backgroundSize: "100%"
            },
            text: {
                fontSize: "16pt",
                lineHeight: "20pt",
            },
            textHighlight: {
                fontSize: "16pt",
            }
        }
    });

    const classes = useStyles ();

    return (
        <animated.div className={classes.root} style={{ transform: offset.interpolate(calc) }}>
            <animated.div {...bind()} className={classes.logo} style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`) }} />
            <div className={classes.textlanding}>
                <h1 className={classes.text}>{t("l1")}<a href={process.env.PUBLIC_URL + '/assets/resume/resume_' + i18n.language +'.pdf'} target="_blank" rel="noreferrer" className={classes.textHighlight}>Léo Mercier</a>.</h1>
                <h1 className={classes.text}>{t("l2")}</h1>
            </div>
        </animated.div>
    );
}