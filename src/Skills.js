import { React } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from "react-i18next";
import { useSprings, animated } from 'react-spring';

export default function Skills() {

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
        skillsCard: {
            width: "100vw",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "80vh",
            flexWrap: "wrap"
        },
        skill: {
            width: "25vw",
            height: "auto",
            display: "flex",
            margin: "1.75em",
        },
        skillImg: {
            width: "5vw",
            height: "auto",
            marginRight: "1em",
        },
        skillBar: {
            height: 7,
            borderRadius: 20,
            backgroundColor: '#cbdff4',
        },
        skillBarBuffer: {
            width: "25vw",
            margin: "auto 0",
            height: 7,
            borderRadius: 20,
            backgroundColor: "rgba(203, 223, 244, 0.3)",
        },

        '@media screen and (max-width: 600px)': {
            root: {
                marginTop: "2em",
            },
            title: {
                fontSize: "25pt"
            },
            skillsCard: {
                flexDirection: "row",
                height: "70vh",
            },
            skill: {
                width: "45vw",
                margin: "0",
            },
            skillImg: {
                width: "12.5vw"
            },
            skillBarBuffer: {
                width: "25vw",
            },

        },

        '@media screen and (min-width: 601px) and (max-height: 900px)' : {
            skill: {
                margin: "1em",
            },
        },

    });

    const classes = useStyles();

    const skills = [
        {
            name: 'nodejs',
            from: {
                width: '0%',
            },
            to: {
                width: '90%',
            },
            config: {
                mass: 1,
                tension: 25,
                friction: 14
            }
        },
        {
            name: 'react',
            from: {
                width: '0%',
            },
            to: {
                width: '75%',
            },
            config: {
                mass: 10,
                tension: 180,
                friction: 40
            }
        },
        {
            name: 'express',
            from: {
                width: '0%',
            },
            to: {
                width: '85%',
            },
            config: {
                mass: 1,
                tension: 280,
                friction: 120
            }
        },
        {
            name: 'mongodb',
            from: {
                width: '0%',
            },
            to: {
                width: '60%',
            },
            config: {
                mass: 5,
                tension: 100,
                friction: 20
            }
        },
        {
            name: 'javascript',
            from: {
                width: '0%',
            },
            to: {
                width: '80%',
            },
            config: {
                mass: 20,
                tension: 200,
                friction: 70
            }
        },

        {
            name: 'php',
            from: {
                width: '0%',
            },
            to: {
                width: '70%',
            },
            config: {
                mass: 20,
                tension: 180,
                friction: 60
            }
        },
        {
            name: 'mysql',
            from: {
                width: '0%',
            },
            to: {
                width: '90%',
            },
            config: {
                mass: 1,
                tension: 180,
                friction: 80
            }
        },
        {
            name: 'cplusplus',
            from: {
                width: '0%',
            },
            to: {
                width: '65%',
            },
            config: {
                mass: 10,
                tension: 180,
                friction: 40
            }
        },
        {
            name: 'rust',
            from: {
                width: '0%',
            },
            to: {
                width: '55%',
            },
            config: {
                mass: 3,
                tension: 210,
                friction: 20
            }
        },
        {
            name: 'java',
            from: {
                width: '0%',
            },
            to: {
                width: '65%',
            },
            config: {
                mass: 5,
                tension: 150,
                friction: 25
            }
        }
    ];

    const springs = useSprings(skills.length, skills.map(({ name, ...config }) => config));

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>{t("skill")}</h1>
            <div className={classes.skillsCard}>
                {springs.map((spring, index) => (
                    <div key={index + 1} className={classes.skill}>
                        <img key={index + 2} className={classes.skillImg} src={process.env.PUBLIC_URL + '/assets/lng/' + skills[index].name + '.svg'} alt={skills[index].name} />
                        <div key={index + 3} className={classes.skillBarBuffer}>
                            <animated.div key={index} className={classes.skillBar} style={{ ...spring }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}