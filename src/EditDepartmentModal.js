import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'


export const EditDepModal = (props) =>{
    const[depName, setDepartmentName] = useState(props.departmentName);

    useEffect(() => {
        setDepartmentName(props.departmentName)
    },[props.departmentName])
    
    const handleChangeControlled = (event) =>{
        setDepartmentName(event.target.value);
    }

    async function handleSubmit(){
        const res = await axios.put(`${process.env.REACT_APP_API}department/`, {departmentId: props.departmentId, departmentName: depName});
        await props.getDepartment();
        props.setIsEditOpen(false);
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
                            Edit Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form>
                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Department Name</Form.Label>
                                        <Form.Control type="text" name="DepartmentName" required placeholder="DepartmentName" value={depName} onChange={handleChangeControlled}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" onClick={handleSubmit}>
                                            Edit Department
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>
                            props.setIsEditOpen(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    )
}