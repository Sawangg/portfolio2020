import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from "react-i18next";
import { useSprings, useTransition, animated, interpolate } from "react-spring";
import { useDrag } from 'react-use-gesture';

export default function Projects() {

    const { t } = useTranslation();

    const useStyles = createUseStyles({
        root: {
            flexGrow: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: "5em",
        },
        title: {
            fontSize: "32pt",
            lineHeight: "36pt",
        },
        wrapper: {
            width: "100vw",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "80vh",
        },
        projectCard: {
            position: "absolute",
            willChange: "transform",
        },
        projectWrapper: {
            display: "flex",
            width: "100vw",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
        },
        projet: {
            backgroundColor: "white",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "calc(100vw - 5em)",
            maxWidth: "700px",
            height: "85vh",
            maxHeight: "570px",
            borderRadius: "10px",
            boxShadow: "0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)",
            cursor: "grab",
            touchAction: "none",
            MozUserSelect: "none",
            WebkitUserDrag: "none",
            userSelect: "none",
        },
        textWrapper: {
            display: "flex",
            width: "100vw",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            padding: "0 5em 0 10em",
            //zIndex: -1,
        },
        projectTitle: {
            fontSize: "25pt",
            marginRight: "0.5em",
        },
        projectDesc: {
            fontSize: "17pt",
            lineHeight: "22pt",
            zIndex: -1
        },
        technoImg: {
            width: "5vw",
            height: "auto",
            marginRight: "1.5em",
        },
        titleWrapper: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        repoImg: {
            width: "2vw",
        },
        technologies: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "1em"
        },

        '@media screen and (max-width: 600px)': {
            root: {
                marginTop: "2em",
            },
            title: {
                fontSize: "25pt",
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                KhtmlUserSelect: "none",
                userSelect: "none",
            },
            projectTitle: {
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                KhtmlUserSelect: "none",
                userSelect: "none",
                textAlign: "center",
                fontSize: "16pt",
            },
            projectDesc: {
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                KhtmlUserSelect: "none",
                userSelect: "none",
                fontSize: "inherit",
                lineHeight: "inherit",
            },
            technoImg: {
                width: "12vw",
                MozUserSelect: "none",
                WebkitUserSelect: "none",
                KhtmlUserSelect: "none",
                userSelect: "none",
            },
            wrapper: {
                flexDirection: "column"
            },
            projectWrapper: {
                height: "50vh"
            },
            projet: {
                width: "calc(100vw - 5em)",
                maxWidth: "400px",
                height: "40vh",
                maxHeight: "400px",
            },
            textWrapper: {
                zIndex: "auto",
                padding: "0 0.5em",
                textAlign: "center",
                height: "20vh",
            },
            repoImg: {
                width: "7vw",
            },
            technologies: {
                paddingTop: "0.5em"
            }
        },

        '@media screen and (min-width: 1030px) and (max-width: 1366px)': {
            projectWrapper: {
                height: "50vh",
                justifyContent: "flex-end"
            },
            projet: {
                width: "calc(100vw - 5em)",
                maxWidth: "430px",
                height: "40vh",
                maxHeight: "430px",
            },
        }
    });

    const projects = [
        {
            name: "Rubik's Cube",
            desc: t("projectRubiksDesc"),
            img: 'rubiks.png',
            technologies: ["p5"],
        },
        {
            name: "Neptune",
            desc: t("projectNeptuneDesc"),
            img: 'neptune.jpg',
            technologies: ["nodejs", "react", "express", "mongodb"],
        },
        {
            name: "Portfolio",
            desc: t("projectPortfolioDesc"),
            img: 'portfolio.png',
            technologies: ["react", "javascript"],
            repo: "https://github.com/Sawangg/portfolio",
        },
        {
            name: "Pokemon",
            desc: t("projectPokemonDesc"),
            img: 'pokemon.png',
            technologies: ["java"],
            repo: "https://github.com/Sawangg/PokemonIUT",
        },
        {
            name: "Pilaf",
            desc: t("projectPilafDesc"),
            img: "Pilaf.png",
            technologies: ["html", "css"],
            repo: "https://github.com/Sawangg/Pilaf",
        },
        {
            name: "GMP",
            desc: t("projectGMPDesc"),
            img: "GMP.png",
            technologies: ["react", "express", "mysql"],
            repo: "https://github.com/Sawangg/GMPPT",
        },
    ];

    const classes = useStyles();

    const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 });
    const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

    const [gone] = useState(() => new Set());
    const [toggle, setToggle] = useState(projects.length - 1);
    const [cards, setCards] = useSprings(projects.length, i => ({ ...to(i), from: from() }));
    const bind = useDrag(({ event, args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
        event.preventDefault();
        const dir = xDir < 0 ? -1 : 1;
        if (!down && velocity > 0.2) gone.add(index);
        setCards(i => {
            if (index !== i || toggle !== i) return;
            const isGone = gone.has(index);
            return { x: isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0, rot: xDelta / 100 + (isGone ? dir * 10 * velocity : 0), scale: down ? 1.1 : 1, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 1500 } };
        });
        if (!down && gone.has(index) && index - 1 >= 0 && toggle === index) {
            setToggle(index - 1);
            window.scrollTo(0, (1400 + (projects.length - index) * 400));
        } else if (!down && gone.has(index) && index === 0 && toggle === index) { // Last card
            window.scrollTo(0, 3401);
        }
        //if (!down && gone.size === projects.length) setTimeout(() => { gone.clear() || setCards(i => to(i)); setToggle(projects.length - 1); window.scrollTo(0, 1300); }, 600);
    }, {
        rubberband: false,
    });

    const transitions = useTransition(toggle, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    const scrollCardEject = (index) => {
        setCards(i => {
            if (toggle !== i) return;
            gone.add(index);
            setToggle(index > 0 ? index - 1 : index);
            const dir = Math.random() < 0.50 ? 1 : -1;
            return { x: (200 + window.innerWidth) * dir, rot: Math.floor(Math.random() * (200 - 1) + 1) / 100 + (dir * 10 * 0.2), scale: 1.1, config: { friction: 50, tension: 150 } };
        });
    };

    // const cardReset = () => {
    //     setTimeout(() => { 
    //         gone.clear() || setCards(i => to(i)); 
    //         setToggle(projects.length - 1) 
    //         window.scrollTo(0, 1300);
    //     }, 600);
    // };

    const handleScroll = () => {
        if (window.scrollY > 1400 && window.scrollY < 1800) {
            if (!gone.has(5) && toggle === 5) return scrollCardEject(5);
        } else if (window.scrollY > 1800 && window.scrollY < 2200) {
            if (!gone.has(4) && toggle === 4) return scrollCardEject(4);
        } else if (window.scrollY > 2200 && window.scrollY < 2600) {
            if (!gone.has(3) && toggle === 3) return scrollCardEject(3);
        } else if (window.scrollY > 2600 && window.scrollY < 3000) {
            if (!gone.has(2) && toggle === 2) return scrollCardEject(2);
        } else if (window.scrollY > 3000 && window.scrollY < 3400) {
            if (!gone.has(1) && toggle === 1) return scrollCardEject(1);
        } else if (window.scrollY > 3400) {
            if (!gone.has(0) && toggle === 0) return scrollCardEject(0);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>{t("project")}</h1>
            <div className={classes.wrapper}>
                <div className={classes.projectWrapper}>
                    {cards.map(({ x, y, rot, scale }, i) => (
                        <animated.div className={classes.projectCard} key={i} style={{ transform: interpolate([x, y], (x1, y1) => `translate3d(${x1}px, ${y1}px, 0)`) }}>
                            <animated.div className={classes.projet} {...bind(i)} style={{ transform: interpolate([rot, scale], (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`), backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/projects/' + projects[i].img})` }} />
                        </animated.div>
                    ))}
                </div>
                <div className={classes.textWrapper}>
                    {transitions.map(({ item, props, key }) => (
                        <animated.div key={key} style={{ ...props, position: "absolute", padding: "0 0.5em" }}>
                            <div key={key + 1} className={classes.titleWrapper}>
                                <h1 className={classes.projectTitle}>{projects[item].name}</h1>
                                {(projects[item].repo !== undefined) ?
                                    <a href={projects[item].repo} target="_blank" rel="noreferrer">
                                        <img className={classes.repoImg} src={process.env.PUBLIC_URL + '/assets/contact/github.svg'} alt="github" />
                                    </a>
                                : null}
                            </div>
                            <p className={classes.projectDesc}>{projects[item].desc}</p>
                            <div key={key + 2} className={classes.technologies}>
                                {projects[item].technologies.map((name) => (
                                    <img key={name} className={classes.technoImg} src={process.env.PUBLIC_URL + '/assets/lng/' + name + '.svg'} alt={name} />
                                ))}
                            </div>
                        </animated.div>
                    ))}
                </div>
            </div>
        </div>
    );
}