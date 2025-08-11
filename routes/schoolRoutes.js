import express from 'express';
import { addSchool, listSchools } from '../controllers/schoolController.js';
const router = express.Router();

router.post('/addSchools', addSchool);
router.get('/listSchools', listSchools);

export default router;
