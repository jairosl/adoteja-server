// import AppError from "../../errors/AppError";

class useController {
  async index(req, res) {
    res.json({ hello: "world" });
  }
}

export default useController;
