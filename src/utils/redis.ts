import { createClient } from 'redis'
export const client = createClient({
  url: process.env.REDIS_URL
})
client.on('connect', () => {
  console.log('Đã kết nối Redis!')
})
client.on('error', (err) => console.log('Redis Client Error', err))

export async function runRedis() {
  await client.connect() // Kết nối Redis

  // Lưu trữ giá trị
  await client.set('name', 'Alice')

  // Lấy giá trị
  const value = await client.get('name')
  console.log('Giá trị từ Redis:', value) // Alice

  // Đóng kết nối
  await client.disconnect()
}
