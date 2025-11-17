"use strict";

import animation from "./modules/wow.js";
import header from "./modules/header.js"
import photoshoot from "./modules/photoshoot.js";
import web3 from "./modules/web3.js";
import contentBlock from "./modules/content-block.js";


document.addEventListener("DOMContentLoaded", () => {
	header();
	animation();
	photoshoot();
	web3();
	contentBlock();
});