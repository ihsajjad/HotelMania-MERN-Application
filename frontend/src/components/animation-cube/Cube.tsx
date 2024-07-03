import { CSSProperties } from "react";
import "./Cube.css";

const Cube = () => {
  return (
    <div className="cube w-[220px] md:w-[320px]">
      <div className="face" style={{ "--i": 0 } as CSSProperties}>
        Dream Peace.
      </div>
      <div className="face" style={{ "--i": 1 } as CSSProperties}>
        Peaceful Den.
      </div>
      <div className="face" style={{ "--i": 2 } as CSSProperties}>
        Ideal Retreat.
      </div>
      <div className="face" style={{ "--i": 3 } as CSSProperties}>
        Perfect Oasis.
      </div>
    </div>
  );
};

export default Cube;
