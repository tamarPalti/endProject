import logo from './img/logo.png';
const Logo = (props) => {
    return (<>
        <a href="/">
            <img src={logo} style={{ "width": "10rem", "margin-left": "2rem" }} />
        </a>
    </>);
}

export default Logo;
