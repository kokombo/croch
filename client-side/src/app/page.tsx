"use client";

import ApiTesting from "@/components/api-testing";
import { Slider } from "@/components";

const Home = () => {
  return (
    <>
      <ApiTesting />

      <Slider
        sliderData={[
          "/sp.png",
          "/cp.png",
          "/sp.png",
          "/cp.png",
          "/sp.png",
          "/cp.png",
          "/sp.png",
          "/cp.png",
          "/sp.png",
          "/cp.png",
        ]}
      />
    </>
  );
};

export default Home;
