import React from "react";
import Header from "./Header";
// import QuestionControl from "./QuestionControl";
import TicketControl from "./TicketControl";
// import Ticket from "./Ticket";


function App() {
  return (
    <React.Fragment>
      <div className="box">
        <Header />
        <TicketControl />
      </div>
    </React.Fragment>
  );
}

export default App; 
