import { Merriweather } from "next/font/google";

const merriWeather = Merriweather({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin-ext"],
    display: "swap",
});

export default merriWeather;