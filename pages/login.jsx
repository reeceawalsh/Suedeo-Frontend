import LoginContainer from "@component/components/LoginContainer";
import { useUser } from "@component/util/context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
    const { user } = useUser();
    const router = useRouter();
    // redirect logged-out users to the homepage
    useEffect(() => {
        if (user) {
            router.push("/home");
        }
    }, [user, router]);
    return (
        <div className="loginPage">
            <LoginContainer />
        </div>
    );
}
