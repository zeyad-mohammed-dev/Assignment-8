import { create, findById, findByIdAndUpdate } from '../../db/DBservices.js';
import { noteModel } from '../../db/models/note.model.js';
import { userModel } from '../../db/models/user.model.js';
import { NotFoundException } from '../../utils/exceptions.js';
import { isNoteExist, isUserExist_byId } from '../../utils/helpers.js';
import { successHandler } from '../../utils/successHandler.js';

/**
 B- Note APIs (6 Grades)
1. Create a Single Note (Get the id for the logged-in user (userId) 
from the token not the body) (send the token in the
headers) (0.5 Grade)
• URL: POST /notes
 */

export const addNote = async (req, res, next) => {
  const userId = req.user._id;
  const { title, content } = req.body;
  const user = await isUserExist_byId(userModel, userId);

  const note = await create({ model: noteModel, data: { title, content, userId } });
  return successHandler({ res, data: note });
};

/**
 * Update a single Note by its id and return the updated note.
 *  (Only the owner of the note can make this operation)
(Get the id for the logged-in user (userId) from the token not the body) (0.5 Grade)
• URL: PATCH /notes/:noteId => /notes/64d91c42d8979e1f30a12346 

 */

export const updateNote = async (req, res, next) => {
  const userId = req.user._id;
  const { title, content } = req.body;
  const noteId = req.params.noteId;

  const note = await isNoteExist(noteModel, noteId);

  if (userId.toString() !== note.userId.toString()) {
    throw new Error('you are not the owner', { cause: 403 });
  }

  const updatedNote = await findByIdAndUpdate({ model: noteModel, id: noteId, data: { title, content } });
  return successHandler({ res, data: updatedNote });
};

/**
 * 3. Replace the entire note document with the new data provided in the request body.
 *  (Only the owner of the note can make this operation) 
 * (Get the id for the logged-in user (userId) from the token not the body) 
 * (0.5 Grade) • URL:
PUT /notes/replace/:noteId=> /notes/replace/64d91c42d8979e1f30a12348

 */

export const replaceNote = async (req, res, next) => {
  const ownerId = req.user._id;
  const noteId = req.params.noteId;
  const { title, content, userId } = req.body;

  if (ownerId.toString() !== userId.toString()) {
    throw new Error('invalid entered userId pleace try again !', { cause: 400 });
  }

  const note = await isNoteExist(noteModel, noteId);
  if (ownerId.toString() !== note.userId.toString()) {
    throw new Error('you are not the owner', { cause: 403 });
  }

  const newNote = await noteModel.findOneAndReplace(
    { _id: noteId },
    {
      title,
      content,
      userId,
    },
    {
      new: true,
    }
  );

  return successHandler({ res, data: newNote });
};
