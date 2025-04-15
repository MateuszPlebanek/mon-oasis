// types.d.ts
import type { Request } from "express";

export interface CustomRequest extends Request {
  user?: { id: string; email: string };
}
