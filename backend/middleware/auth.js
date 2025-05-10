import jwt from "jsonwebtoken";


export const validateAccessToken = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        function (err, decoded) {
          if (err) {
            return res.status(401).json({
              success: false,
              message: err.name,
            });
          } else {
            req.user = decoded;
            next();
          }
        }
      );
    } else {
      return res
        .status(403)
        .send({ status: false, message: 'Access Token Required' });
    }
  } else {
    return res
      .status(500)
      .send({ status: false, message: 'This route require authorization.' });
  }
}
