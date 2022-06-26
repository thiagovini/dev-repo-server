import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth"

class SessionController {
  async create(req, res) {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({email: email});
  
      if (!user) {
        return res.status(401).json({ error: "User / password invalid." });
      }
  
      if (!checkPassword(user, password)) {
        return res.status(401).json({ error: "User / password invalid." });
      }
      
      console.log(user)
  
      const { _id } = user;
  
      return res.json({
          user: {
              id: _id,
              email: email
          },
          token: jwt.sign({ _id }, authConfig.secret, {
              expiresIn: authConfig.expiresIn
          })
      });
    } catch (error) {
      return res.status(500).json({error: 'Internal Server Error.'})
    }
  }
}

export default new SessionController();
