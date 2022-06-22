import User from "../models/User";
import Repository from "../models/Repository";

class RepositoriesController {
  async index(req, res) {
    try {
      const { user_id } = req.params;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User Not Found." });
      }

      const repositories = await Repository.find({
        userId: user_id,
      });

      res.json(repositories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async create(req, res) {
    try {
      const { user_id } = req.params;
      const { name, url } = req.body;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User Not Found." });
      }
      const repository = await Repository.findOne({
        userId: user_id,
        name,
      });
      if (repository) {
        res.status(422).json({ message: `Repository ${name} already exists` });
      }
      const newRepository = await Repository.create({
        name: name,
        url: url,
        userId: user_id,
      });
      return res.status(200).json(newRepository);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async destroy(req, res) {
    try {
      const { user_id, id } = req.params;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: " User Not Found." });
      }
      const repository = await Repository.findOne({
        userId: user_id,
        id: id,
      });
      if (!repository) {
        return res.status(404).json({ message: " Repository Not Found." });
      }
      Repository.deleteOne(repository);
      return res.status(200).json({ id: id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
}

export default new RepositoriesController();
