import React from 'react'
import MenuItem from './MenuItem'

export default class StudentMenu extends React.Component {
    constructor(props) {
        super(props);
        console.log('menu', this.props);
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
                </div>
            }
            </div>
        );
    }
}