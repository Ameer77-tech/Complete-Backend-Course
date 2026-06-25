import createUsers from "../services/createUser.service"

const createUserController = (req, res) => {
    const response = createUsers(req.body)
    if(response.success){
        return res.status(200).json(response)
    }else{
        return res.status(500).json({ message : "Internal Server Error", success : false })
    }
}