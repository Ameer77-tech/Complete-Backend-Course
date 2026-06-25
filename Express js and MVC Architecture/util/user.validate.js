const validate = (req, res, next) => {
    if(!req.body || req.body == undefined){
        return res.status(400).json({ success : false, message : "Fill All Details" })
    }
    const {id, name, email} = req.body
    if(id == "" || !id){
        return res.status(400).json({ success : false, message : "Id Is Required" })
    }
    if(name == "" || !name){
        return res.status(400).json({ success : false, message : "Name Is Required" })
    }
    if(email == "" || !email){
        return res.status(400).json({ success : false, message : "email Is Required" })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
         error: "Invalid email format",
  });
}
next()
}

export default validate