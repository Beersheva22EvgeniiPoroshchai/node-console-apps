import express from 'express';
export const employees = express.Router();
import asyncHandler from 'express-async-handler'
import EmployeesService from '../service/EmployeesService.mjs';
import Joi from 'joi'
const employeesService = new EmployeesService();
const {minId, maxId, minDate, maxDate, departments, minSalary, maxSalary} = config.get('employee');
const schema = Joi.object({
    id: Joi.number().min(minId).max(maxId),
    birthDate: Joi.date().iso().less(maxDate).greater(minDate).required(),
    name: Joi.string().required(),
    department: Joi.any().allow(...departments).required(),
    salary: Joi.number().min(minSalary).max(maxSalary).required(),
    gender: Joi.any().allow('male', 'female').required()
})

employees.use(validate(schema));
employees.delete('/:id', authVerification("ADMIN"), asyncHandler(
    async (req, res) => {
        const id = +req.params.id;
        if (!await employeesService.deleteEmployee(id)){
            res.status(404);
            throw `employee with id ${id} not found`
        }
        res.send();
    }
))

employees.post('',authVerification("ADMIN"), asyncHandler(
    async (req, res) => {

        if(req.joiError) {
            res.status(400);
            throw req.joiError;
        }
        const employee = await employeesService.addEmployee(req.body);
        if (!employee && req.body.id) {
            res.status(400);
            throw `employee with id ${req.body.id} already exists`
        }
        res.send(employee);
    }
))
employees.put('/:id',authVerification("ADMIN"), asyncHandler(
    async (req, res) => {
        if(req.joiError) {
            res.status(400);
            throw req.joiError;
        }
        if (req.params.id != req.body.id) {
            res.status(400);
            throw `id in request parameter (${req.params.id}) doesn't match the id in employee object (req.body.id)`
        }
        const employee = await employeesService.updateEmployee(req.body);
        if (!employee) {
            res.status(404);
            throw `employee with id ${req.body.id} doesn't exist`
        }
        res.send(employee);
    }
))
employees.delete('/:id',authVerification("ADMIN"), asyncHandler(
    async (req,res) => {
        if(!await employeesService.deleteEmployee(+req.params.id)) {
            res.status(404);
            throw `employee with id ${req.params.id} doesn't exist`
        }
        res.send();
    }
))
 employees.get('', authVerification("ADMIN", "USER"),asyncHandler(
    async(req,res) => {
        const employees = await employeesService.getAllEmployees();
        res.send(employees);
    }
))
employees.get('/:id',authVerification("ADMIN", "USER"), asyncHandler(
   async (req, res) => {
    
    const employee = await employeesService.getEmployee(+req.params.id);
    if (!employee) {
        res.status(404);
        throw `employee with id ${req.params.id} doesn't exist`
    }
    res.send(employee)
   } 
))