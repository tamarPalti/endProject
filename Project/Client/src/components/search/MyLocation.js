
import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MyLocation = (props) => {


    useEffect(() => {



    }, [])


    return (
      
        <div style={{ height: '100%', width: '100%' }}>
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
