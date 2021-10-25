import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      validated: false,
      title: "",
      note: "",
      titleCount: 0,
      noteCount: 0,
    };
  }

  async componentDidMount() {
    let response = await fetch("http://localhost:8000/notes/");
    let notes = await response.json();
    let filtered = notes.filter((item) => item.id === parseInt(this.props.match.params.id));
    let note = filtered[0];
    this.setState({
      title: note.title,
      note: note.content,
      titleCount: note.title.length,
      noteCount: note.content.length,
    });
  }

  async handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    const requestOptions = {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ id: this.props.match.params.id, title: this.state.title, content: this.state.note })
     };
     await fetch(`http://localhost:8000/notes/put/${this.props.match.params.id}/`, requestOptions)
     this.setState({validated: true});
  }

  handleChange(e) {
    if (e.target.name === "title") {
      if (100 - e.target.value.length >= 0) {
        this.setState({
          title: e.target.value,
          titleCount: e.target.value.length,
        });
      }
    } else if (e.target.name === "note") {
      if (1000 - e.target.value.length >= 0) {
        this.setState({
          note: e.target.value,
          noteCount: e.target.value.length,
        });
      }
    }
  }

  render() {
    return (
      <><h1>Edit Note</h1>
      <Form noValidate autoComplete="off" validated={this.state.validated} onSubmit={this.handleSubmit} action="http://localhost:3000/submitted">
        <Form.Group className="mb-3" controlId="noteTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" aria-describedby="titleCount" placeholder="Note Title" value={this.state.title} onChange={this.handleChange} name="title" required />
          <Form.Text id="titleCount" muted>{this.state.titleCount}/100</Form.Text>
          <Form.Control.Feedback type="invalid">Please enter a title</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea"  aria-describedby="noteCount" placeholder="The Note" value={this.state.note} onChange={this.handleChange} name="note" required />
          <Form.Text id="noteCount" muted>{this.state.noteCount}/1000</Form.Text>
          <Form.Control.Feedback type="invalid">Please enter the note</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Save Note</Button>
      </Form></>
    );
  }
}

export default EditNote;
