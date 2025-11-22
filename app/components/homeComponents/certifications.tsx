import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { certifiList, certifiListLg } from "~/consts/certifiList";

export default function Certifications() {
  const sliderRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth > 1028) {
          return;
        }
        setWindowWidth(window.innerWidth);
      }, 100); // Debounce to avoid excessive updates
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 1028) {
      const sliderWidth = sliderRef.current.scrollWidth / 2; // Assuming duplicated content
      gsap.to(sliderRef.current, {
        x: -sliderWidth, // Move one full set of content
        duration: 12, // Adjust as needed
        ease: "none",
        repeat: -1,
      });
    }
  }, [windowWidth]);

  return (
    <aside className="overflow-hidden p-4 w-full my-20 lg:my-22 lg:mb-25 xl:flex xl:justify-center">
      <div ref={sliderRef} className="flex lg:hidden">
        {/* Your content here (e.g., images, text) */}
        {certifiList.map((e) => {
          return (
            <div className="flex mr-14 gap-4 items-center" key={e.id}>
              <img src={e.image} className="w-15 h-15" />
              <p className="min-w-md whitespace-normal font-thin text-gray-400">{e.text}</p>
            </div>
          );
        })}
      </div>
      <div className="hidden lg:flex lg:max-w-6xl xl:justify-between">
        {certifiListLg.map((e) => (
          <div className="flex items-center mr-12 gap-4" key={e.id}>
            <img src={e.image} className="w-15 h-15" />
            <p className="max-w-md whitespace-normal font-thin text-sm text-gray-500">
              {e.text}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
