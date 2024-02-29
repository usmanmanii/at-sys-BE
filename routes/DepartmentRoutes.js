const express = require('express');
const router = express.Router ();

const department = require('../controllers/departmentController');
const authenticateToken = require('../middleware/jwtmiddleware');
const admin = require('../middleware/onlyAdmin');


router.get('/department', authenticateToken, department.getAllDepartments);

router.post('/department', authenticateToken, admin, department.createDepartment);

router.get('/department/:id', authenticateToken, department.getDepartmentById);

router.put('/department/:id', authenticateToken, admin, department.updateDepartmentById);

router.delete('/department/:id', authenticateToken, admin, department.deleteDepartmentById);

module.exports = router;