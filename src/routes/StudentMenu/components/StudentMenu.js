import React from 'react'
import MenuItem from './MenuItem'
import Slider from 'components/Slider'
import SliderItem from 'components/Slider/SliderItem'
import LoadingSpinner from 'components/LoadingSpinner'
import StudentHeader from 'components/StudentHeader'

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
    }

    componentDidMount() {
        const { getFiles, getJudgements, routeParams } = this.props;
        getFiles(routeParams.id);
        getJudgements(routeParams.id);
    }

    render() {
        const { students, routeParams, judgements, files } = this.props;
        const timelineList = judgements.list.concat(files.list);

        timelineList.sort((item, nextItem) => {
            let dateA = new Date(item.date);
            let dateB = new Date(nextItem.date);

            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }

            return 0;
        });

        const student = students.selectedStudent;
        
        return (
            <div>
                <LoadingSpinner loading={files.isFetching || judgements.isFetching}/>
                {student ? <StudentHeader student={student}/> : null}
                <div class="container">
                    { this.props.children ? this.props.children :
                    <div class="row student-menu">
                        <div class="col-md-12 text-center">
                            <h1>Menu de Registro</h1>
                        </div>
                        <div class="col-md-12">
                            <MenuItem location={this.props.location}/>
                        </div>
                        <div class="col-md-12 timeline">
                            { timelineList.length > 0 &&
                            <Slider class="col-md-12">
                                {timelineCarousel(timelineList)}
                            </Slider>
                            }
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}