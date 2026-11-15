import type { JwtPayload } from "jsonwebtoken";

interface IAuthenticatedUser extends JwtPayload {
  id: number;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IAuthenticatedUser;
    }
  }
}

export {};
