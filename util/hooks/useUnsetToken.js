import { useCookies } from "react-cookie";

const useUnsetToken = () => {
    const [_, removeCookie] = useCookies(["jwt", "username", "id"]);
    const unsetToken = () => {
        removeCookie("jwt", { path: "/home" });
        removeCookie("username", { path: "/home" });
        removeCookie("id", { path: "/home" });
        removeCookie("email", { path: "/home" });
    };

    return unsetToken;
};

export default useUnsetToken;
