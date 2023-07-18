import { useCookies } from "react-cookie";

const useSetToken = () => {
    const [_, setCookie] = useCookies(["jwt", "username", "id"]);
    console.log("setting token");
    const setToken = (data) => {
        setCookie("jwt", data.jwt);
        setCookie("username", data.user.username);
        setCookie("id", data.user.id);
        setCookie("email", data.user.email);
    };

    return setToken;
};

export default useSetToken;
