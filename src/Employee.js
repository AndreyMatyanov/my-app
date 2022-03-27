import axios from 'axios';
import React,{useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import {Button, ButtonToolbar} from 'react-bootstrap'
import { AddEmpModal } from './AddModal/AddEmpModal';
import { EditEmpModal } from './EditModal/EditEmpModal';

export const Employee = () => {
    const [emps,setEmps] = useState([])

    useEffect(() => {
        getEpmloyee();
    },[])

    const[isOpen, setIsOpen] = useState(false);
    const[isEditOpen, setIsEditOpen] = useState(false);
    const[targetEmployeeId, setTargetEmployeeId] = useState();
    const[targetEmployeeName, setTargetEmployeeName] = useState();
    const[targetDepartment, setTargetDepartment] = useState();
    const[targetDateOfJoining, setTargetDateOfJoining] = useState();
    const[targetPhotoFileName, setTargetPhotoFileName] = useState();

    async function deleteEmp(empId){
        if(window.confirm('Are you sure about that?')){
            await axios.delete(process.env.REACT_APP_API+'employee/'+empId);
            const res = await axios.get(process.env.REACT_APP_API+'employee');
            setEmps(res.data);
        }
    }

    async function getEpmloyee() {
        const res = await axios.get(process.env.REACT_APP_API+'employee');
        setEmps(res.data);
    }

    const handleEmployeeEdit = (emp) => {
        setIsEditOpen(true);
        setTargetEmployeeId(emp.EmployeeId);
        setTargetEmployeeName(emp.EmployeeName);
        setTargetDepartment(emp.Department);
        setTargetDateOfJoining(emp.DateOfJoining);
        setTargetPhotoFileName(emp.PhotoFileName);
    }


    return(
        <div className="mt-5 d-flex flex-column justify-content-left">
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>EmployeeId</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Date of joining</th>
                    </tr>

                </thead>
                <tbody>
                    {emps.map(emp=>
                        <tr key={emp.EmployeeId}>
                            <td>{emp.EmployeeId}</td>
                            <td>{emp.EmployeeName}</td>
                            <td>{emp.Department}</td>
                            <td>{emp.DateOfJoining}</td>
                            <td><Button
                            onClick ={() => handleEmployeeEdit(emp)}>Edit</Button> 
                            |
                            <Button className= "mr-2" variant = "danger" onClick ={()=>{deleteEmp(emp.EmployeeId)}}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button onClick={()=> setIsOpen(true)} variant='primary'>
                    Add
                </Button>
            </ButtonToolbar>
            <AddEmpModal show={isOpen} setIsOpen={setIsOpen} getEmployee={getEpmloyee}/>
            <EditEmpModal 
            show={isEditOpen} 
            setIsEditOpen={setIsEditOpen} 
            getEpmloyee={getEpmloyee} 
            employeeId = {targetEmployeeId} 
            employeeName = {targetEmployeeName}
            department = {targetDepartment}
            dateOfJoining = {targetDateOfJoining}
            photoFileName = {targetPhotoFileName}/>
        </div>
    )
}