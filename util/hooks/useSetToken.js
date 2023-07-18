import { useCookies } from "react-cookie";

const useSetToken = () => {
    const [_, setCookie] = useCookies(["jwt", "username", "id"]);
    console.log("setting token");
    const setToken = (data) => {
        setCookie("jwt", data.jwt, { path: "/home" });
        setCookie("username", data.user.username, { path: "/home" });
        setCookie("id", data.user.id, { path: "/home" });
        setCookie("email", data.user.email, { path: "/home" });
    };

    return setToken;
};

export default useSetToken;
