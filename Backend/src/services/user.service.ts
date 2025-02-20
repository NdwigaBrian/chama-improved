import {v4} from 'uuid'
import bcrypt from 'bcryptjs'
import lodash from 'lodash'
import { user } from '../interfaces/user';



export class userService{

    async registerUser(user:user){
        // let pool = await mssql.connect(sqlConfig)

        let user_id = v4() 
        let hashedPassword = bcrypt.hashSync(user.password, 6)

            //check if email exists
            let emailExists = (await Connection.query(`SELECT * FROM Users WHERE email = '${user.email}'`)).recordset
            
            if(!lodash.isEmpty(emailExists)){       
                return {
                    error: "Email already in use"
                }
            }

            let phoneNoExists = (await Connection.query(`SELECT * FROM Users WHERE phone_number = '${user.phone_number}'`)).recordset

            if(!lodash.isEmpty(phoneNoExists)){
                return {
                    error: "Phone number already in use"
                }
            }

            // let result = (await pool.request()
            // .input("id", mssql.VarChar, user_id)
            // .input("name", user.name)
            // .input("email", user.email)
            // .input("phone_number", user.phone_number)
            // .input("password", hashedPassword)
            // .input("createdAt", new Date().getTime().toString())
            // .execute("registerUser")).rowsAffected

            let result = (await Connection.execute("registerUser", {id:user_id, name: user.name, email: user.email, phone_number: user.phone_number, password:hashedPassword, createdAt: new Date().getTime().toString()})).rowsAffected

            if(result[0] = 1){
                return {
                    message: "Account created successfully"
                }
            }else{
                return {
                    error: "Unable to create account"
                }
            }            

    }

    async fetchAllUsers(){
        let pool = await mssql.connect(sqlConfig)

        let result = (await pool.request().execute("getAllUsers")).recordset

        if(result.length == 0){
            return {
                message: "No users at the moment"
            }
        }else{
            return {
                users: result
            }
        }
    }

    async fetchSingleUser(user_id:string){
        let user = await (await Connection.query(`SELECT * FROM Users WHERE id = '${user_id}'`)).recordset

        console.log(user);
        
        if(!user[0].id){
            return {
                error: "User not found"
            }
        }else{
            return {
                user: user[0]
            }
        }
    }

    async switchRoles(user_id:string){
        let response = await this.fetchSingleUser(user_id)

        if(response.user.id){
            let response = (await Connection.query(`UPDATE Users SET role = 'admin' WHERE role = 'user' AND id = '${user_id}'`)).rowsAffected

            if(response[0] < 1){
                return {
                    error: "Unable to changed user role"
                }
            }else{
                return {
                    message: "User role changed successfully"
                }
            }
        }else{
            return {
                error: "User not found"
            }
        }

        
    }
}