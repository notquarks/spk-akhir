import { RiSunFill, RiMoonFill } from "react-icons/ri";
// import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { Box, Button, HStack, useColorMode } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const saveFile = () => {
    saveAs("/download", "template.csv");
  };
  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-end">
      <nav className="flex items-center gap-2">
        <HStack spacing={4}>
          <Button onClick={saveFile}>
            <ArrowDownIcon />
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <RiSunFill /> : <RiMoonFill />}
          </Button>
        </HStack>
      </nav>
    </header>
  );
};
export default Header;
