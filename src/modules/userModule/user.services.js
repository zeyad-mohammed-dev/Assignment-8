/**
 * APIs ( Ensure you apply the folder structure we discussed)
A- User APIs (2.5 Grades)
1. Signup (make sure that the email does not exist before) (Don’t forget to hash the password and encrypt the phone). (0.5
Grade)
• URL: POST /users/signup
 */

import { create, findOne } from "../../db/DBservices.js"
import { userModel } from "../../db/models/user.model.js"
import {  NotValidEmail } from "../../utils/exceptions.js"
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
    return next(new NotValidEmail())
  }
  const user = await create({model: userModel , data : {name , email , password , phone , age}})
  
  return successHandler({res , status : 201 , msg  : "✅ Done " , data : user})
}