

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function EmptyChatContainer() {
    return <div
        className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
        <DotLottieReact
        src="https://lottie.host/3715d5eb-2cbb-43c0-80db-4c30474c7e7e/OCLnZHXXcf.lottie"
        loop={true} 
        autoplay={true} 
        style={{ width: '300px', height: '300px' }}
        />

        <div
            className="text-opacity-80 test-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
                <h3 className="poppins-medium">
                    Hi<span className="text-purple-500">!</span> Welcome To 
                    <span className="text-purple-500"> Chit-Chat</span> Application
                </h3>
            </div>
    </div>;
}
