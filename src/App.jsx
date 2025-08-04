import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouterLayout from "./components/RouterLayout";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";
import PromptInput from "./components/PromptInput";
import ShopPage from "./pages/ShopPage";
import ImageGeneratorUI from "./components/ImageGeneratorUI";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about-us", element: <AboutUsPage /> },
    ],
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
  {
    path: "/generate",
    element: <ImageGeneratorUI />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
