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

const getStudent = (students, id) => {
    let student = null;

    if (students && students.length > 0) {
        student = students.filter((sdnt) => sdnt._id === id);
    }

    return student && student.length > 0 ? student[0] : null;
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
        const student = getStudent(students.list, routeParams.id);
        
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