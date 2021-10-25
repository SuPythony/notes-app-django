import React from "react";
import CreateNote from "./CreateNote";
import ViewNotes from "./ViewNotes";
import EditNote from "./EditNote";
import FormSubmitted from "./FormSubmitted";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/">
          <ViewNotes />
        </Route>
          <Route path="/create">
          <Link to="/">Your Notes</Link>
            <CreateNote />
          </Route>
          <Route path="/submitted">
            <FormSubmitted />
          </Route>
          <Route path="/edit/:id" render={(props) => (<><Link to="/">Your Notes</Link><EditNote {...props} /></>) } />
        </Switch>
      </Router>
    );
  }
}

export default App
