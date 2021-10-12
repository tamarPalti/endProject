import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import Home from './components/Home';
import Heder from './components/Heder';
import SimpleMap from './components/search/MyLocation'
import { connect } from "react-redux";
import MyLocation from './components/search/MyLocation';
const app = (props) => {
    return (<>
     <Heder Home={Home}/>
        {/* <Home/> */}
        {/* <SimpleMap/> */}
        {/* <MyLocation /> */}
        {/* console.log("jjj"); */}
        {/* tamar */}
    </>)
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps, {})(app);

