import React from 'react'
import MenuItem from './MenuItem'
import Slider from 'components/Slider'

export default class StudentMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getFiles, routeParams } = this.props;
        getFiles(routeParams.id);
    }

    render() {
        return (
            <div>
            { this.props.children ? this.props.children :
                <div class="row student-menu">
                    <div class="col-md-12 text-center">
                        <h1>Menu de Registro</h1>
                    </div>
                    <div class="col-md-12">
                        <MenuItem location={this.props.location}/>
                    </div>
                    {/*{ this.props.files.list.length && <Slider items={this.props.files.list}/> }*/}
                </div>
            }
            </div>
        );
    }
}