import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import Home from './components/Home';
import Heder from './components/Heder';
import SimpleMap from './components/search/MyLocation'
import { connect } from "react-redux";
import MyLocation from './components/search/MyLocation';
import PrivateNew from './components/PrivateArea/privatenew';
import TableTasks from './components/PrivateArea/TableTasks';
import ChartPage from './components/ChartPage/ChartPage';
import Advertisements from './components/Advertisements/Advertisements';

const app = (props) => {
    return (<>
        {/* <Heder Home={Home}/> */}

        <Heder />
        <Home/>
        {/* <Advertisements /> */}
        {/* <TableTasks /> */}

        {/* <ChartPage /> */}



        {/* <New/> */}
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



// import React from 'react';
// import ImageUploading from 'react-images-uploading';

// export default function App() {
//   const [images, setImages] = React.useState([]);
//   const maxNumber = 69;

//   const onChange = (imageList, addUpdateIndex) => {
//     // data for submit
//     console.log(imageList, addUpdateIndex);
//     setImages(imageList);
//   };

//   return (
//     <div className="App">
//       <ImageUploading
//         multiple
//         value={images}
//         onChange={onChange}
//         maxNumber={maxNumber}
//         dataURLKey="data_url"
//       >
//         {({
//           imageList,
//           onImageUpload,
//           onImageRemoveAll,
//           onImageUpdate,
//           onImageRemove,
//           isDragging,
//           dragProps,
//         }) => (
//           // write your building UI
//           <div className="upload__image-wrapper">
//             <button
//               style={isDragging ? { color: 'red' } : undefined}
//               onClick={onImageUpload}
//               {...dragProps}
//             >
//               Click or Drop here
//             </button>
//             &nbsp;
//             <button onClick={onImageRemoveAll}>Remove all images</button>
//             {imageList.map((image, index) => (
//               <div key={index} className="image-item">
//                 <img src={image['data_url']} alt="" width="100" />
//                 <div className="image-item__btn-wrapper">
//                   <button onClick={() => onImageUpdate(index)}>Update</button>
//                   <button onClick={() => onImageRemove(index)}>Remove</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </ImageUploading>
//     </div>
//   );
// }