import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./context/ThemeContext";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AppContextProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

onAuthStateChanged(auth, async (user) => {
  const token = user ? await user.getIdToken() : null;

  const authLink = setContext((_, { headers }) => {
    console.log("Frontend sending token:", token); // ✅ Log token
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
});
