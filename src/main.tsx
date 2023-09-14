import ReactDOM from "react-dom/client";
import SafeProvider from "@safe-global/safe-apps-react-sdk";
import { SafeApp } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SafeProvider
    opts={{
      allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
      debug: false,
    }}
    loader={<>hello</>}
  >
    <SafeApp />
  </SafeProvider>
);
