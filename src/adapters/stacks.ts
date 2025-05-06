export interface StacksReward {
  cycleId: number
  rewarded: null | number
  rewardAddress: string
  snapshots: number[]
  snapshotsPerCycle: number
  blocksPerSnapshot: number
}

export function getStacksRewards(): Promise<StacksReward[]> {
  return fetch(
    'https://sbtc-server.degenlab.io/yield-stats?network=mainnet&address=SP3N1FSQMFQGEBDH4SZB7A4FAMZ3FNGMEY3GYGSDF',
  ).then((response) => {
    console.log({ response })
    return response.json()
  })
}
