import React from 'react'
import { Checkbox } from 'material-ui';

export default class MultipleCheckboxes extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.values.length !== this.props.values.length) {
            return true;
        } else {
            return nextProps.values.length && nextProps.values.every((v,i)=> v !== this.props.values[i]);
        }
    }

    render = () => {
        return (
        <div>{this.props.specialNeeds.map((sn, index) => {
                return (
                    <div key={index} class="col-md-6">
                        <Checkbox
                            label={sn.name}
                            defaultChecked={this.props.values.indexOf(sn.name) > -1}
                            onCheck={() => {this.props.handleCheckboxGroup(sn.name)}}
                        />
                    </div>
                )})}
        </div>);
    }
}