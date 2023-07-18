import { useCookies } from "react-cookie";

const useUnsetToken = () => {
    const [_, removeCookie] = useCookies(["jwt", "username", "id"]);
    const unsetToken = () => {
        removeCookie("jwt");
        removeCookie("username");
        removeCookie("id");
        removeCookie("email");
    };

    return unsetToken;
};

export default useUnsetToken;
