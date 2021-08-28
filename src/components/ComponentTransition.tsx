import React, { useEffect, useState } from "react";
import { animated, Transition } from "react-spring";

import Landing from "../Landing";
import Skills from "../Skills";
import Projects from "../Projects";
import Contact from "../Contact";

export const ComponentTransition = () => {
	const [visibleComponent, setVisibleComponent] = useState(0);

	const handleScroll = () => {
		const offsetScroll = window.scrollY;
		if (offsetScroll < 400 && visibleComponent !== 0) {
			return setVisibleComponent(0);
		} else if (offsetScroll > 400 && offsetScroll < 900 && visibleComponent !== 1) {
			return setVisibleComponent(1);
		} else if (offsetScroll > 900 && offsetScroll < 3400 && visibleComponent !== 2) {
			return setVisibleComponent(2);
		} else if (offsetScroll > 3400 && visibleComponent !== 3) {
			return setVisibleComponent(3);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	const components = [
		<Landing />,
		<Skills />,
		<Projects />,
		<Contact />
	];

	return (
		<Transition unique reset items={visibleComponent} from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
            {({ opacity }, idx: number) => (
				<animated.div style={{ opacity, position: "absolute", top: 0, left: 0, display: "flex" }}>
					{components[idx]}
				</animated.div>
			)}
		</Transition>
	);
}

export default React.memo(ComponentTransition);