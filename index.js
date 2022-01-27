import core from '@actions/core'
import axios from 'axios'
import { createHmac } from 'crypto'

const main = async () => {

  const url = core.getInput('url')
  const secret = core.getInput('secret')
  const payload = core.getInput('payload')

  const sig = 'sha256=' + createHmac('sha256', secret).update(payload).digest('hex')

  await axios.request({
    method: 'POST',
    data: JSON.parse(payload),
    headers: {
      'x-hub-signature-256': sig,
      'Content-Type': "application/json"
    }
  })

}

main().catch((err) => core.setFailed(err.message))