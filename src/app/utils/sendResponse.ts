import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
export const sendResponseWithToken = async <T>(
  res: Response,
  data: TResponse<T>
) => {
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    token: data.token,
    data: data.token,
  });
};
