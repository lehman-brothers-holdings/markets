import { PublicKey } from '@solana/web3.js';
import { MangoClient } from '../../src/client';
import { toUiDecimalsForQuote } from '../../src/utils';

async function main(): Promise<void> {
  const client = MangoClient.connectDefault(process.env.MB_CLUSTER_URL!);

  const group = await client.getGroup(
    new PublicKey('EPmFN4MZHUiLJwcwmmEH2rXTy4J8jMipJUz7iSbV9KWu'),
  );
  const mangoAccounts = await client.getAllMangoAccounts(group, true);
  const solPerp = group.getPerpMarketByName('SOL-PERP');
  const solPPs = mangoAccounts
    .filter(
      (a) =>
        a
          .perpActive()
          .filter(
            (pp) =>
              pp.marketIndex === solPerp.perpMarketIndex &&
              pp.getNotionalValueUi(solPerp) > 1000,
          ).length > 0,
    )
    .map((a) => {
      const pp = a
        .perpActive()
        .filter((pp) => pp.marketIndex === solPerp.perpMarketIndex)[0];
      pp['mangoAccount'] = a.publicKey;
      return pp;
    });

  solPPs.forEach((pp) => {
    let out = ``;
    out += `https://app.mango.markets/?address=${pp['mangoAccount']}, `;
    out += `bep ${pp.getBreakEvenPriceUi(solPerp)}, `;
    out += `aep ${pp.getAverageEntryPriceUi(solPerp)}, `;
    out += `uFunding ${pp.getUnsettledFundingUi(solPerp)}, `;
    out += `rPnl ${toUiDecimalsForQuote(pp.realizedPnlForPositionNative)}, `;
    out += `qRn ${toUiDecimalsForQuote(pp.quoteRunningNative)}, `;
    console.log(out);
  });
}

main();
