import LoginContainer from "@component/components/LoginContainer";
import { useUser } from "@component/util/context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
const logo = require("../public/RectangleLogo.png");

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
        <div className="page">
            <div className="authHeader">
                <Image className="authLogo" src={logo} alt="Suedeo Logo" />
                <Link href="/home" className="link">
                    Skip
                </Link>
            </div>
            <LoginContainer />
        </div>
    );
}
