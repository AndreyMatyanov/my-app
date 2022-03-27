import axios from 'axios';
import React,{useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'

import {Button, ButtonToolbar} from 'react-bootstrap'
import { AddDepModal } from './AddModal/AddDepartmentModal';
import { EditDepModal } from './EditModal/EditDepartmentModal';


export const Department = () =>{
    const [deps,setDeps] = useState([])

    useEffect(() => {
        getDepartment();
    },[])

    async function getDepartment() {
        const res = await axios.get(process.env.REACT_APP_API+'department');
        setDeps(res.data);
    }

    const[isOpen, setIsOpen] = useState(false);
    const[isEditOpen, setIsEditOpen] = useState(false);
    const[targetDepartmentId, setTargetDepartmentId] = useState();
    const[targetDepartmentName, setTargetDepartmentName] = useState();

    async function deleteDep(depId, depName){
        if(window.confirm('Are you sure about that?')){
            await axios.delete(process.env.REACT_APP_API+'department/'+depId);
            const res = await axios.get(process.env.REACT_APP_API+'department');
            setDeps(res.data);
        }

        const empRes = await axios.get(process.env.REACT_APP_API+'employee');
        await empRes.data.map(emp =>{
            if(emp.Department === depName){
                axios.delete(`${process.env.REACT_APP_API}employee/`+emp.EmployeeId);
            }
        })
    }

    const handleDepartmentEdit = (dep) => {
        setIsEditOpen(true) 
        setTargetDepartmentId(dep.DepartmentId)
        setTargetDepartmentName(dep.DepartmentName)
    }

    return(
        <div className="mt-5 d-flex flex-column justify-content-left">
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>DepartmentId</th>
                        <th>DepartmentName</th>
                        <th>Options</th>
                    </tr>

                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key={dep.DepartmentId}>
                            <td>{dep.DepartmentId}</td>
                            <td>{dep.DepartmentName}</td>
                            <td><Button
                            onClick ={() => {handleDepartmentEdit(dep)}}>Edit</Button> 
                            |
                            <Button className= "mr-2" variant = "danger" onClick ={()=>{deleteDep(dep.DepartmentId, dep.DepartmentName)}}>Delete</Button>
                            </td>
                        </tr>
                        )}
                </tbody>
            </Table>
            
            <ButtonToolbar>
                <Button onClick={()=> {setIsOpen(true)}} variant='primary'>
                    Add
                </Button>
            </ButtonToolbar>
            <AddDepModal show={isOpen} setIsOpen={setIsOpen} getDepartment={getDepartment}/>
            <EditDepModal show={isEditOpen} setIsEditOpen={setIsEditOpen} getDepartment={getDepartment} departmentId = {targetDepartmentId} departmentName = {targetDepartmentName}/>
        </div>
    )
}