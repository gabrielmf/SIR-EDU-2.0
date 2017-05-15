import React from 'react'
import { FlatButton, DatePicker, TextField } from 'material-ui'
import { Modal } from 'react-bootstrap'
import './Slider.scss'

class SliderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    close = () => {
        this.setState({open: false});
    }

    render() {
        const { item, editable } = this.props;
        const type = item.contentType.split('/')[0] || '';
        const url = 'http://localhost:3000/api/files/' + item._id;
        
        return (
            <div class="slider-item thumbnail">
                <div class="info" onClick={() => { this.setState({open: true}) }}>
                    {type === 'image' ?  <img src={url}/> :
                    <video draggable="true" preload="metadata" src={url}></video>}
                    <p class="comment">{item.metadata.comment}</p>
                </div>
                <div class="text-center">
                    <FlatButton label="Editar"/>&nbsp;
                    { editable && 
                        <FlatButton
                            label="Inserir" primary={true} 
                            onTouchTap={() => { this.props.actions.insert(url, item.metadata.comment); }}
                        />
                    }
                </div>
                <Modal show={this.state.open} onHide={this.close} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>Visualizar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="item-modal">
                            <div class="text-center">
                                { 
                                type === 'image' ? <img src={url}/> : 
                                <video draggable="true" controls preload="metadata" src={url}></video>
                                }
                            </div>
                            <DatePicker 
                                fullWidth={false} 
                                DateTimeFormat={Intl.DateTimeFormat} 
                                locale="pt-br"
                                floatingLabelFixed={true}
                                floatingLabelText="Data:"
                                value={item.metadata.date}
                            />
                            <p>{item.metadata.date}</p>
                            <div>
                                <TextField
                                    floatingLabelText="Comentário:"
                                    floatingLabelFixed={true}
                                    multiLine={true}
                                    fullWidth={true}
                                    value={item.metadata.comment}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
};

export default SliderItem;