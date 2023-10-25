const express = require('express');
const router = express.Router ();

const department = require('../controllers/departmentController');

router.get('/department', department.getAllDepartments);

router.post('/department', department.createDepartment)

router.get('/department/:id', department.getDepartmentById)

router.put('/department/:id',department.updateDepartmentById)

router.delete('/department/:id',department.deleteDepartmentById)

module.exports = router;