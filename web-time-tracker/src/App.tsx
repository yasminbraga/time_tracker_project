import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";
import { Router } from "./routes";
import styles from "./App.module.scss";

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </main>
  );
}
