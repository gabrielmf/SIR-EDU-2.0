import React from 'react'
import { FlatButton, DatePicker, TextField, Paper } from 'material-ui'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import './JudgementItem.scss'

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
        const { item, editable, students } = this.props;
        const date = new Date(item.date);
        const displayDate = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
        const student = students.selectedStudent;

        return (
            <div class="judgement-item">
                <Card style={{margin: 5}}>
                    <div style={{height: 125, padding: '16px', cursor: 'pointer'}} onClick={() => { this.setState({open: true}) }}>
                        <div class="pull-left" >
                            <i  class="fa fa-pencil-square-o"
                                aria-hidden="true"
                                style={{margin:0, fontSize:'7em'}}>
                            </i>
                        </div>
                        <div style={{paddingTop: 46}}>
                            <strong>Parecer</strong>
                            <CardTitle style={{padding: '0'}} subtitle={item.title || ''}/>
                        </div>
                    </div>
                    <CardTitle subtitle={displayDate} style={{padding: '2px 16px 5px'}}/>
                    <CardText style={cardTextStyle}>
                        <div dangerouslySetInnerHTML={{__html: item.text}}/>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Editar"/>
                        <FlatButton label="Remover" secondary={true} />
                    </CardActions>
                </Card>
                <Modal show={this.state.open} onHide={this.close} backdrop="static" dialogClassName="judgement-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Visualizar Parecer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="judgement-content">
                            <Paper class="judgement-text" zDepth={4}>
                                <div class="text-center">
                                    {student.name}
                                </div>
                                <div>
                                    <TextField
                                        floatingLabelText="Data:"
                                        floatingLabelFixed={true}
                                        value={displayDate}
                                    />
                                </div>                                
                                <div dangerouslySetInnerHTML={{__html: item.text}}/>
                            </Paper>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    students: state.students
})

export default connect(mapStateToProps, {})(JudgementItem)