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

    useEffect(() => {

        getAllCategories().then(scss => {
            let arrName = scss.data.map((data) => data.name);
            setCategoriesArr(arrName);
        });


        if (!ifSorted && props.AllBusiness && props.AllBusiness.length != 0) {
            setifSorted(true);
            SortllBusiness(props.AllBusiness,props.SaveAllBusiness)
        }

    }, [props.AllBusiness]);



    return (<>
        {<form className="ui form">
            <div className="ui form">
                <div className="two fields">
                    <div className="field">
                        <label>Name</label>
                        <input placeholder="Name" type="text" ref={name} type="text" onKeyUp={searchBusiness} />
                    </div>
                    <div className="field">
                        <label>Address</label>
                        <input placeholder="Address" type="text" ref={adress} type="text" onKeyUp={searchBusiness} />
                    </div>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" placeholder="Email" ref={email} type="text" onKeyUp={searchBusiness} />
                </div>
                <div className="two fields">
                    <div className="field">
                        <label>Phone Number</label>
                        <input placeholder="Phone Number" type="number" ref={phoneNamber} type="text" onKeyUp={searchBusiness} />
                    </div>
                    <div className="field">
                        <label>Category</label>
                        <Multiselect
                            options={categoriesArr ? categoriesArr : []}
                            isObject={false}
                            ref={listCategory} type="text"
                            onSelect={searchBusiness}
                            onRemove={searchBusiness}
                        />
                        {/* <input placeholder="category" type="text" ref={listCategory} type="text" onKeyUp={searchBusiness} /> */}
                    </div>
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