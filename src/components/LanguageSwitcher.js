import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from "react-i18next";
import { animated } from 'react-spring';
import { Transition } from "react-spring/renderprops";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const lng = ["en", "fr"];
    const [index, set] = useState(lng.indexOf(i18n.language));

    const useStyles = createUseStyles({
        root: {
            cursor: "pointer",
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            willChange: "transform, opacity",
        },
        flagButton: {
            marginRight: "3em",
            border: "2px solid #cbdff4",
            padding: "5px 10px 0",
            borderRadius: "10px",
            boxShadow: "1px 2px 10px #191919",
        },
        flagImg: {
            width: "27px",
            height: "auto",
        },
        '@media (max-width: 600px)': {
            flagButton: {
                marginRight: "1em",
            },
            flagImg: {
                width: "20px",
                height: "auto",
            },
        }
    });

    const classes = useStyles();

	const lngComponent = [
        <img className={classes.flagImg} src={process.env.PUBLIC_URL + '/assets/flags/us_uk.svg'} alt="us_uk" width="27px" height="auto" />,
        <img className={classes.flagImg} src={process.env.PUBLIC_URL + '/assets/flags/fr.svg'} alt="fr" width="27px" height="auto" />,
    ];

    return (
        <div className={classes.root} onClick={() => {
            let temp = (index + 1) % lng.length;
            set(temp);
            i18n.changeLanguage(lng[temp]);
        }}>
            <Transition items={index} from={{ opacity: 0, transform: 'translate3d(100%, 0, 0)' }} enter={{ opacity: 1, transform: 'translate3d(0%, 0, 0)' }} leave={{ opacity: 0, transform: 'translate3d(-50%, 0, 0)' }}>
                {idx => styles => (
                    <animated.div style={{ ...styles }} className={classes.flagButton}>
                        {lngComponent[idx]}
                    </animated.div>
                )}
            </Transition>
        </div>
    );
}