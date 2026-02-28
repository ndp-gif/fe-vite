import Leftpart from "../components/Leftpart";
import Preloader from "../components/Preloader";
import Rightpart from "../components/Rightpart";
import MobileMenu from "../components/mobile/MobileMenu";

const Portfolio = () => {
    return (
        <>

            // {/* <!-- WRAPPER ALL --> */}
            < div className="arlo_tm_wrapper_all" >
                <div id="arlo_tm_popup_blog">
                    <div className="container">
                        <div className="inner_popup scrollable"></div>
                    </div>
                    <span className="close"><a href="#"></a></span>
                </div>

                {/* <!-- PRELOADER --> */}
                <Preloader />
                {/* <!-- /PRELOADER --> */}

                {/* <!-- MOBILE MENU --> */}
                <MobileMenu />
                {/* <!-- /MOBILE MENU --> */}

                {/* <!-- CONTENT --> */}
                <div className="arlo_tm_content">

                    {/* <!-- LEFTPART --> */}
                    <Leftpart />
                    {/* <!-- /LEFTPART --> */}

                    {/* <!-- RIGHTPART --> */}
                    <Rightpart />
                    {/* <!-- /RIGHTPART --> */}

                    <a className="arlo_tm_totop" href="#"></a>

                </div>
            </div >
        </>
    )
}

export default Portfolio;