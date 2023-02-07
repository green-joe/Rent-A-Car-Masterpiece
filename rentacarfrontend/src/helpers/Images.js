
import React, { Component } from 'react';
import CarItem from '../components/UI/CarItem';
class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
            
        };
    };
    
  
    componentDidMount() {           
        fetch(process.env.REACT_APP_BACKEND_URL + '/image/getAll')
        .then((res) => res.json())
        .then((data) => { 
            var base64Flag = 'data:image/jpg;base64,';           
            this.setState({
                img: base64Flag + data.imageData    
            })
             
        })
    }
    render() {
        const {img} = this.state;
       
        
        return (
            <img
                src={img}
                alt=""/>
        )
    }
}
export default Images;