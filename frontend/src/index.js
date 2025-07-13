import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./context/ThemeContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppContextProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </ApolloProvider>
);
