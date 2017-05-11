import React from 'react'
import SlickSlider from 'react-slick'
import SliderItem from './SliderItem'
import Toolbar from './Toolbar'
import './Slider.scss'

const files = (items) => {
    return items.map((item, index) =>(<div key={index}><SliderItem item={item}></SliderItem></div>))
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
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      variableWidth: true,
      className: 'slider-border'
    };

    const filesList = files(this.props.items);
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