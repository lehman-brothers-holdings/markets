import { BN } from '@project-serum/anchor';

export class FlashLoanWithdraw {
  static index: number;
  static amount: BN;
}

export class FlashLoanType {
  static unknown = { unknown: {} };
  static swap = { swap: {} };
}
