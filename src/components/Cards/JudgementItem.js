import React from 'react'
import { FlatButton, DatePicker, TextField } from 'material-ui'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Modal } from 'react-bootstrap'

const cardTextStyle = {
    overflow: 'hidden',
    padding: '0 16px',
    height: 40
}

class JudgementItem extends React.Component {
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
        const date = new Date(item.date);
        const displayDate = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

        return (
            <div>
            <Card style={{margin: 5}}>
                <CardMedia>
                    <div class="pull-left" style={{height: 125, padding: '16px'}}>
                        <i class="pull-left fa fa-pencil-square-o"
                           aria-hidden="true"
                           style={{margin:0, fontSize:'7em'}}></i>
                        <div style={{paddingTop: 46}}>
                            <strong class="pull-left">Parecer</strong>
                            <CardTitle subtitle={item.title || ''}/>
                        </div>
                    </div>
                </CardMedia>
                <CardTitle subtitle={displayDate} style={{padding: '2px 16px 5px', cursor: 'pointer'}}
                           onClick={() => { this.setState({open: true}) }}/>
                <CardText style={cardTextStyle}>
                    <p dangerouslySetInnerHTML={{__html: item.text}}/>
                </CardText>
                <CardActions>
                    <FlatButton label="Editar"/>
                    <FlatButton label="Remover" secondary={true} />
                </CardActions>
            </Card>
            <Modal show={this.state.open} onHide={this.close} bsSize="large" backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Visualizar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="item-modal">
                            <div class="text-center">
                                Aluno
                            </div>
                            <TextField
                                floatingLabelText="Data:"
                                floatingLabelFixed={true}
                                value={displayDate}
                            />
                            <div>
                                <p dangerouslySetInnerHTML={{__html: item.text}}/>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
};

export default JudgementItem;