import Slider from 'react-slick';
import img1 from './1617804764a18a.png'
import img2 from './161af3093b9c97.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Advertisements.scss'
const Advertisements = (props) => {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        
    };
    return (<>
        <div className="Advertisements">
            <Slider {...settings}>
                <img src={img1} />
                <img src={img2} />

            </Slider>
        </div>
    </>);
}

export default Advertisements;