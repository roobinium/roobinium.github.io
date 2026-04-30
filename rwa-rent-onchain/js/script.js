"use strict";

import headerNav from "./modules/header.js";
import ProfileMenuMobile from "./modules/profile-menu.js";
import tagsToggle from "./modules/tags-toggle.js";
import animation from "./modules/wow.js";


document.addEventListener("DOMContentLoaded", () => {
		headerNav();
		ProfileMenuMobile();
		tagsToggle();
		animation();
});
