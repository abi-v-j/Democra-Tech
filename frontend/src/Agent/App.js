import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./theme";
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
import Router from "./routes";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />    
      </ThemeProvider>
    </HelmetProvider>
    
  );
}
