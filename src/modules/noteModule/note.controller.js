import { Router } from 'express';
import * as noteService from './note.services.js';
import { auth } from '../../middlewares/auth.middleware.js';
const router = Router();

router.post('/',auth(), noteService.addNote);

router.patch('/all' , auth() , noteService.updateAll)

router.patch('/:noteId',auth(), noteService.updateNote);

router.put('/replace/:noteId' , auth() , noteService.replaceNote)

router.delete('/:noteId' ,auth() , noteService.deleteNote)

router.get('/paginate-sort' , auth() , noteService.getUserNotes)



export default router