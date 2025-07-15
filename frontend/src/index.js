import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
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
import { ThemeContextProvider } from "./context/ThemeContext";

const AppWithApollo = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const httpLink = createHttpLink({
      uri: "http://localhost:5000/graphql",
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const token = user ? await user.getIdToken() : null;

      const authLink = setContext((_, { headers }) => ({
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      }));

      const apolloClient = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });

      setClient(apolloClient);
    });

    return () => unsubscribe();
  }, []);

  if (!client) return <div>Loading...</div>;

  return (
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
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppWithApollo />);
