import React from 'react'
import MenuItem from './MenuItem'
import Slider from 'components/Slider'
import SliderItem from 'components/Slider/SliderItem';
import LoadingSpinner from 'components/LoadingSpinner';
import defaultAvatar from 'public/default-avatar.png'
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

const timelineCarousel = (items) => {
    return items.map((item, index) =>(
        <div key={index}>
            <SliderItem item={item} editable={false}/>
        </div>)
    )
}

const searchStudent = (students, id) => {
    let student = students.filter((student) => student._id === id);
    return student.length > 1 ? null : student[0]; 
}

export default class StudentMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null
        }
    }

    componentDidMount() {
        const { students, getFiles, getJudgements, routeParams } = this.props;
        getFiles(routeParams.id);
        getJudgements(routeParams.id);
        this.setState({student: searchStudent(students.list, routeParams.id)});
    }

    render() {
        const { judgements, files } = this.props;
        const timelineList = judgements.list.concat(files.list);
        
        return (
            <div>
            { this.state.student && 
                <nav class="navbar navbar-default student-header">
                    <div class="row">
                        <div class="col-md-2">
                            <img class="thumbnail avatar" src={defaultAvatar}/>
                        </div>
                        <div class="col-md-4">
                            <TextField floatingLabelText="Nome:" value={this.state.student.name} underlineShow={false} />
                            <Divider />
                        </div>
                        <div class="col-md-4">
                            <TextField floatingLabelText="Escola:" value={this.state.student.school || ''} underlineShow={false} />
                            <Divider />
                        </div>
                        <div class="col-md-1">
                            <TextField floatingLabelText="Turma:" value={this.state.student.classNumber || ''} underlineShow={false} />
                            <Divider />
                        </div>                             
                    </div>
                </nav>
            }
            <LoadingSpinner loading={files.isFetching || judgements.isFetching}/>
            { this.props.children ? this.props.children :
                <div class="row student-menu">
                    <div class="col-md-12 text-center">
                        <h1>Menu de Registro</h1>
                    </div>
                    <div class="col-md-12">
                        <MenuItem location={this.props.location}/>
                    </div>
                    <div class="col-md-12 timeline">
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