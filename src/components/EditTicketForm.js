import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditTicketForm (props) {
  const {ticket} = props;

  function handleEditTicketFormSubmission(event) {
    event.PreventDefault();
    props.onEditTicket({
      names: event.target.names.value, 
      location: event.target.location.value, 
      issue: event.targetissue.value, 
      id: ticket.id
    });
  }

  return ( 
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler = {handleEditTicketFormSubmission}
        buttonText="Update Ticket"
      />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  onEditTicket: PropTypes.func
}
export default EditTicketForm;