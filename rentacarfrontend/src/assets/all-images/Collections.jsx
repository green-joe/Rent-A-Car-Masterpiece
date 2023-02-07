import React, {useState, useEffect} from 'react'
import Title from '../../components/Title/Title'
import { getCollectionCategories } from '../../services/CollectionsService'
import './Collections.scss'

const Collections = () => {
    const [apiResponse, setApiResponse] = useState(<div className="page-message">Adatok betöltése...</div>);

    useEffect(() => {
        getCollectionCategories().then(
            data => {
                let components = [];
                for(var i = 0;i<data.length;i++) {
                    components.push(
                    <div key={i} className=" col-md-6">
                        {
                            <CollectionsSection 
                            title={data[i].title} 
                            image={data[i].image}
                            target={data[i].short_name}
                            />
                        }
                    </div>);
                }
                
                setApiResponse(components)});
    },[]);

    return (
        <div className="content-holder">
            <Title title_text = "Gyűjtemények/Collections" />
            <div className="container">
                <div className="row" id="card-container">
                    {apiResponse}
                </div>
            </div>
        </div>
    )
}

export default Collections

const CollectionsSection = (props) => {
    let targetUrl = "collection/" + props.target

    return (
        <div className="collection_category-section-holder">
            <div className="category-section">
                <div className="img-holder">
                    <a href={targetUrl}>
                    <img src={props.image} alt={props.title}/>
                    </a>
                </div>
                <div className="description-holder">
                    <a href={targetUrl}><h2>{props.title}</h2></a>
                    <a className="more-link" href={targetUrl}>Bővebben</a>
                </div>
            </div>
        </div>
    )
}
