import React, {useRef} from 'react'
import axios from 'axios';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'


export const AddDepModal = (props) =>{
    const departmentNameField = useRef()

    async function handleSubmit(){
        const res = await axios.post(process.env.REACT_APP_API+'department', {departmentName: departmentNameField.current.value});
        await props.getDepartment();
        props.setIsOpen(false);
    }

    return(
            <div className="container">
                <Modal
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form>
                                    <Form.Group controllid="DepartmentName">
                                        <Form.Label>DepartmentName</Form.Label>
                                        <Form.Control type="text" name="DepartmentName" required placeholder="DepartmentName" ref={departmentNameField}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" onClick={handleSubmit}>
                                            Add Department
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>
                            props.setIsOpen(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    )
}