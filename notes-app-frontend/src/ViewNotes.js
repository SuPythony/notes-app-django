import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ViewNotes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {notes: [{title: "Loading...", content: ""}]};
  }

  async componentDidMount() {
    let response = await fetch("http://localhost:8000/notes/");
    let notes = await response.json();
    this.setState({notes});
  }

  async deleteNote(id) {
    const requestOptions = {
       method: 'DELETE',
       headers: { 'Content-Type': 'application/json' },
       withCredentials: true,
       crossorigin: true,
     };
     await fetch(`http://localhost:8000/notes/delete/${id}/`, requestOptions)
     this.componentDidMount();
  }

  render() {
    if (this.state.notes.length > 0) {
      return (
        <>
        <ToastContainer />
        <h1>Your Notes</h1>
        {this.state.notes.map((note, index) => (
          <Card key={index}>
            <Card.Body as={Row} className="align-items-center">
              <Col>
                <Card.Title>
                  {note.title}
                </Card.Title>
                <Card.Text>
                  {note.content}
                </Card.Text>
              </Col>
              <Col>
                <Link to={`/edit/${note.id}`}>
                  <Button>Edit</Button>
                </Link>
                {" "}
                <Button onClick={(e) => {
                  this.deleteNote(note.id);
                  toast.info(({closeToast}) => (
                  <>
                    <DeleteIcon color="primary" />
                    Deleted!
                  </>
                  ), {
                    autoClose: 1750,
                    transition: Flip,
                  });
                }}>Delete</Button>
              </Col>
            </Card.Body>
          </Card>
        )
      )}
      <Link to="/create">
        <Button>Create Note</Button>
      </Link>
      </>
      );
    } else {
      return (
        <>
        <ToastContainer />
        <p>No notes yet!</p>
      <Link to="/create">
        <Button>Create Note</Button>
      </Link>
      </>
      );
    }
  }
}

export default ViewNotes;
