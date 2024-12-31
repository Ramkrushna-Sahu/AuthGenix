import { useNavigate } from "react-router-dom"
import new_404 from "../assets/new_404.svg"

const PageNotFound = () => {
    const naviagte = useNavigate();
    const handleClick = ()=>{
        naviagte('/signup')
    }
    return (
        <>
            {/* <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-purple-800">
                <div>
                <div className="m-0 align-middle">
                    <img src={new_404} alt="404" />
                </div>
                <div className="m-0 text-center">
                    <p className="m-2 font-bold text-3xl">Page Not Found !</p>
                    <p className="m-2 font-semibold">Sorry, we couldn't find the page you were looking for.</p>
                </div>
                </div>
            </div> */}
            <div className="">
                <div className="flex lg:flex-row lg:justify-evenly flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-purple-800">

                    <div className="my-0">
                        <img className="sm:w-[70%] md:w-full mx-auto" src={new_404} alt="404" />
                        <div className="text-center">
                            {/* <p className="m-2 font-bold text-3xl">Page Not Found !</p> */}
                        </div>
                    </div>
                    <div className="my-0 lg:text-left text-center lg:w-1/2 md:w-3/4">
                        <p className="m-2 font-bold md:text-3xl text-2xl">Sorry, we couldn't find the page you were looking for.</p>
                        <button className="bg-purple-600 px-2 py-3 rounded-xl font-bold hover:bg-purple-700 hover:scale-105 duration-100 my-5" onClick={handleClick}>
                            GO TO HOME PAGE
                        </button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default PageNotFound