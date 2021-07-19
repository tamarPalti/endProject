import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import Home from './components/Home'
import { connect } from "react-redux";
const app = (props) => {
    return (<>
    <Home/>
    
{/* console.log("jjj"); */}
{/* tamar */}
    </>)
}
const mapStateToProps = (state) => {
    return { CurrentUser: state.usersPart.CurrentUser };
}
export default connect(mapStateToProps,{})(app);

