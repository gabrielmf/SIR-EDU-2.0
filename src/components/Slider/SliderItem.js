import React from 'react'
import { RaisedButton } from 'material-ui'
import './Slider.scss'

const SliderItem = (props) => {
    const { item, editable } = props;
    const type = item.contentType.split('/')[0] || '';
    const url = 'http://localhost:3000/api/files/' + item._id;
    
    return (
        <div class="slider-item thumbnail" style={{minWidth: 200, maxWidth: 250}}>
            {type === 'image' ?  <img src={url}/> :
            <video draggable="true" preload="metadata" src={url}></video>}
            <p class="comment">{item.metadata.comment}</p>
            <div class="text-center">
                <RaisedButton label="Visualizar"></RaisedButton>&nbsp;
                { editable && <RaisedButton label="Inserir" primary={true}></RaisedButton>}
            </div>
        </div>
    )
};

export default SliderItem;