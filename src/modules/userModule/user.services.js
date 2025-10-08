/**
 * APIs ( Ensure you apply the folder structure we discussed)
A- User APIs (2.5 Grades)
1. Signup (make sure that the email does not exist before) (Don’t forget to hash the password and encrypt the phone). (0.5
Grade)
• URL: POST /users/signup
 */

import jwt from "jsonwebtoken"
import { create, findById, findByIdAndDelete, findByIdAndUpdate, findOne } from "../../db/DBservices.js"
import { userModel } from "../../db/models/user.model.js"
import {  NotFoundException, NotValidCredentialsException, NotValidEmailException, NotValidTokenException } from "../../utils/exceptions.js"
import { successHandler } from "../../utils/successHandler.js"

/**
 * • name (String, required)
• email (String, Unique, required)
• Password (String, required)
• Phone (String, required)
• age (Number) (Must be between 18 and 60)
`
 */
export const signup =  async(req , res , next) => {
  const {name , email , password , phone , age } = req.body
  const isExist = await findOne({model : userModel , filter : {email}})
  if (isExist) {
    return next(new NotValidEmailException())
  }
  const user = await create({model: userModel , data : {name , email , password , phone , age}})
  
  return successHandler({res , status : 201 , msg  : "✅ Done " , data : user})
}

/**
 * Create an API for authenticating users (Login)
 *  and return a JSON Web Token (JWT) that contains the userId and will expire
after “1 hour”. (Get the email and the password from the body).
 (0.5 Grade) • URL: POST /users/login
 */

 export const login = async (req , res , next ) => {
  const {email , password} = req.body
  const user = await findOne({model : userModel , filter : {email}})
  if (!user || password != user.password) {
    return next(new NotValidCredentialsException)
  }

  const accessToken = jwt.sign({_id : user._id} , process.env.ACCESS_TOKEN , {expiresIn:"1Hr"} )
  const refreshToken = jwt.sign({_id : user._id} , process.env.REFRESH_TOKEN , {expiresIn:"7D"})

  return successHandler({res , status : 200 , data : {accessToken , refreshToken}})
 }

 /**
  * Update logged-in user information (Except Password).
  *  (If user want to update the email, check the new email
    doesn’t exist before. (Get the id for the logged-in user 
    (userId) from the token not the body)
     (send the token in the
    headers) (0.5 Grade)
• URL: PATCH /users
  */
 /**
 * • name (String, required)
• email (String, Unique, required)
• Password (String, required)
• Phone (String, required)
• age (Number) (Must be between 18 and 60)
`
 */

export const updateUser = async (req , res , next ) => {
  const updateData = req.body
   if (updateData.password) {
    return next(new Error("🔒 You Not Authorized to change password right now"))
  }
  if (updateData.email) {
    const email = updateData.email
    const isExist = await findOne({model : userModel , filter :{email}})
    if (isExist) {
      return next(new NotValidEmailException)
    }
  }
  
  const id = req.user._id
  
  const updatedUser = await findByIdAndUpdate({model : userModel , id  , data:{
    name : updateData.name ,
    email : updateData.email ,
    phone : updateData.phone ,
    age : updateData.age
  }})

  return successHandler({res , status : 200 , data:updatedUser})


}


/**
 * Delete logged-in user. (
 * Get the id for the logged-in user (userId) from the token not the body) 
 * (send the token inthe headers) (0.5 Grade)
• URL: DELETE /users
 */

export const deleteUser = async (req , res , next ) => {
  const id = req.user._id
  const DeletedUser = await findByIdAndDelete({model : userModel , id  })
  return successHandler({res, data : DeletedUser})
}