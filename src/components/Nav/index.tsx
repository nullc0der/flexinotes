import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";

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
        <Button isIconOnly color="default" variant="flat" size="md">
          <Search size={14} />
        </Button>
        <Button as={Link} color="default" href="#" variant="flat" size="md">
          Login
        </Button>
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  );
}
