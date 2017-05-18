import { FlatButton, Dialog } from 'material-ui'
import React from 'react'

class DialogModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.props.onClose}
            />
        ]

        return (
            <Dialog
                actions={actions}
                modal={true}
                open={this.props.open}
            >
                {this.props.children}
            </Dialog>
        );
    }
}

export default DialogModal;