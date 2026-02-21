import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  await getPayload({ config })
  process.exit(0)
}

main()
