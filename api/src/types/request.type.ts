import { Request } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

export interface RequestWithUser<
  P = {},
  ResBody = {},
  ReqBody = {},
  ReqQuery = {}
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: DecodedIdToken;
}
