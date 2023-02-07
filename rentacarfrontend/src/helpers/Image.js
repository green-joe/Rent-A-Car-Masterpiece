// full example : https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed 

// index.js

import React, { Component } from 'react';
class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
                         
        };
    };

    // from https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string 
    // alternative (non native approach) - https://gist.github.com/jonleighton/958841 
    /* arrayBufferToBase64(buffer) {
         var binary = '';
         var bytes = [].slice.call(new Uint8Array(buffer));
         bytes.forEach((b) => binary += String.fromCharCode(b));
         return window.btoa(binary);
     };*/
    componentDidMount() {
        fetch(process.env.REACT_APP_BACKEND_URL+'/image/info/bmw-offer.png')
            .then((res) => res.json())
            .then((data) => {
                var base64Flag = "data:image/png;base64,"               
                    this.setState({
                        img: base64Flag+data.imageData                                           
                    })     
                    
                  
                
            })          
             
         
}
render() {
    const {img} = this.state;
console.log(img)
    return (
        
        <img
            src={img}
            alt='Helpful alt text' />
    )
}
}
export default Image;