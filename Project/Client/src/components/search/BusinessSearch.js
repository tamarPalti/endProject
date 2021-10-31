import 'react-bootstrap';
import { connect } from "react-redux";
import business from '../classes/business';
import { useEffect, useState, useRef } from 'react';
import {
    GetAllBusiness, SaveResultBusiness, SearchBusiness, DeleteResultBusiness,
    ChangeColorName, GetCurrentUser, SaveAllBusiness
} from '../../actions/index';

import { Multiselect } from "multiselect-react-dropdown";
import './BusinessSearch.scss'
import { getAllCategories, SortllBusiness, GetAllBusinessFunc } from '../../util/index';

const BusinessSearch = (props) => {


    let name = useRef();
    let phoneNamber = useRef();
    let email = useRef();
    let adress = useRef();
    let listCategory = useRef();
    const [categoriesArr, setCategoriesArr] = useState([]);

    

    const [countBusiness, setCountBusiness] = useState();
    const [ifSorted, setifSorted] = useState(false);

    // props.AllUsers פעם ראשונה שמבקר באתר נשלף כל המשתמשים למערך
    if (props.AllBusiness && props.AllBusiness.length == 0) {
        props.GetAllBusiness();
    }




    // פונקצית חיפוש Users
    const searchBusiness = () => {

        let Business = new business();
        Business.name = name.current.value;
        Business.phoneNamber = phoneNamber.current.value;
        Business.email = email.current.value;
        Business.adress = adress.current.value;
        Business.listCategory = listCategory.current.getSelectedItems();
        if (Business.name || Business.phoneNamber || Business.email || Business.adress || Business.listCategory.length != 0) {
            props.ChangeColorName(Business.name);
            props.SearchBusiness(Business, props.AllBusiness);
        }
        else
            props.SaveResultBusiness([]);
    }

    //styles
    const styleDivInput_1 = { "width": "40%" }
    const styleDivInput_2 = { "width": "40%", "margin-top": "32px" }

    const borderR_right = { "border-radius": "8.285714rem", "line-height": "1.5em", "margin-left": "2%", "border-color": "#726363", "border-width": "2px" }
    const borderR_left = { "border-radius": "8.285714rem", "line-height": "1.5em", "border-color": "#726363", "border-width": "2px" }

    const styleDivInput_2For_Select = { "margin-left": " 2%", "width": "40%", "margin-top": "32px" }
    const styleDivInput_2For_Phone = { "margin-left": "-1.1%", "width": "40%", "margin-top": "32px" }

    //styles

    useEffect(() => {
        props.setCircularProgresState(true);
        getAllCategories().then(scss => {
            let arrName = scss.data.map((data) => data.name);
            setCategoriesArr(arrName);
        });


        if (!ifSorted && props.AllBusiness && props.AllBusiness.length != 0) {
           
            setifSorted(true);
            SortllBusiness(props.AllBusiness, props.SaveAllBusiness)
            setTimeout(() => {          
                props.setCircularProgresState(false);
              },5000)
 
        }

    }, [props.AllBusiness]);



    return (<>
        {
            <form className="ui form">

                <div className="ui form">

                    <div className="two fields">
                        <div class="ui icon input" style={styleDivInput_1}>
                            <input type="text" placeholder="Name" ref={name} onKeyUp={searchBusiness}
                                style={borderR_left} />
                            <i class="user icon"></i>
                        </div>
                        <div class="ui icon input" style={styleDivInput_1}>
                            <input type="text" placeholder="Address" ref={adress} onKeyUp={searchBusiness}
                                style={borderR_right} />
                            <i class="map marker alternate icon"></i>
                        </div>
                    </div>

                    <div class="ui icon input" style={{ "width": "81.8%", "margin-left": "-7.5px", "margin-top": "19px" }}>
                        <input type="text" placeholder="Email" ref={email} onKeyUp={searchBusiness}
                            style={borderR_left} />
                        <i class="at icon"></i>
                    </div>

                    <div class="ui icon input" style={styleDivInput_2For_Phone} >
                        <input type="number" placeholder="Phone Number" ref={phoneNamber} onKeyUp={searchBusiness}
                            style={borderR_left} />
                        <i class="phone icon"></i>
                    </div>

                    <div class="ui icon input" style={styleDivInput_2For_Select}>

                        <Multiselect
                            options={categoriesArr ? categoriesArr : []}
                            isObject={false}
                            ref={listCategory} type="text"
                            onSelect={searchBusiness}
                            onRemove={searchBusiness}
                            style={borderR_right}
                               
                               
                        />

                    </div>

                </div>
               
            </form>}


    </>);
}

const mapStateToProps = (state) => {

    return { CurrentUser: state.usersPart.CurrentUser, AllBusiness: state.businessPart.AllBusiness, BusinessSearch: state.businessPart.BusinessSearch };
}
export default connect(mapStateToProps, {
    SortllBusiness, GetCurrentUser, GetAllBusiness, SaveResultBusiness
    , SearchBusiness, DeleteResultBusiness, ChangeColorName, SaveAllBusiness
})(BusinessSearch);