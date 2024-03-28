import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

//https://preview.themeforest.net/item/traveline-tour-travel-hotel-booking-template-/full_screen_preview/7855437?_ga=2.220699739.2114478542.1691038848-397218336.1691038848

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-base-200">
      <div className="footer p-10 ">
        <div>
          <Link to="/" className=" text-xl font-bold text-[var(--main-color)]">
            Hotel<span>Mania</span>
          </Link>
          <p>Providing reliable service since 2010</p>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Career</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
        <div>
          <span className="footer-title">Payment Method</span>
        </div>
      </div>
      <div className="footer px-10 py-4 border-t border-[#8BCF17]">
        <div className="items-center grid-flow-col">
          <p> Copyright &copy; 2023 || All right reserved</p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaTwitter className="w-6 h-6" />
            </a>
            <a>
              <FaYoutube className="w-6 h-6" />
            </a>
            <a>
              <FaFacebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
