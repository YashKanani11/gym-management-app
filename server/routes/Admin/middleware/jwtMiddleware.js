import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: "Unsuccessfull",
        message: "No token, please login",
      });
    }
    const decoded = jwt.verify(token, "YK2002.yk");
    console.log("Token:", req.cookies.token);
    res.user = decoded;
    console.log(res.user);
    next();
  } catch (error) {
    console.log(
      "Encountered error while fetching token in jwtMiddleware",
      error
    );
    return res.status(401).json({
      status: "Unsuccessfull",
      message: "Encountered error while fetching token in jwtMiddleware",
    });
  }
};

export default jwtMiddleware;
