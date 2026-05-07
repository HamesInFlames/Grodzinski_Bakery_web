// src/components/AnimationWrappers.jsx
// Reusable, elder-friendly animation components using Motion
// All animations are subtle, slow, and non-jarring

import { motion, useInView } from "motion/react";
import { useRef } from "react";

// Scroll-triggered fade-in with gentle upward drift
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up", // "up", "down", "left", "right", "none"
  distance = 30,
  duration = 0.7,
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionMap[direction] }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] // gentle ease-out
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Simple fade-in (no scroll trigger, immediate or delayed)
export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  ...props
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger children on scroll - each child animates in sequence
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger child - use inside StaggerContainer
export function StaggerItem({
  children,
  className = "",
  direction = "up",
  distance = 24,
  duration = 0.5,
  ...props
}) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...directionMap[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, ease: [0.25, 0.1, 0.25, 1] }
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Page transition wrapper
export function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// Gentle scale-up on scroll (for images/cards)
export function ScaleReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

