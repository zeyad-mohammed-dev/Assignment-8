import { create, find, findById, findByIdAndDelete, findByIdAndUpdate } from '../../db/DBservices.js';
import { noteModel } from '../../db/models/note.model.js';
import { userModel } from '../../db/models/user.model.js';
import { NotFoundException, NotValidUserIdException, UnAuthorizedException } from '../../utils/exceptions.js';
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
  const user = await isUserExist_byId(userId);

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

  const note = await isNoteExist(noteId);

  if (userId.toString() !== note.userId.toString()) {
    throw new UnAuthorizedException();
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
    throw new NotValidUserIdException();
  }

  const note = await isNoteExist(noteId);
  if (ownerId.toString() !== note.userId.toString()) {
    throw new UnAuthorizedException();
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

/**
 Updates the title of all notes created by a logged-in user.)
  (Get the new Title from the body) 
  (Get the id for the logged-in user (userId) from the token not the body) 
(0.5 Grade) • URL: PATCH /notes/all 
 */

export const updateAll = async (req, res, next) => {
  const ownerId = req.user.id;
  const { title } = req.body;

  const updatedNotes = await noteModel.updateMany({ userId: ownerId }, { title });
  let message = 'No note found';
  if (updatedNotes.modifiedCount > 0) {
    message = 'All notes updated';
  }

  return successHandler({ res, msg: message });
};

/**
 5. Delete a single Note by its id and return the deleted note. 
 (Only the owner of the note can make this operation)
(Get the id for the logged-in user from the token not the body) (0.5 Grade)
• URL: DELET /notes/:noteId => /notes/64d91c42d8979e1f30a12346 
 */

export const deleteNote = async (req, res, next) => {
  const ownerId = req.user.id;
  const noteId = req.params.noteId;

  const note = await isNoteExist(noteId);

  if (ownerId.toString() !== note.userId.toString()) {
    throw new UnAuthorizedException();
  }

  const deletedNote = await findByIdAndDelete({ model: noteModel, id: noteId });

  return successHandler({ res, data: deletedNote });
};

/**
 6. Retrieve a paginated list of notes for the logged-in user,
  sorted by “createdAt” in descending order. 
  (Get page and limit from query parameters) 
  (Get the id for the logged-in user (userId) from the token not the body) 
  (send the token in the headers) (0.5 Grade)
• URL: GET /notes/paginate-sort => for example /notes/paginate-sort?page=2&limit=3 
 */

export const getUserNotes = async (req, res, next) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;

  const userId = req.user._id;

  const notes = await noteModel.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);

  return successHandler({ res, data: notes });
};

/**
 7. Get a note by its id. 
 (Only the owner of the note can make this operation)
  (Get the id for the logged-in user (userId)
from the token not the body) (0.5 Grade)
• URL: GET /notes/:id => /posts/64a3baf1e567890124 

 */

export const getNoteById = async (req, res, next) => {
  const ownerId = req.user._id;
  const noteId = req.params.id;

  const note = await isNoteExist(noteId);

  if (ownerId.toString() !== note.userId.toString()) {
    throw new UnAuthorizedException();
  }

  return successHandler({ res, data: note });
};

/**
 8. Get a note for logged-in user by its content. 
 (Get the id for the logged-in user (userId) from the token not the body)
(0.5 Grade)
• URL:  => / notes/note-by-content?content=Workout Plan 
 */

export const getNoteByContent = async (req, res, next) => {
  const content = req.query.content;
  const userId = req.user._id;

  const note = await noteModel.findOne({ content, userId });
  if (!note) {
    throw new NotFoundException('note');
  }

  return successHandler({ res, data: note });
};

/**
 9. Retrieves all notes for the logged-in user with user information, 
 selecting only the “title, userId and createdAt”
from the note and the “email” from the user.
 (Get the id for the logged-in user (userId) from the token not the body) (0.5 Grade)
• URL: GET /notes/note-with-user

 */

export const getNotesWithUser = async (req, res, next) => {
  const userId = req.user._id;

  const notes = await noteModel.find({ userId }).select('title userId createdAt').populate('userId', 'email -_id');

  return successHandler({ res, data: notes });
};
