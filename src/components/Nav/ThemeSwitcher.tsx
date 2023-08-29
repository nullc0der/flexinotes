"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "react-feather";

import { Button } from "@nextui-org/button";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      isIconOnly
      color="default"
      variant="flat"
      size="md"
      title={`Change theme to ${theme === "dark" ? "light" : "dark"}`}
      onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={14} />
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
