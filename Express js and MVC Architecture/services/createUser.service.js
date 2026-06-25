let users = []
import crypto from "crypto"

const createUsers = (data) => {
    const id = crypto.randomUUID()
    users.push({
        id : id,
        ...data
    })
    return { message : "User Created", success : true, id : id }
}

export default createUsers