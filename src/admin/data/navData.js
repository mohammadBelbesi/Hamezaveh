import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const navData = [
  {
    id: 0,
    icon: <CelebrationIcon />,
    text: "Events",
    link: "/",
  },
  {
    id: 1,
    icon: <CategoryIcon />,
    text: "Products",
    link: "Products",
  },
  // {
  //   id: 2,
  //   icon: <LocalMallIcon />,
  //   text: "Orders",
  //   link: "statistics",
  // },
  {
    id: 3,
    icon: <PeopleIcon />,
    text: "Users",
    link: "settings",
  },
  {
    id: 4,
    icon: <DashboardIcon />,
    text: "Dashboard",
    link: "settings",
  },
];
