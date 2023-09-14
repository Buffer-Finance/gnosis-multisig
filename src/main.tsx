import ReactDOM from 'react-dom'
import SafeProvider from '@safe-global/safe-apps-react-sdk'

import App from './App'

ReactDOM.render(
  <SafeProvider
    opts={{
      allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
      debug: false,
    }}
    loader={<>hello</>}
  >
    <App />
  </SafeProvider>,
  document.getElementById('root'),
)
