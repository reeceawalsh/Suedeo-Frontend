import SignUp from "@component/components/SignUp";
import Image from "next/image";
import Link from "next/link";
const logo = require("../public/RectangleLogo.png");
export default function RegisterPage() {
    return (
        <div className="page">
            <div className="authHeader">
                <Image className="authLogo" src={logo} alt="Suedeo Logo" />
                <Link href="/home" className="link">
                    Skip
                </Link>
            </div>
            <SignUp />
        </div>
    );
}
