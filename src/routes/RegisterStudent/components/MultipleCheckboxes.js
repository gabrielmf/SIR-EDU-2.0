import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Checkbox } from 'material-ui';

export default class MultipleCheckboxes extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render = () => {
        console.log('a')
        return (
        <div>{this.props.specialNeeds.map((sn, index) => {
                return (
                    <div key={index} class="col-md-6">
                        <Checkbox
                            label={sn.name}
                            checked={this.props.values.indexOf(sn.name) > -1}
                            onCheck={() => {this.props.handleCheckboxGroup(sn.name)}}
                        />
                    </div>
                )})}}
        </div>);
    }
}