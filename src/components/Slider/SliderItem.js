import React from 'react'
import { RaisedButton } from 'material-ui'
import './Slider.scss'

const SliderItem = (props) => {
    const { item } = props;
    const type = item.contentType.split('/')[0] || '';
    const url = 'http://localhost:3000/api/files/' + item._id;
    
    return (
        <div class="slider-item thumbnail">
            {type === 'image' ?  <img src={url}/> :
            <video draggable="true" preload="metadata" src={url}></video>}
            <p class="comment">Description</p>
            <RaisedButton label="Visualizar"></RaisedButton>&nbsp;
            <RaisedButton label="Inserir" primary={true}></RaisedButton>
        </div>
    )
};

export default SliderItem;