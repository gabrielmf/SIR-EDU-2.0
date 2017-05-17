import React from 'react'
import SlickSlider from 'react-slick'
import './Slider.scss'

class Slider extends React.Component {
  constructor(props) {
      super(props);
  }

  shouldComponentUpdate(nextProps) {
      return this.props.children !== nextProps.children;
  }
  
  render() {
    const settings = {
      dots: true,
      speed: 500,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      lazyLoad: true,
      draggable: true,
      className: 'slider-border'
    };

    return (
      <div class="slider-toolbar">
        <SlickSlider {...settings}>
            {this.props.children}
        </SlickSlider>
      </div>
    );
  }
};

export default Slider;