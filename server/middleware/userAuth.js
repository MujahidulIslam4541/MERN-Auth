import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // token থেকে userId attach করো req.user এ
    req.user = { id: decoded.id }; 
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
