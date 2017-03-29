import React from 'react'
import SlickSlider from 'react-slick'
import Toolbar from './Toolbar'
import './Slider.scss'

class Slider extends React.Component {
  constructor(props) {
      super(props);
  }
  
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      className: 'slider-border'
    };
    return (
      <div class="slider-toolbar">
        <Toolbar/>
        <SlickSlider {...settings}>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </SlickSlider>
      </div>
    );
  }
};

export default Slider;