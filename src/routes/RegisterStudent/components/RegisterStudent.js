import React from 'react'
import RegisterForm from './RegisterForm'
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './RegisterStudent.scss'

export default class RegisterStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 0,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(form) {
        console.log('enviando form', form);
        //this.props.saveStudent(this.state);
    }

    handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

    render() {
        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div class="container register-student">
                <div class="col-md-12">
                    <h1>Cadastro de Aluno</h1>
                    <Stepper linear={false} activeStep={stepIndex}>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 0})}>
                            Preencha os dados do aluno
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 1})}>
                            Atividades Extraclasse
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 2})}>
                            Necessidades Educacionais Especiais
                            </StepButton>
                        </Step>
                        </Stepper>
                        <div style={contentStyle}>
                        <div class="register-student-form col-md-12">
                            <RegisterForm step={stepIndex} handleSubmit={this.handleSubmit}/>
                        </div>
                        <div class="col-md-12 text-center">
                            <div class="stepper-pagination">
                                <FlatButton
                                label="Back"
                                disabled={stepIndex === 0}
                                onTouchTap={this.handlePrev}
                                style={{marginRight: 12}}
                                />
                                <RaisedButton
                                label="Next"
                                disabled={stepIndex === 2}
                                primary={true}
                                onTouchTap={this.handleNext}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}