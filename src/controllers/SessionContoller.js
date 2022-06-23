import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth"

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = User.findOne(email);

    if (!user) {
      res.status(401).json({ error: "User / password invalid." });
    }

    if (!checkPassword(user, password)) {
      res.status(401).json({ error: "User / password invalid." });
    }

    const { id } = user;

    return res.json({
        user: {
            id: id,
            email: email
        },
        token: jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn
        })
    });
  }
}

export default new SessionController();
