import React, {Component} from "react";
import Auxiliar from "./Auxiliar";
import Modal from "../components/UI/Modal/Modal";


const WithErrorHandler = (ChildComponent) => {
    return class extends Component {

        state = { error: null }

        handleError = (error) => {
            this.setState({error: error});
        }

        toggleModal = () => {
            this.setState({error: null});
        }

        render(){
            return (
                <Auxiliar>
                    <Modal show={this.state.error} onHideModal={this.toggleModal}>
                        { this.state.error ? this.state.error : null }
                    </Modal>
                    <ChildComponent {...this.props} onError={(error) => this.handleError(error)}/>
                </Auxiliar>
            );
        }
    }
}

export default WithErrorHandler;