import jwt from "jsonwebtoken";

const userAuth = async (req, res) => {
  const token = req.cookie;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized login again" });
  }
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized login again",
      });
    }
    next();
  } catch (error) {
    return req.json({ success: false, message: error.message });
  }
};

export default userAuth;
