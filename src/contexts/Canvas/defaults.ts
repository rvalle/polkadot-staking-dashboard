// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { CanvasContextInterface } from './types';

export const defaultCanvasContext: CanvasContextInterface = {
  openCanvas: () => {},
  closeCanvas: () => {},
  setStatus: (s) => {},
  status: 0,
};
