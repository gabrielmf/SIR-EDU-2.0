import React from 'react'
import { FlatButton } from 'material-ui'
import './Slider.scss'

const SliderItem = (props) => {
    const { item, editable } = props;
    const type = item.contentType.split('/')[0] || '';
    const url = 'http://localhost:3000/api/files/' + item._id;
    
    return (
        <div class="slider-item thumbnail">
            {type === 'image' ?  <img src={url}/> :
            <video draggable="true" preload="metadata" src={url}></video>}
            <p class="comment">{item.metadata.comment}</p>
            <div class="text-center">
                <FlatButton label="Visualizar"/>&nbsp;
                { editable && <FlatButton label="Inserir" primary={true}/>}
            </div>
        </div>
    )
};

export default SliderItem;