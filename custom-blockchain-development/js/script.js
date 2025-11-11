"use strict";

import headerNav from "./modules/header";
import fullStack from "./modules/full-stack";
import caseStudies from "./modules/case-studies";
import clients from "./modules/clients";
import animation from "./modules/wow";
// import dev from "./modules/dev";

document.addEventListener("DOMContentLoaded", () => {
	headerNav();
	fullStack();
	// dev();
	caseStudies();
	clients();
	animation();
});
