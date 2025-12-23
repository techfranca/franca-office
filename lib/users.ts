import bcrypt from "bcryptjs";

export const USERS_DB = {
  gabriel: {
    name: "Gabriel",
    role: "CEO",
    passwordHash: bcrypt.hashSync("ceo@franca", 10),
  },
  bruna: {
    name: "Bruna",
    role: "Social Media Manager",
    passwordHash: bcrypt.hashSync("socialmedia@franca", 10),
  },
  guilherme: {
    name: "Guilherme",
    role: "Design Lead",
    passwordHash: bcrypt.hashSync("design@franca", 10),
  },
  leonardo: {
    name: "Leonardo",
    role: "Gestor de Tráfego",
    passwordHash: bcrypt.hashSync("trafego@franca", 10),
  },
  davidson: {
    name: "Davidson",
    role: "Tech Lead",
    passwordHash: bcrypt.hashSync("tech@franca", 10),
  },
} as const;
