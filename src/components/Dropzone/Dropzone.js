import React from 'react'
import Dropzone from 'react-dropzone'
import IconButton from 'material-ui/IconButton';
import './Dropzone.scss'

const preventDropOnDocument = () => {
    window.addEventListener("dragover",function(e){
        e = e || event;
        e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
        e = e || event;
        e.preventDefault();
    },false);
}

export default class DropzoneComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onOpenClick = this.onOpenClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.removeFile = this.removeFile.bind(this);
        preventDropOnDocument();
        this.file = this.props.initConfig || null;
    }

    onOpenClick() {
        this.dropzone.open();
    }

    onDrop = (files) => {
        this.file = files[0];
        this.props.onDrop(this.props.name, files[0]);
    }

    removeFile() {
        this.file = null;
        this.props.onDrop(this.props.name, null);
    }

    render() {
        return (
            <div class="dropzone-component">
                <Dropzone ref={(dropzone) => {this.dropzone = dropzone; }}
                    className="dropzone-box"
                    activeClassName="dropzone-box-active"
                    onDrop={this.onDrop}
                    accept={this.props.accept}
                    multiple={this.props.multiple}
                    disableClick={true}>
                    <div class="dropzone-content">
                        {
                            this.file && 
                            <div>
                                <img src={this.file.preview} class="img-thumbnail" height="100" width="230"/>
                                <IconButton iconClassName="fa fa-times" 
                                    onTouchTap={this.removeFile}
                                    tooltip="Remover arquivo"
                                    tooltipPosition="bottom-right"
                                />
                            </div> ||
                            <div>
                                <i class="fa fa-cloud-upload fa-5x" aria-hidden="true"></i>
                                <h5>{this.props.text}</h5>
                                <button type="button" class="btn btn-success" onClick={this.onOpenClick}>
                                    Selecionar arquivo
                                </button>
                            </div>
                        }
                    </div>
                </Dropzone>
            </div>
        );
    }
}