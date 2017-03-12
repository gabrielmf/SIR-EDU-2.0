import React from 'react'
import Dropzone from 'react-dropzone'
import './dropzone.scss'

export default class DropzoneComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onOpenClick = this.onOpenClick.bind(this)
    }

    onOpenClick() {
        this.dropzone.open();
    }

    render() {
        return (
            <div class="dropzone-component">
                <Dropzone ref={(dropzone) => {this.dropzone = dropzone; }}
                    onDrop={this.props.onDrop}
                    accept={this.props.accept}
                    multiple={this.props.multiple}
                    disableClick={true}>
                    <div class="dropzone-content">
                        <i class="fa fa-cloud-upload fa-5x" aria-hidden="true"></i>
                        <h4>{this.props.text}</h4>
                        <button type="button" class="btn btn-success btn-lg" onClick={this.onOpenClick}>
                            Selecionar arquivo
                        </button>
                    </div>
                </Dropzone>
            </div>
        );
    }
}