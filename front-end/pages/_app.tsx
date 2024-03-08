import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import { NotificationProvider } from "../providers/common/NotificationProvider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </NotificationProvider>
  );
}

export default MyApp;
