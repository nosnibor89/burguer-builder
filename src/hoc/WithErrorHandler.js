import React, { useState } from "react";
import Auxiliar from "./Auxiliar";
import Modal from "../components/UI/Modal/Modal";

const WithErrorHandler = ChildComponent => {
  return props => {
    const [error, setError] = useState(null);

    const handleError = currentError => {
      setError(currentError);
    };

    const toggleModal = () => {
      setError(null);
    };

    return (
      <Auxiliar>
        <Modal show={error} onHideModal={toggleModal}>
          {error ? error : null}
        </Modal>
        <ChildComponent {...props} onError={error => handleError(error)} />
      </Auxiliar>
    );
  };
};

export default WithErrorHandler;
