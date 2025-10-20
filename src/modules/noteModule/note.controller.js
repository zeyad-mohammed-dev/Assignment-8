import { Router } from 'express';
import * as noteService from './note.services.js';
import { auth } from '../../middlewares/auth.middleware.js';
const router = Router();

router.post('/',auth(), noteService.addNote);

router.patch('/:noteId',auth(), noteService.updateNote);

router.put('/replace/:noteId' , auth() , noteService.replaceNote)

export default router