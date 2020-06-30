import React from "react";
import LessonQuestion1 from "./LessonQuestion1";
import PairQuestion2 from "./PairQuestion2";
import TimeQuestion3 from "./TimeQuestion3";
import TicketList from "./TicketList";
import NewTicketForm from "./NewTicketForm";

class QuestionControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question1Response: false,
      question2Response: false,
      question3Response: false,
      clickCounter: 0
    }
  }

  handleClick = () => {
    this.setState(prevState => {
      return { clickCounter: prevState.clickCounter + 1 }
    });
    if (this.state.clickCounter === 0) {
      this.setState(prevState => ({
        question1Response: !prevState.question1Response
      }));
    } else if (this.state.clickCounter === 1) {
      this.setState(prevState => ({
        question1Response: !prevState.question1Response,
        question2Response: !prevState.question2Response
      }));
    } else if (this.state.clickCounter === 2) {
      this.setState(prevState => ({
        question2Response: !prevState.question2Response,
        question3Response: !prevState.question3Response
      }));
    } else if (this.state.clickCounter >= 4) {
      this.setState({
        clickCounter: 0,
        question3Response: false
      })
    }
    console.log(this.state.clickCounter);
    console.log("Q1 " + this.state.question1Response + " Q2 " + this.state.question2Response + " Q3 " + this.state.question3Response);
  }

  render() {
    let currentlyVisibleQuestion = null;
    let buttonText = null;
    if (this.state.clickCounter === 4) {
      currentlyVisibleQuestion = <NewTicketForm />
      buttonText = "Submit Ticket";
    } else if (this.state.clickCounter > 4) {
      currentlyVisibleQuestion = <TicketList />
      buttonText = "Submit Question";
    }
    else if (this.state.question1Response) {
      currentlyVisibleQuestion = <LessonQuestion1 />
      buttonText = "Yes";
    } else if (this.state.question2Response) {
      currentlyVisibleQuestion = <PairQuestion2 />
      buttonText = "Yes";
    } else if (this.state.question3Response) {
      currentlyVisibleQuestion = <TimeQuestion3 />
      buttonText = "Yes";
    } else {
      currentlyVisibleQuestion = <TicketList />
      buttonText = "Submit Question";
    }
    return (
      <React.Fragment>
        {currentlyVisibleQuestion}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default QuestionControl;

//showQuestions
  //1
  //2
  //3
//showForm
//showTicketList