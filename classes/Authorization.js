const Credentials = require('../model/credentials');

class Authorization  {
    //propriedades e funções da classe aqui
    constructor() {
    }

    clearance(clearance_string) {

    
        return async (req, res, next) => {


            try {  
                console.log(req.headers.authorization);
               } catch (err) {
                return res.status(500).json({message: err.message });
               }

            
            next();
        }

     
    }

    async issue(id, token, clearance) {
     try {
        const verify = await Credentials.findOne({  username : req.body.username });  
     } catch (err) {
        return res.status(500).json({message: err.message });
     } 
    }
    
}

module.exports = Authorization;