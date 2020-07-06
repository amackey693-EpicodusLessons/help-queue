import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';




const questionArray = ["Have you gone through all the steps on the Learn How to Program debugging lesson?",
  "Have you asked another pair for help?",
  "Have you spent 15 minutes going through through the problem documenting every step?"];

class TicketControl extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedTicket: null,
      editing: false, 
      currentQuestionNumber: 0 
    };
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const {dispatch} = this.props;
    const {id, names, location, issue} = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id, 
      names: names, 
      location: location, 
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false, 
      selectedTicket: null
    });
  }

  handleEditClick = (id) =>{
    console.log("handleEditClick reached!");
    this.setState({editing: true });
  }

  handleDeletingTicket = (id) => {
    const {dispatch} = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({ selectedTicket: null});
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const {dispatch} = this.props;
    const {id, names, location, issue} = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id, 
      names: names, 
      location: location, 
      issue: issue,
    }
    dispatch(action);
    this.setState({
      formVisibleOnPage: false,
      currentQuestionNumber: 0
    });
  }

  handleClick = () => {  
    if (this.state.formVisibleOnPage) {
      this.setState({
        currentQuestionNumber: 0,
      })
    } else if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleQuestionClick = () => {
    this.setState(prevState => {
      return { currentQuestionNumber: prevState.currentQuestionNumber + 1 }
    });

    console.log(this.state.currentQuestionNumber);
  }

  handleBackClick = () => {
    this.setState({
      currentQuestionNumber: 0,
    })
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    let buttonPage = null;
    let breakButton = null;
    let backButton = null;
    // Code from coursework
    if (this.state.editing) {
      currentlyVisibleState = 
      <EditTicketForm 
        ticket = {this.state.selectedTicket}
        onEditTicket = {this.handleEditingTicketInList}
      />
      buttonText = "Return to Ticket List"
      buttonPage = this.handleClick;
    } 
    else if (this.state.selectedTicket !=null) {
      currentlyVisibleState = 
      <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket} 
        onClickingEdit = {this.handleEditClick}
      />
      buttonText = "Return to Ticket List";
      buttonPage = this.handleClick;

    } 
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = 
      <NewTicketForm 
        onNewTicketCreation={this.handleAddingNewTicketToList}
      />
      buttonText = "Return to Ticket List";
      buttonPage = this.handleBackClick;
    } 
    // Code for question #1
    else if (this.state.currentQuestionNumber === 1) {
      currentlyVisibleState = questionArray[0];
      buttonPage = this.handleQuestionClick;
      buttonText = "Yes";
      breakButton = <br />;
      backButton = <button onClick={this.handleBackClick}>No</button>
    } 
    // Code for question #2
    else if (this.state.currentQuestionNumber === 2) {
      currentlyVisibleState = questionArray[1];
      buttonPage = this.handleQuestionClick;
      buttonText = "Yes";
      breakButton = <br />;
      backButton = <button onClick={this.handleBackClick}>No</button>
    } 
    // Code for question #3
    else if (this.state.currentQuestionNumber === 3) {
      currentlyVisibleState = questionArray[2];
      buttonPage = this.handleClick;
      buttonText = "Yes";
      breakButton = <br />;
      backButton = <button onClick={this.handleBackClick}>No</button>
    }
    // Code from coursework
    else {
      currentlyVisibleState = 
      <TicketList 
        ticketList={this.props.masterTicketList} 
        onTicketSelection = {this.handleChangingSelectedTicket}
      />;
      buttonText = "Add Ticket";
      buttonPage = this.handleQuestionClick;
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        {breakButton}
        <button onClick={buttonPage}>{buttonText}</button>
        {backButton}
      </React.Fragment >
    );
  }
}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterTicketList: state
  }
}
TicketControl = connect(mapStateToProps)(TicketControl);
export default TicketControl;