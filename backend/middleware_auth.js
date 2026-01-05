app.use(cors());
app.use(express.json());
import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  req.user = jwt.verify(token, "SECRET");
  next();
}
