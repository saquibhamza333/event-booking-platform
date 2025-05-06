import  {db}  from "../config/db.js";

const authModal = {

    async isUserExists(email){
        console.log("email", email)
        
        const query = "Select email from users where email = ?"
        const result = await db.query(query, [email]);
        console.log("res", result[0])
        return result[0]

    }
    

}
export default authModal 