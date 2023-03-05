/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { protobufAny } from './protobufAny';

export type runtimeError = {
  error?: string;
  code?: number;
  message?: string;
  details?: Array<protobufAny>;
};
