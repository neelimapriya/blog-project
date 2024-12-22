import { NextFunction, Request, Response } from "express";
import {
  getReasonPhrase,
  getStatusCode,
  ReasonPhrases,
  StatusCodes,
} from "http-status-codes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({
      success: false,
      message: "API not found",
      error: "",
    })
    .send(ReasonPhrases.OK);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  });

  res.status(getStatusCode("Internal Server Error")).send({
    error: "Internal Server Error",
  });
};
