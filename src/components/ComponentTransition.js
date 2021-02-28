import React, { useEffect, useState } from "react";
import Landing from "../Landing";
import Skills from "../Skills";
import Projects from "../Projects";
import Contact from "../Contact";
import { animated } from "react-spring";
import { Transition } from "react-spring/renderprops";

export const ComponentTransition = () => {
	const [visibleComponent, setVisibleComponent] = useState(0);

	const handleScroll = () => {
		const offsetScroll = window.scrollY;
		if (offsetScroll < 400 && visibleComponent !== 0) {
			setVisibleComponent(0);
		} else if (offsetScroll > 400 && offsetScroll < 900 && visibleComponent !== 1) {
			setVisibleComponent(1);
		} else if (offsetScroll > 900 && offsetScroll < 3400 && visibleComponent !== 2) {
			setVisibleComponent(2);
		} else if (offsetScroll > 3400 && visibleComponent !== 3) {
			setVisibleComponent(3);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	const component = [
		<Landing />,
		<Skills />,
		<Projects />,
		<Contact />
	];

	return (
		<Transition unique reset items={visibleComponent} from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
			{idx => styles => (
				<animated.div style={{ ...styles, position: "absolute", top: 0, left: 0, display: "flex" }}>
					{component[idx]}
				</animated.div>
			)}
		</Transition>
	);
}

export default React.memo(ComponentTransition);