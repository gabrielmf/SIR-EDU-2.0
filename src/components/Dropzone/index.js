import React from 'react'
import Dropzone from 'react-dropzone'
import './dropzone.scss'

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
        this.onOpenClick = this.onOpenClick.bind(this)
        this.onDrop = this.onDrop.bind(this);
        preventDropOnDocument();
        this.file = this.props.initConfig || null;
        console.log('init', this.props.initConfig);
    }

    onOpenClick() {
        this.dropzone.open();
        console.log(this.dropzone);
    }

    onDrop = (files) => {
        console.log('interno', files[0])
        this.file = files;
        this.props.onDrop(files);
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
                            <img src={this.file[0].preview} class="img-thumbnail" height="auto" width="230"/> ||
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