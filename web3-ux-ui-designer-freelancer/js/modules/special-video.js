function specialVideo() {
    var videoBlock = document.querySelector(".special-video__wrap");
    if (videoBlock) {

        var elOldTop = 0;
        var elOldLeft = 0;
        var topLeftBlockDesktop = document.querySelector(".header__logo");
        var bottomLeftBlockDesktop = document.querySelector('.hero__button-wrapper')

        setTimeout(function () {
            videoBlock.classList.add("special-video__wrap--active");

            dragElement(videoBlock, function (el, e) {
                if (
                    e.target.classList.contains("special-video__btn") ||
                    e.target.closest(".special-video__btn-list") !== null
                ) {
                    changeVideo(e);
                    return;
                }
                el.classList.toggle("special-video__wrap--full");
                if (el.classList.contains("special-video__wrap--full")) {
                    el.style.top = "50%";
                    el.style.left = "50%";
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(function () {
                        el.classList.toggle("special-video__wrap--full-size");
                    }, 350);
                } else {
                    el.classList.toggle("special-video__wrap--full-size");
                    setTimeout(function () {
                        if (elOldTop && elOldLeft) {
                            el.style.top = elOldTop;
                            el.style.left = elOldLeft;
                        } else {
                            el.setAttribute("style", "");
                        }
                    }, 350);
                }
                el.querySelector(
                    ".special-video__video--active"
                ).muted = !el.querySelector(".special-video__video--active").muted;
            });
        }, 2000);

        function changeVideo(e) {
            var changeVideoToggle = e.target;
            if (!changeVideoToggle.classList.contains(".special-video__btn")) {
                changeVideoToggle = e.target.closest(".special-video__btn");
                if (changeVideoToggle) {
                    if (
                        changeVideoToggle.classList.contains("special-video__btn--next")
                    ) {
                        changeVideoToNext();
                    }
                    if (
                        changeVideoToggle.classList.contains("special-video__btn--prev")
                    ) {
                        changeVideoToPrev();
                    }
                }
            }
        }

        function changeVideoToPrev() {
            var videoList = Array.from(
                document.querySelectorAll(".special-video__video")
            );
            var videoWrap = document.querySelector(".special-video__wrap");
            if (videoWrap.classList.contains("special-video__wrap--animated")) {
                return;
            }
            videoWrap.classList.add("special-video__wrap--animated");
            var currentVideo;
            var nextVideo;
            var toggle = false;
            videoList.forEach((video, index) => {
                if (!toggle) {
                    if (video.classList.contains("special-video__video--active")) {
                        video.classList.remove("special-video__video--active");
                        video.classList.add("special-video__video--hidden");
                        video.pause();
                        nextVideo = videoList[index - 1];
                        nextVideo.classList.add("special-video__video--active");
                        nextVideo.classList.remove("special-video__video--hidden");
                        toggle = true;

                        videoWrap.querySelector(
                            ".special-video__btn--next"
                        ).disabled = false;
                        if (index - 1 === 0) {
                            videoWrap.querySelector(
                                ".special-video__btn--prev"
                            ).disabled = true;
                        }

                        setTimeout(function () {
                            nextVideo.play();
                            document.activeElement.blur();
                            if (nextVideo.muted) {
                                nextVideo.muted = false;
                            }
                            videoWrap.classList.remove("special-video__wrap--animated");
                        }, 300);
                    }
                }
            });
        }

        function changeVideoToNext() {
            var videoList = Array.from(
                document.querySelectorAll(".special-video__video")
            );
            var videoWrap = document.querySelector(".special-video__wrap");
            if (videoWrap.classList.contains("special-video__wrap--animated")) {
                return;
            }
            videoWrap.classList.add("special-video__wrap--animated");
            var currentVideo;
            var nextVideo;
            var toggle = false;
            videoList.forEach((video, index) => {
                if (!toggle) {
                    if (video.classList.contains("special-video__video--active")) {
                        video.classList.remove("special-video__video--active");
                        video.classList.add("special-video__video--hidden");
                        video.pause();
                        nextVideo = videoList[index + 1];
                        nextVideo.classList.add("special-video__video--active");
                        nextVideo.classList.remove("special-video__video--hidden");
                        toggle = true;

                        videoWrap.querySelector(
                            ".special-video__btn--prev"
                        ).disabled = false;
                        if (index + 2 === videoList.length) {
                            videoWrap.querySelector(
                                ".special-video__btn--next"
                            ).disabled = true;
                        }

                        setTimeout(function () {
                            nextVideo.play();
                            document.activeElement.blur();
                            if (nextVideo.muted) {
                                nextVideo.muted = false;
                            }
                            videoWrap.classList.remove("special-video__wrap--animated");
                        }, 300);
                    }
                }
            });
        }

        function dragElement(elmnt, clickCallback) {
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;

            var drag = false;

            elmnt.addEventListener("mousedown", dragMouseDown);
            elmnt.addEventListener("touchstart", dragMouseDown);

            function dragMouseDown(e) {
                drag = false;
                e = e || window.event;
                if (!e.type.includes("touch")) {
                    e.preventDefault();
                }
                // get the mouse cursor position at startup:

                if (!e.touches) {
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                } else {
                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                }

                //document.onmouseup = closeDragElement;
                document.addEventListener("mouseup", closeDragElement);
                document.addEventListener("touchend", closeDragElement);
                // call a function whenever the cursor moves:
                //document.onmousemove = elementDrag;
                document.addEventListener("mousemove", elementDrag);
                document.addEventListener("touchmove", elementDrag);
            }

            function elementDrag(e) {
                if (elmnt.classList.contains("special-video__wrap--full")) {
                    return;
                }
                drag = true;
                elmnt.classList.add("special-video__wrap--move");
                e = e || window.event;
                if (!e.type.includes("touch")) {
                    e.preventDefault();
                }
                // calculate the new cursor position:

                if (!e.touches) {
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;

                    pos3 = e.clientX;
                    pos4 = e.clientY;
                } else {
                    pos1 = pos3 - e.touches[0].clientX;
                    pos2 = pos4 - e.touches[0].clientY;

                    pos3 = e.touches[0].clientX;
                    pos4 = e.touches[0].clientY;
                }

                // set the element's new position:
                elmnt.style.top = elmnt.offsetTop - pos2 + "px";
                elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

                elOldTop = elmnt.style.top;
                elOldLeft = elmnt.style.left;
            }

            var throttleClickCallback = throttle(clickCallback, 1000);
            var debounceClickCallback = debounce(clickCallback, 1000);

            function closeDragElement(e) {
                // callback if drag is false
                elmnt.classList.remove("special-video__wrap--move");
                if (!drag) {
                    debounceClickCallback(elmnt, e);
                } else {
                    if (pos3 <= window.innerWidth / 2) {
                        elmnt.style.left =
                            '180px';
                        if (window.matchMedia("(max-width: 960px)").matches) {
                            elmnt.style.left = "80px";
                        }
                        if (window.matchMedia("(max-width: 614px)").matches) {
                            elmnt.style.left = "20px";
                        }
                    } else {
                        elmnt.style.left = "85%";
                        if (window.matchMedia("(max-width: 960px)").matches) {
                            elmnt.style.left = "70%";
                        }
                        // tablet
                        if (window.matchMedia("(max-width: 614px)").matches) {
                            elmnt.style.left = window.innerWidth - 170 + "px";
                        }
                    }
                    if (pos4 <= window.innerHeight / 2) {

                        if (!window.matchMedia("(max-width: 768px)").matches) {
                            elmnt.style.top =
                                topLeftBlockDesktop.getBoundingClientRect().top + window.scrollY + "px";
                        }
                        if (window.matchMedia("(max-width: 614px)").matches) {
                            elmnt.style.top = "60px";
                        }
                    } else {
                        elmnt.style.top = bottomLeftBlockDesktop.getBoundingClientRect().top + window.scrollY + "px";
                        if (window.matchMedia("(max-width: 614px)").matches) {
                            elmnt.style.top = "422px";
                            elmnt.style.left = window.innerWidth - 170 + "px"
                        }
                        if (
                            pos3 <= window.innerWidth * 0.6 &&
                            pos3 >= window.innerWidth * 0.2
                        ) {
                            if (!window.matchMedia("(max-width: 614px)").matches) {
                                // desktop bottom center offset
                                elmnt.style.left = bottomLeftBlockDesktop.getBoundingClientRect().left + bottomLeftBlockDesktop.offsetWidth + 30 + 'px'

                                //tablet 
                                if (window.matchMedia("(max-width: 960px)").matches) {
                                    elmnt.style.left = "70%";
                                }
                            }
                        }
                    }
                    elOldTop = elmnt.style.top;
                    elOldLeft = elmnt.style.left;
                }
                // stop moving when mouse button is released:
                //document.onmouseup = null;
                //document.onmousemove = null;

                document.removeEventListener("mouseup", closeDragElement);
                document.removeEventListener("touchend", closeDragElement);
                document.removeEventListener("mousemove", elementDrag);
                document.removeEventListener("touchmove", elementDrag);
            }
        }
    }
}

function throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) {
            // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}
function debounce(f, ms) {
    let isCooldown = false;

    return function () {
        if (isCooldown) return;

        f.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => (isCooldown = false), ms);
    };
}


export default specialVideo