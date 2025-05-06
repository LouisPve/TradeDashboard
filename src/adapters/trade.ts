export interface Trade {
  id: number
  symbol: string
  price: number
  quantity: number
  date: string
  pnl?: number
}

export async function getTrades(): Promise<Trade[]> {
  // Simulate an API call to fetch trades
  // In a real-world scenario, you would replace this with an actual API call
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return Promise.resolve([
    {
      id: 1,
      symbol: 'AAPL',
      price: 150.0,
      quantity: 10,
      pnl: 1,
      date: '2023-10-01',
    },
    {
      id: 2,
      symbol: 'GOOGL',
      price: 2800.0,
      quantity: 5,
      pnl: 3,
      date: '2023-10-02',
    },
    {
      id: 3,
      symbol: 'AMZN',
      price: 3400.0,
      quantity: 2,
      pnl: -2,
      date: '2023-10-03',
    },
  ])
}
