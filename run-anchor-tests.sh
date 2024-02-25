#!/bin/bash

# WALLET_WITH_FUNDS=~/.config/solana/mango-devnet.json
# PROGRAM_ID=LEH4u6EgtyVzqtwK1eB6fdgxJHX7HuARvgNdXKubw2h

anchor build -- --features enable-gpl
./idl-fixup.sh
RUST_BACKTRACE=full anchor test --skip-build
