import Marquee from "react-fast-marquee";
import express from "../assets/sponsorLogos/american-express.png";
import bks from "../assets/sponsorLogos/bkslogo.png";
import brack from "../assets/sponsorLogos/brack-bank.jpg";
import city from "../assets/sponsorLogos/city-touch.png";
import ddbl from "../assets/sponsorLogos/ddbl.png";
import master from "../assets/sponsorLogos/mastercard.png";
// import nogod from "../assets/sponsorLogos/nogod.png";
import sure from "../assets/sponsorLogos/sure-cash.png";
import upay from "../assets/sponsorLogos/upay.png";
import visa from "../assets/sponsorLogos/visa.png";

const OurPartners = () => {
  const logos = [
    bks,
    express,
    brack,
    upay,
    // nogod,
    visa,
    city,
    master,
    ddbl,
    sure,
  ];

  return (
    <section className="min-h-fit py-10">
      <h3 className="section-title">Our Patners</h3>

      <Marquee>
        <div className="flex my-10 space-x-8">
          {logos.map((logo, i) => (
            <img key={i} src={logo} alt="" className="h-20 w-32" />
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default OurPartners;
