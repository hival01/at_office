/**
 * common/helpers/response/general-response.ts — Unified API Response Builder
 *
 * ALL API responses should go through this helper to ensure a consistent JSON shape.
 *
 * Canonical response shape:
 * {
 *   "success": boolean,
 *   "message": string,
 *   "data": any,
 *   "meta": { pagination info, etc. }  // optional
 * }
 */

import { Request, Response } from 'express';
import { HttpStatus } from '../../constants/http.constants';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface GeneralResponseOptions {
  req: Request;
  res: Response;
  data?: unknown;
  message?: string;
  statusCode?: number;
  meta?: PaginationMeta;
}

export function generalResponse({
  res,
  data = null,
  message = 'Success',
  statusCode = HttpStatus.OK,
  meta,
}: GeneralResponseOptions): Response {
  const responseBody: Record<string, unknown> = {
    success: statusCode < 400,
    message,
    data,
  };

  if (meta) {
    responseBody.meta = meta;
  }

  return res.status(statusCode).json(responseBody);
}
