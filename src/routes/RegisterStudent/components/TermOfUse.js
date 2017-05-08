import React from 'react'
import { RaisedButton, Dialog, FlatButton } from 'material-ui'

export default class TermOfUse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openTermOfUse: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.setState({ openTermOfUse: true });
    }

    close() {
        this.setState({ openTermOfUse: false });
    }

    render() {
        const actions = 
            <FlatButton
                label="Fechar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.close}
            />;
        
        return (
            <div>
                <RaisedButton
                    label="Termo de Uso"
                    default={true}
                    onTouchTap={this.open}
                />
                <Dialog title="Termo de Uso"
                    open={this.state.openTermOfUse}
                    actions={actions}
                    onRequestClose={this.close}>
                </Dialog>
            </div>
        );
    }
}