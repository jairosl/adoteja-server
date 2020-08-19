class useController {
  async index(req, res) {
    return res.json({ hello: "world" });
  }
}

export default useController;
