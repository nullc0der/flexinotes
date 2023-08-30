"use client";

import React, { useEffect, useState } from "react";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
// import Link from "next/link";
import { Search, ArrowRightCircle, ArrowLeft } from "react-feather";
import { AnimatePresence, motion } from "framer-motion";

import { useDispatch } from "@/lib/redux/store";
import { uiSlice } from "@/lib/redux/slices/uiSlice";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Nav() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiSlice.actions.updateSearchTerm(searchValue));
  }, [searchValue, dispatch]);

  const onSearchInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      resetSearchInputAndClose();
    }
  };

  const resetSearchInputAndClose = () => {
    setSearchValue("");
    setShowSearch(false);
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Navbar shouldHideOnScroll>
      <AnimatePresence mode="wait">
        {!showSearch ? (
          <motion.div
            key={`search-show-${showSearch}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex w-full gap-4"
          >
            <NavbarBrand>
              <p className="font-bold text-inherit">Note App</p>
            </NavbarBrand>
            <NavbarContent justify="end" as="div" className="items-center">
              <Button
                isIconOnly
                color="default"
                variant="flat"
                size="md"
                onPress={() => setShowSearch(true)}
              >
                <Search size={14} />
              </Button>
              {/* <Button
                as={Link}
                color="default"
                href="#"
                variant="flat"
                size="md"
              >
                Login
              </Button> */}
              <ThemeSwitcher />
            </NavbarContent>
          </motion.div>
        ) : (
          <motion.div
            key={`search-show-${showSearch}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex w-full gap-4"
          >
            <Button
              isIconOnly
              color="default"
              variant="flat"
              size="md"
              onPress={resetSearchInputAndClose}
            >
              <ArrowLeft size={14} />
            </Button>
            <Input
              placeholder="Search notes..."
              value={searchValue}
              endContent={
                <ArrowRightCircle
                  className="cursor-pointer"
                  size={18}
                  onClick={resetSearchInputAndClose}
                />
              }
              onKeyDown={onSearchInputKeyDown}
              onChange={onChangeSearchInput}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Navbar>
  );
}
