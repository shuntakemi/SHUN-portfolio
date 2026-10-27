
(() => {
    function startCursor() {
        const cursor = document.querySelector(".custom-cursor");
        const loadingScreen = document.querySelector(".loading-screen");
        let loading = Boolean(loadingScreen);
        let hasMousePosition = false;
        let mouseX = 0;
        let mouseY = 0;
        let loadingTimeout;
        document.documentElement.classList.add("custom-cursor-enabled");
        if (loading) {
            document.documentElement.classList.add("is-loading");
            document.body.classList.add("is-loading");
        }
        const finishLoading = () => {
            if (!loading) return;
            loading = false;
            document.documentElement.classList.remove("is-loading");
            document.body.classList.remove("is-loading");
            if (loadingTimeout) {
                clearTimeout(loadingTimeout);
            }
            if (cursor && hasMousePosition) {
                cursor.style.left = mouseX + "px";
                cursor.style.top = mouseY + "px";
                cursor.style.display = "block";
            }
        };
        if (loadingScreen) {
            loadingScreen.addEventListener("animationend", (event) => {
                if (
                    event.target === loadingScreen &&
                    event.animationName === "loading-screen-hide"
                ) {
                    finishLoading();
                }
            });
            loadingTimeout = window.setTimeout(finishLoading, 2500);
        }
        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            hasMousePosition = true;
            if (!cursor) return;
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
            if (!loading) {
                cursor.style.display = "block";
            }
        });
        document.querySelectorAll(
            "a, button, input, textarea, select"
        ).forEach((target) => {
            target.addEventListener("mouseenter", () => {
                if (!cursor || loading) return;
                cursor.classList.add("is-hover");
            });
            target.addEventListener("mouseleave", () => {
                if (!cursor) return;
                cursor.classList.remove("is-hover");
            });
        });
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startCursor, {
            once: true
        });
    } else {
        startCursor();
    }
})();
