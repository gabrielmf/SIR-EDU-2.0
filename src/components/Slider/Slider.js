import React from 'react'
import SlickSlider from 'react-slick'
import SliderItem from './SliderItem'
import Toolbar from './Toolbar'
import './Slider.scss'

const files = (items, editable) => {
    return items.map((item, index) =>(<div key={index}><SliderItem item={item} editable={editable}></SliderItem></div>))
}

class Slider extends React.Component {
  constructor(props) {
      super(props);
  }

  shouldComponentUpdate(nextProps) {
      return this.props.items !== nextProps.items;
  }
  
  render() {
    const settings = {
      dots: true,
      speed: 500,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      lazyLoad: true,
      className: 'slider-border'
    };

    const filesList = files(this.props.items, this.props.editable || false);
    console.log(filesList)
    return (
      <div class="slider-toolbar">
        {/*<Toolbar/>*/}
        <SlickSlider {...settings}>
            {filesList}
        </SlickSlider>
      </div>
    );
  }
};

export default Slider;