"use client";
import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { reduxStore, persistor } from "./redux/store";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate persistor={persistor}>
        <NextUIProvider>{props.children}</NextUIProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
