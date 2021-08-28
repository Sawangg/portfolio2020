import { createUseStyles } from 'react-jss';
import { useTranslation } from "react-i18next";

export default function Contact() {

    const { t } = useTranslation();

    const useStyles = createUseStyles({
        root: {
            flexGrow: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100vw",
            marginTop: "5em",
        },
        title: {
            fontSize: "32pt",
            lineHeight: "36pt",
        },
        subtitle: {
            fontSize: "20pt",
            lineHeight: "12pt",
        },
        wrapper: {
            width: "100vw",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            flexDirection: "column",
        },
        imgWrapper: {
            display: "flex",
            flexDirection: "row",
            width: ""
        },
        img: {
            width: "7vw",
            margin: "2em",
        },

        '@media screen and (max-width: 600px)': {
            title: {
                padding: "0 0.5em",
                fontSize: "19pt",
                lineHeight: "25pt",
                textAlign: "center",
            },
            subtitle: {
                fontSize: "inherit",
                lineHeight: "inherit",
            },
            img: {
                width: "12vw",
                margin: "1.5em", 
            }
        }
    });
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <h1 className={classes.title}>{t("thankyoutitle")}</h1>
                <p className={classes.subtitle}>{t("thankyouSubtitle")}</p>
                <div className={classes.imgWrapper}>
                    <a href="https://github.com/Sawangg" target="_blank" rel="noreferrer">
                        <img className={classes.img} src={process.env.PUBLIC_URL + '/assets/contact/github.svg'} alt="github"/>
                    </a>
                    <a href="mailto:leo.mercier@efrei.net" target="_blank" rel="noreferrer">
                        <img className={classes.img} src={process.env.PUBLIC_URL + '/assets/contact/email.svg'} alt="email"/>
                    </a>
                    <a href="https://www.linkedin.com/in/l%C3%A9o-mercier-9b3828207/" target="_blank" rel="noreferrer">
                        <img className={classes.img} src={process.env.PUBLIC_URL + '/assets/contact/linkedin.svg'} alt="linkedin"/>
                    </a>
                </div>
            </div>
        </div>
    );
}