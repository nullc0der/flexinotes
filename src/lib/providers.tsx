"use client";

import { NextUIProvider } from "@nextui-org/react";

export const Providers = (props: React.PropsWithChildren) => {
  return <NextUIProvider>{props.children}</NextUIProvider>;
};
