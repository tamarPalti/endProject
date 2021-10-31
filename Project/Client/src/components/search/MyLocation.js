
import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div style={{"background-color":"red","width": "14px", "border-radius": "13px","height": "14px"}}> </div>;
    


const MyLocation = (props) => {


    useEffect(() => {



    }, [])


    return (
      
        <div style={{"height":" 20%","width": "32%","margin-top":"-23%","margin-left": "5% "}}>
          
            
           
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyC42dZGLkeXWn1ofLJhRrWcVBxFY1-tf2Q' }}
                defaultCenter={props.center}
                defaultZoom={props.zoom}
            >
                <AnyReactComponent
                    lat={props.center.lat}
                    lng={props.center.lng}
                    text={props.txt}
                    
                />
            </GoogleMapReact>
        </div>
    );

}

export default MyLocation;
