import jwt from "jsonwebtoken";


const generateToken = (user) => {
  const payload = {
    ...user
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10h" });
  return token;
};

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return response.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('log: ', user);
      return response.sendStatus(403);
    }
    console.log('Utilisateur: ', user);
    request.user = user;
    next();
  });
};

const authorizeRole = (role) => {
  return (request, response, next) => {
    if (request.user && request.user.role === role) {
      next();
    } else {
      response.sendStatus(403);
    }
  };
};

const authenticateApiKey = (request, response, next) => {
  const apiKey = request.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return response.status(401).json({ message: "Invalid API key" });
  }
  next();
};

export {
  generateToken,
  authenticateToken,
  authorizeRole,
  authenticateApiKey
};
