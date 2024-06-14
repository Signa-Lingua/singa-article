"use client";

import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { SiGooglecloud } from "react-icons/si";

export const HoverImageLinks = () => {
  return (
    <section className="w-full p-4 flex flex-col items-center md:p-8">
      <h2 className="font-bold text-4xl from-blue-primary bg-gradient-to-b  to-blue-tertiary inline-block text-transparent bg-clip-text">
        Our Teams
      </h2>
      <p className="md:w-2/4 text-sm w-full text-center">
        Singa team is a group of passionate individuals united by a common
        mission to provide you with the best in expertise and holistic care.
        Together, we are dedicated to enhancing your well-being and guiding you
        on your journey.
      </p>
      <div className="mx-auto w-full md:px-44">
        <Link
          heading="Andrien"
          subheading="Cloud Computing"
          imgSrc="/mockup1.png"
          href="#"
        />
        <Link
          heading="Daniel"
          subheading="Cloud Computing"
          imgSrc="/mockup1.png"
          href="#"
        />
        <Link
          heading="Rizki"
          subheading="Android Developer"
          imgSrc="/mockup1.png"
          href="#"
        />
        <Link
          heading="Dip"
          subheading="Android Developer"
          imgSrc="/mockup1.png"
          href="#"
        />
        <Link
          heading="Fun"
          subheading="Incase you're bored"
          imgSrc="/mockup1.png"
          href="#"
        />
      </div>
    </section>
  );
};

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
}

const Link = ({ heading, imgSrc, subheading, href }: LinkProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = ref.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-gray-400 hover:border-blue-primary py-4 transition-colors duration-500 hover:border-blue-pritext-blue-primary md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-bold text-gray-400 transition-colors duration-500 group-hover:text-blue-primary md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-gray-400 transition-colors duration-500 group-hover:text-blue-primary">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        {/* <MdAndroid className="text-5xl text-blue-primary" /> */}
        <SiGooglecloud className="text-5xl text-blue-primary" />
      </motion.div>
    </motion.a>
  );
};
