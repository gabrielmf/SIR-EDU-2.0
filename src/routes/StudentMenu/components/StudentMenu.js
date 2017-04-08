import React from 'react'
import MenuItem from './MenuItem'

export default class StudentMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="row student-menu">
                <div class="col-md-12 text-center">
                    <h1>Menu de Registro</h1>
                </div>
                <div class="col-md-12">
                    <MenuItem/>
                </div>
            </div>
        );
    }
}