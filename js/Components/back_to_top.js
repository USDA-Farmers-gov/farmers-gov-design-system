import * as general_utils from "../_utils/general_utils";

export function setup() {
	window.addEventListener("DOMContentLoaded", function () {
		processBackToTop();
	});
	window.addEventListener("resize", function () {
		processBackToTop();
	});
	window.addEventListener("scroll", function () {
		processBackToTop();
	});
}

function processBackToTop() {
	const pixelCount = setWhenVisible();
	const backToTopButton = document.querySelector(".back-to-top");

	if (backToTopButton) {
		backToTopButton.addEventListener("click", function (event) {
			event.preventDefault();
			window.scrollTo(0, 0);
		});
		if (window.scrollY >= pixelCount) backToTopButton.classList.add("show");
		if (window.scrollY < pixelCount)
			backToTopButton.classList.remove("show");
	}
}

function setWhenVisible() {
	const deviceType = general_utils.detectDeviceType();
	let pixels = 3946;
	if (deviceType === "desktop") pixels = 3852;
	if (deviceType === "phone") pixels = 3520;
	if (deviceType === "ipad") pixels = 4468;
	return pixels;
}
