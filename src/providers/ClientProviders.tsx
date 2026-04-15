"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { WishlistInitializer } from "./WishlistInitializer";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <WishlistInitializer>{children}</WishlistInitializer>
    </Provider>
  );
}
