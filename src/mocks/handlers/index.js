// mocks/handlers/index.js
import { authHandlers } from './authHandlers';
import { characterHandlers } from './characterHandlers';
import { exploreHandlers } from './exploreHandlers';
import {mapHandlers } from './mapHandlers'

export const handlers = [
  ...authHandlers,
  ...characterHandlers,
  ...exploreHandlers,
  ...mapHandlers,
];
