import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import Link from "next/link";
import { Search } from "react-feather";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Nav() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">Note App</p>
      </NavbarBrand>
      <NavbarContent justify="end" as="div" className="items-center">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search notes..."
          size="sm"
          startContent={<Search size={18} />}
          type="search"
        />
        <Button as={Link} color="default" href="#" variant="flat" size="md">
          Login
        </Button>
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  );
}
