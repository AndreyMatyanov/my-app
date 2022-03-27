import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap'


export const AddEmpModal = (props) =>{
    const employeeNameField = useRef();
    const [photoFileName, setPhotoFileName] = useState('anonymous.png');
    const [imagescr, setImagescr] = useState(process.env.REACT_APP_PHOTOPATH+photoFileName);

    const [deps,setDeps] = useState([])

    useEffect(()=>{
        handleDepSubmit();
    })

    async function handleDepSubmit(){
        const res = await axios.get(process.env.REACT_APP_API+'department');
        setDeps(res.data);
    }

    async function handleSubmit(event){
        event.preventDefault();
        const res = await axios.post(process.env.REACT_APP_API+'employee', {
            EmployeeName: employeeNameField.current.value,
            Department: event.target.Department.value,
            DateOfJoining: event.target.DateOfJoining.value,
            PhotoFileName: photoFileName
        });
        await props.getEmployee();
        setPhotoFileName('anonymous.png');
        setImagescr(process.env.REACT_APP_PHOTOPATH+photoFileName);
        props.setIsOpen(false);
    }


    function handleFileSelect(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );
        const res = axios.post(process.env.REACT_APP_API+ 'Employee/SaveFile', formData);
        setPhotoFileName(event.target.files[0].name);
        setImagescr(process.env.REACT_APP_PHOTOPATH+event.target.files[0].name);

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
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control type="text" name="EmployeeName" required placeholder="EmployeeName" ref={employeeNameField}/>
                                    </Form.Group>

                                    <Form.Group controlId="Department">
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control as="select">
                                            {deps.map(dep=><option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>Date of joing</Form.Label>
                                        <Form.Control 
                                        type="date" 
                                        name = "DateOfJoining"
                                        required
                                        placeholder="DateOfJoining">
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                                Add Department
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Form>
                                    <Image width="200px" height="200px" src={imagescr}/>  
                                    <input 
                                    type="file"
                                    accept="image/png"
                                    id="contained-button-content"
                                    name="customFile"
                                    onChange={handleFileSelect}/>
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