import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "user is not authenticated" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // -callback funkcija
    if (err) {
      return res.status(401).json({ message: "user is not authenticated" });
    }
    req.body.user_id = decoded.user_id;
    // - decoded yra visas dekoduotas objektas, kury mes paduodam token'o kūrimo metu(tarp controllers>user.js, login funkcijos).
    return next();
  });
};

export { authUser };
