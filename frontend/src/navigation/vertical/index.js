import { Mail, Home, Send, AlertTriangle } from "react-feather";

export default [
  {
    id: "home",
    title: "Главная",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "retrain",
    title: "Переобучение модели",
    icon: <AlertTriangle size={20}/>,
    navLink: "/retrain",
  },
  {
    id: "contact",
    title: "Контакты",
    icon: <Send size={20} />,
    navLink: "/contact",
  }
];
