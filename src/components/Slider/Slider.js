import React from 'react'
import SlickSlider from 'react-slick'
import Toolbar from './Toolbar'
import './Slider.scss'

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
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      className: 'slider-border'
    };

    const { items } = this.props;
    
    return (
      <div class="slider-toolbar">
        {/*<Toolbar/>*/}
        <SlickSlider {...settings}>
          <div>
            {items.map((item, index) => ( 
              <img key={index} src={'http://localhost:3000/api/files/' + item._id}/>
            ))}
          </div>
        </SlickSlider>
      </div>
    );
  }
};

export default Slider;