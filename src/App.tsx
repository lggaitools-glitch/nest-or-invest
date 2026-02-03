import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Simulate from "./pages/Simulate";
import Articles from "./pages/Articles";
import ArticleHouseVsStocks from "./pages/ArticleHouseVsStocks";
import ArticleRentVsBuy2026 from "./pages/ArticleRentVsBuy2026";
import ArticlesEs from "./pages/ArticlesEs";
import ArticleCasaVsBolsa from "./pages/ArticleCasaVsBolsa";
import ArticleAlquilarOComprar2026 from "./pages/ArticleAlquilarOComprar2026";
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
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/house-vs-stocks-what-the-data-really-says" element={<ArticleHouseVsStocks />} />
            <Route path="/articles/rent-vs-buy-2026-data-driven-decision-guide" element={<ArticleRentVsBuy2026 />} />
            {/* Spanish articles */}
            <Route path="/es/articles" element={<ArticlesEs />} />
            <Route path="/es/articles/casa-vs-bolsa-lo-que-dicen-los-datos" element={<ArticleCasaVsBolsa />} />
            <Route path="/es/articles/alquilar-o-comprar-2026-guia-basada-en-datos" element={<ArticleAlquilarOComprar2026 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
