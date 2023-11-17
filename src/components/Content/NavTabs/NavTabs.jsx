"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStyles } from "./styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Flight, Description } from "@mui/icons-material";

const NavTabs = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(false);

  useEffect(() => {
    const value = pathname === "/booking" ? false : pathname;
    setValue(value);
  }, [pathname]);

  const handleChange = (e, newValue) => {
    router.push(newValue);
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      centered
      classes={{ root: classes.container }}
    >
      <Tab
        value="/"
        icon={
          <Flight
            sx={{
              transform: "rotate(45deg)",
            }}
          />
        }
        iconPosition="start"
        label="Flights"
      />
      <Tab
        value="/reservations"
        icon={<Description />}
        iconPosition="start"
        label="Reservations"
      />
    </Tabs>
  );
};

export default NavTabs;
