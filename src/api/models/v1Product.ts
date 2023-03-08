/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { v1Category } from './v1Category';
import type { v1Rating } from './v1Rating';

export type v1Product = {
  id?: number;
  score?: number;
  title?: string;
  url?: string;
  status?: string;
  imageUrl?: string;
  rate?: v1Rating;
  categories?: Array<v1Category>;
  price?: string;
};
