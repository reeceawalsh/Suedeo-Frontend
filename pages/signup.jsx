import SignUp from "@component/components/SignUp";
import Image from "next/image";
const logo = require("../public/RectangleLogo.png");
export default function RegisterPage() {
    return (
        <div className="page">
            <div className="fakeHeader">
                <Image className="logo" src={logo} alt="Suedeo Logo" />
                {/* <h1 className="fakeHeaderTitle">Welcome</h1> */}
            </div>
            <SignUp />
        </div>
    );
}
