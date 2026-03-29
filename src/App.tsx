import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Index from "./pages/Index";
import Simulate from "./pages/Simulate";
import Report from "./pages/Report";
import ReportViewer from "./pages/ReportViewer";
import Compare from "./pages/Compare";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import Articles from "./pages/Articles";
import ArticleHouseVsStocks from "./pages/ArticleHouseVsStocks";
import ArticleRentVsBuy2026 from "./pages/ArticleRentVsBuy2026";
import ArticleFirstTimeBuyer2026 from "./pages/ArticleFirstTimeBuyer2026";
import ArticlesEs from "./pages/ArticlesEs";
import ArticleCasaVsBolsa from "./pages/ArticleCasaVsBolsa";
import ArticleAlquilarOComprar2026 from "./pages/ArticleAlquilarOComprar2026";
import ArticleGuiaComprarPrimeraVivienda2026 from "./pages/ArticleGuiaComprarPrimeraVivienda2026";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/simulate" element={<Simulate />} />
            <Route path="/report" element={<Report />} />
            <Route path="/r/:id" element={<ReportViewer />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/house-vs-stocks-what-the-data-really-says" element={<ArticleHouseVsStocks />} />
            <Route path="/articles/rent-vs-buy-2026-data-driven-decision-guide" element={<ArticleRentVsBuy2026 />} />
            <Route path="/articles/first-time-home-buyer-guide-2026" element={<ArticleFirstTimeBuyer2026 />} />
            {/* Spanish articles */}
            <Route path="/es/articles" element={<ArticlesEs />} />
            <Route path="/es/articles/casa-vs-bolsa-lo-que-dicen-los-datos" element={<ArticleCasaVsBolsa />} />
            <Route path="/es/articles/alquilar-o-comprar-2026-guia-basada-en-datos" element={<ArticleAlquilarOComprar2026 />} />
            <Route path="/es/articles/guia-comprar-primera-vivienda-2026" element={<ArticleGuiaComprarPrimeraVivienda2026 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
