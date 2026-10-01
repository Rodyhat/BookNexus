const KEY = "borrowRedirect";

// only allow internal paths (prevents open redirects)
const isSafe = (p) => typeof p === "string" && p.startsWith("/") && !p.startsWith("//");

export const saveRedirect = (path) => { if (isSafe(path)) localStorage.setItem(KEY, path); };
export const peekRedirect = () => {
    const v = localStorage.getItem(KEY);
    return isSafe(v) ? v : null;
};
export const consumeRedirect = () => {
    const v = peekRedirect();
    localStorage.removeItem(KEY);
    return v;
};