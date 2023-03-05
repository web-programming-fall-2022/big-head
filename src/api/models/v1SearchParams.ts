/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { v1Ranker } from './v1Ranker';

export type v1SearchParams = {
  top_k?: number;
  ranker?: v1Ranker;
};
