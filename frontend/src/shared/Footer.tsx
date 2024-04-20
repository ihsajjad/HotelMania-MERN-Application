import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-base-200">
      <div className="footer p-10 custom-container">
        <div>
          <Link to="/" className=" text-xl font-bold text-[var(--main-color)]">
            Hotel<span>Mania</span>
          </Link>
          <p>Providing reliable service since 2010</p>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a href="#" className="link link-hover">
            About us
          </a>
          <a href="#" className="link link-hover">
            Contact
          </a>
          <a href="#" className="link link-hover">
            Career
          </a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a href="#" className="link link-hover">
            Terms of use
          </a>
          <a href="#" className="link link-hover">
            Privacy policy
          </a>
          <a href="#" className="link link-hover">
            Cookie policy
          </a>
        </div>
      </div>
      <div className="flex gap-2 sm:flex-row flex-col-reverse sm:justify-between custom-container py-4 border-t border-[var(--main-color)]">
        <div className="text-slate-300 md:text-left text-center text-sm">
          <p> Copyright &copy; 2023 || All right reserved</p>
        </div>
        <div className="md:place-self-center md:justify-self-end ">
          <div className="flex flex-row gap-4 justify-center">
            <a href="#">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#">
              <FaYoutube className="w-6 h-6" />
            </a>
            <a href="#">
              <FaFacebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
