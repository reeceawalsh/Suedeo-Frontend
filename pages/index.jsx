import LandingPage from "@component/components/LandingPage";
import { useUser } from "@component/util/context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function MainPage() {
    const { user } = useUser();
    const router = useRouter();
    console.log(user);
    // redirect logged-out users to the homepage
    useEffect(() => {
        if (user) {
            router.push("/home");
        }
    }, [user, router]);
    return <LandingPage />;
}
