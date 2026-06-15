import { useEffect, useRef } from "react";

const COLORS = [
  "#787a7a",
  "#d8dfda",
  "#e2eefa",
  "#b4b3b0",
  "rgb(238, 238, 235)",
];

export default function Cursor() {
  const circlesRef = useRef([]);

  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const positions = useRef(
    COLORS.map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }))
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame;

    const animate = () => {
     
      positions.current[0].x +=
        (mouse.current.x - positions.current[0].x) * 0.25;

      positions.current[0].y +=
        (mouse.current.y - positions.current[0].y) * 0.25;

      for (let i = 1; i < positions.current.length; i++) {
        positions.current[i].x +=
          (positions.current[i - 1].x - positions.current[i].x) * 0.25;

        positions.current[i].y +=
          (positions.current[i - 1].y - positions.current[i].y) * 0.25;
      }

      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;

        const pos = positions.current[index];

        circle.style.transform = `
          translate(${pos.x}px, ${pos.y}px)
          translate(-50%, -50%)
          scale(${1 - index * 0.12})
        `;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {COLORS.map((color, index) => (
        <div
          key={index}
          ref={(el) => (circlesRef.current[index] = el)}
          className="fixed pointer-events-none z-[9999] h-5 w-5 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 15px ${color}`,
            left: 0,
            top: 0,
          }}
        />
      ))}
    </>
  );
}