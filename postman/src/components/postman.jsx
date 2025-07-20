import { useState } from 'react';
import {Dropdown, Navbar, Container, InputGroup,Form,Button,FloatingLabel} from 'react-bootstrap'

const Postman = () => {
    const [method,setMethod] = useState('Select Method');
    const [Url,setUrl] = useState("");
    const [body,setBody] = useState("");
    const [Response,setResponse] = useState("")

    const handleSend = async () => {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if ((method === 'POST' || method === 'PUT') && body) {
      options.body = body;
    }

    const res = await fetch(Url, options);
    const data = await res.json();

    setResponse(JSON.stringify(data, null, 2));
  } catch (error) {
    setResponse(`Error: ${error.message}`);
  }
};


    return (
        <>
      <Navbar className="bg-body-tertiary px-5">
          <Navbar href="#home">Postman clone</Navbar>
      </Navbar>

           <Container>
    <div className="d-flex mt-5  " style={{ gap: '0px', width: '100%' }}>
      {/* Dropdown with fixed width */}
      <div>
        <Dropdown onSelect={(eventKey) => setMethod(eventKey)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="rounded-0 ">
            {method}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="GET" >GET</Dropdown.Item>
            <Dropdown.Item eventKey="POST">POST</Dropdown.Item>
            <Dropdown.Item eventKey="PUT">PUT</Dropdown.Item>
            <Dropdown.Item eventKey="DELETE">DELETE</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* InputGroup takes remaining space */}
      <InputGroup className="flex-grow-1">
        <Form.Control
          placeholder="Enter URL"  
          aria-label="Enter URL"
          className="rounded-0"
          value={Url}
          onChange={(e)=>setUrl(e.target.value)}
        />
        <Button variant="outline-secondary" 
        id="button-addon2" 
        className="rounded-0"
        onClick={handleSend}
        >
          Send
        </Button>
      </InputGroup>
    </div>
         <FloatingLabel controlId="floatingTextarea2" label="Body" className='mt-2'>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          value={body}
          onChange={(e)=>setBody(e.target.value)}
        />
      </FloatingLabel>

       <div>
        <FloatingLabel controlId="text-output" label="Response" className='mt-2'>
        <Form.Control
          as="textarea"
          style={{ height: '100px' }}
          value={Response}
          readOnly
        />
      </FloatingLabel>
       </div>
           </Container>
        </>
    )
}

export default Postman;