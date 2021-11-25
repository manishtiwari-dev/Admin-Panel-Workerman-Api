import en from "./en.json";
import es from "./es.json";

export const Trans = (key: string, language: string): string => {
    let langData: { [key: string]: string } = {};

    if (language === "en") {
        langData = en;
    } else if (language === "es") {
        langData = es;
    }

    return langData[key];
};
