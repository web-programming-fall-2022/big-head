/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { protobufAny } from './protobufAny';

export type runtimeStreamError = {
  grpc_code?: number;
  http_code?: number;
  message?: string;
  http_status?: string;
  details?: Array<protobufAny>;
};
