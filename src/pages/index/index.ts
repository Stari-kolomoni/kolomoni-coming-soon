import "../../styles/main.scss";
import "../../assets/images/kolomon-icon-v3.png";

import svgDecoration from "../../assets/svg/kolomoni-landing-decoration.svg";

const onReady = () => {
    console.log(svgDecoration);

    const decorationContainer = document.getElementById("kolomon-decoration-container");
    if (decorationContainer === null) {
        throw new Error("Could not find decoration container!");
    }

    decorationContainer.innerHTML = svgDecoration;
    decorationContainer.classList.remove("decoration-hidden");
};

if (document.readyState !== "loading") {
    onReady();
} else {
    document.addEventListener("DOMContentLoaded", onReady);
}
