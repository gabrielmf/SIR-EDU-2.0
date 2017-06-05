import React from 'react'
import CardMediaItem  from 'components/Cards/MediaItem'
import CardJudgementItem from 'components/Cards/JudgementItem'
import './Slider.scss'

const cardTextStyle = {
    overflow: 'hidden',
    padding: '0 16px',
    height: 40
}

class SliderItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { item, editable, actions } = this.props;
        const type = item.hasOwnProperty('contentType') ? item.contentType.split('/')[0] : item.type;
        
        if (type === 'image' || type === 'video') {
            return (<CardMediaItem item={item} editable={editable} actions={actions}/>);
        } else {
            return (<CardJudgementItem item={item} editable={editable}/>);
        }
    }
};

export default SliderItem;