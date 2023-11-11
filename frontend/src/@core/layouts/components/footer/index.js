// ** Icons Import
import { Heart } from "react-feather";

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        COPYRIGHT © {new Date().getFullYear()}{" "}
        k0b1x
      </span>
      <span className="float-md-end d-none d-md-block">
        Натренирована & Собрана
        <Heart size={14} />
      </span>
    </p>
  );
};

export default Footer;
