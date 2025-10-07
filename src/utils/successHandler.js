export const successHandler =  ({res , status = 200 , msg = "✅ Done " , data}) => {
res.status(status || 200).json({
    msg ,
    status ,
    data 
})
  
}