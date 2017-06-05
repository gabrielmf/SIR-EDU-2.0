import React from 'react'
import MenuItem from './MenuItem'
import Slider from 'components/Slider'
import SliderItem from 'components/Slider/SliderItem';
import LoadingSpinner from 'components/LoadingSpinner';

const timelineCarousel = (items) => {
    return items.map((item, index) =>(
        <div key={index}>
            <SliderItem item={item} editable={false}/>
        </div>)
    )
}

export default class StudentMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timelineList: []
        }
    }

    componentDidMount() {
        const { getFiles, getJudgements, routeParams } = this.props;
        getFiles(routeParams.id);
        getJudgements(routeParams.id);
    }

    render() {
        const { judgements, files } = this.props;
        const timelineList = judgements.list.concat(files.list);
        
        return (
            <div>
            <LoadingSpinner loading={files.isFetching || judgements.isFetching}/>
            { this.props.children ? this.props.children :
                <div class="row student-menu">
                    <div class="col-md-12 text-center">
                        <h1>Menu de Registro</h1>
                    </div>
                    <div class="col-md-12">
                        <MenuItem location={this.props.location}/>
                    </div>
                    <div class="col-md-12">
                        { timelineList.length &&
                          <Slider>
                              {timelineCarousel(timelineList)}
                          </Slider>
                        }
                    </div>
                </div>
            }
            </div>
        );
    }
}