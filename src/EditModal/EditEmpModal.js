import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap'


export const EditEmpModal = (props) =>{
    const [employeeName, setEmployeeName] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [photoFileName, setPhotoFileName] = useState('');
    const [imagescr, setImagescr] = useState(process.env.REACT_APP_PHOTOPATH+photoFileName);

    const [deps,setDeps] = useState([]);

    useEffect(()=>{
        handleDepSubmit();  
        setEmployeeName(props.employeeName);
        setDateOfJoining(props.dateOfJoining);
        setPhotoFileName(props.photoFileName);
        setImagescr(process.env.REACT_APP_PHOTOPATH+props.photoFileName);
    },[props.employeeName, props.department, props.dateOfJoining, props.photoFileName])

    const handleChangeEmployeeNameControlled = (event) =>{
        setEmployeeName(event.target.value);
    }

    const handleChangeDateOfJoiningControlled= (event) =>{
        setDateOfJoining(event.target.value);
    }

    async function handleDepSubmit(){
        const res = await axios.get(process.env.REACT_APP_API+'department');
        setDeps(res.data);
    }

    async function handleSubmit(event){
        await axios.put(`${process.env.REACT_APP_API}employee/`, {
            employeeId: props.employeeId,
            EmployeeName: employeeName,
            Department: event.target.Department.value,
            DateOfJoining: event.target.DateOfJoining.value,
            PhotoFileName: photoFileName
        });
        await props.getEmployee();
        props.setIsEditOpen(false);
    }


    function handleFileSelect(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );
        axios.post(process.env.REACT_APP_API+ 'Employee/SaveFile', formData);
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
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="EmployeeName">
                                        <Form.Label>Employee Name</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="EmployeeName" 
                                        required 
                                        placeholder="EmployeeName" 
                                        value={employeeName} 
                                        onChange={handleChangeEmployeeNameControlled}/>
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
                                        placeholder="DateOfJoining"
                                        value = {dateOfJoining}
                                        onChange={()=> handleChangeDateOfJoiningControlled()}>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                                Edit Department
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
                                    onChange={() => handleFileSelect()}/>
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