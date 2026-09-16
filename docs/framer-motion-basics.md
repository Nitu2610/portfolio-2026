# Motion for React Basics

> **Purpose of this file:** Understand the animation concepts used in modern React applications and recognize the Motion syntax used in your portfolio.

> **Important:** The library was historically known as **Framer Motion**. Current Motion documentation uses the package/import style `motion/react`. You may see older YouTube tutorials using `framer-motion`.

---

# 1. What is Motion?

Motion is an animation library for React.

It allows us to animate React elements without manually writing complex animation logic.

For example:

```tsx
import { motion } from "motion/react";

<motion.div>
  Hello
</motion.div>
```

A `motion.div` behaves like a normal `div`, but it can accept animation-related props.

---

# 2. Why Use Motion?

Without an animation library, you could use:

```css
transition
transform
animation
@keyframes
```

These are still useful.

Motion becomes especially useful when animation depends on:

```text
React state
Component mounting/unmounting
User interaction
Scroll position
Gestures
Multiple components
Animation sequences
```

---

# 3. Installation

Current Motion package:

```bash
npm install motion
```

Then:

```tsx
import { motion } from "motion/react";
```

---

# 4. Older Tutorials

You may see:

```tsx
import { motion } from "framer-motion";
```

This is common in older tutorials.

Don't immediately assume your code is wrong.

Check which package your project is using.

Current Motion documentation generally uses:

```tsx
import { motion } from "motion/react";
```

---

# 5. `motion.div`

Normal React:

```tsx
<div>
  Hello
</div>
```

Motion:

```tsx
<motion.div>
  Hello
</motion.div>
```

The second one supports Motion animation props.

---

# 6. The Most Important Concept

The most important animation pattern is:

```text
initial
   ↓
animate
   ↓
transition
```

Think:

```text
Where does the element start?
          ↓
Where should it go?
          ↓
How should it get there?
```

---

# 7. `initial`

`initial` defines the starting state.

Example:

```tsx
<motion.div
  initial={{ opacity: 0 }}
>
  Hello
</motion.div>
```

The element starts with:

```text
opacity = 0
```

Meaning it is invisible.

---

# 8. `animate`

`animate` defines the target state.

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Hello
</motion.div>
```

The animation becomes:

```text
opacity 0
     ↓
opacity 1
```

So the element fades in.

---

# 9. Y Position

You can animate position.

```tsx
<motion.div
  initial={{ y: 30 }}
  animate={{ y: 0 }}
>
```

Meaning:

```text
Start 30px lower
       ↓
Move to normal position
```

A common entrance animation:

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
>
```

This means:

```text
Invisible + slightly lower
          ↓
Visible + normal position
```

---

# 10. `transition`

`transition` controls how the animation behaves.

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
```

`duration` controls how long the animation takes.

---

# 11. Delay

```tsx
transition={{
  delay: 0.3,
  duration: 0.6
}}
```

Meaning:

```text
Wait 0.3 seconds
      ↓
Animate for 0.6 seconds
```

---

# 12. Ease

You can control the animation curve.

```tsx
transition={{
  duration: 0.6,
  ease: "easeOut"
}}
```

Conceptually:

```text
Linear
→ constant speed

Ease-in
→ starts slowly

Ease-out
→ finishes slowly

Ease-in-out
→ slow start + slow finish
```

---

# 13. Spring Animations

Motion can also use spring physics.

Conceptually:

```tsx
transition={{
  type: "spring"
}}
```

Spring animations are useful for:

```text
Buttons
Cards
Drag interactions
Menus
Interactive UI
```

They can feel more natural than simple duration-based animations.

---

# 14. `whileHover`

`whileHover` defines what happens while the pointer is hovering.

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
>
  View Project
</motion.button>
```

Meaning:

```text
Normal
scale = 1

Hover
scale = 1.05
```

---

# 15. `whileTap`

Useful for buttons.

```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

When pressed:

```text
scale becomes slightly smaller
```

This creates a tactile effect.

---

# 16. Combining Hover and Tap

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Contact Me
</motion.button>
```

Think:

```text
Hover → slightly larger

Press → slightly smaller
```

---

# 17. `whileInView`

This is especially useful for portfolios.

```tsx
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
>
  About Me
</motion.section>
```

The animation occurs when the element enters the viewport.

---

# 18. `viewport`

You can control viewport behavior.

```tsx
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
```

`once: true` means the animation is intended to trigger once rather than repeatedly as the element enters and leaves the viewport.

---

# 19. Variants

Variants are one of the most important Motion concepts to learn.

Instead of putting everything directly inside the component:

```tsx
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },

  visible: {
    opacity: 1,
    y: 0
  }
};
```

Then:

```tsx
<motion.div
  variants={cardVariants}
  initial="hidden"
  animate="visible"
>
  Project
</motion.div>
```

---

# 20. Why Variants Are Useful

Without variants:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
```

With variants:

```tsx
const variants = {
  hidden: {...},
  visible: {...}
};
```

This becomes useful when many components share the same animation states.

---

# 21. Parent and Child Animations

Variants become particularly powerful when a parent controls children.

For example:

```tsx
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: {
    opacity: 0,
    y: 20
  },

  visible: {
    opacity: 1,
    y: 0
  }
};
```

Then:

```tsx
<motion.div
  variants={container}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={item}>
    Item 1
  </motion.div>

  <motion.div variants={item}>
    Item 2
  </motion.div>

  <motion.div variants={item}>
    Item 3
  </motion.div>
</motion.div>
```

---

# 22. `staggerChildren`

This:

```tsx
staggerChildren: 0.1
```

means approximately:

```text
Item 1 → starts
     ↓
0.1 sec
     ↓
Item 2 → starts
     ↓
0.1 sec
     ↓
Item 3 → starts
```

Very useful for:

```text
Navigation menus
Skill lists
Project cards
Feature lists
```

---

# 23. `AnimatePresence`

Sometimes we want an animation when a component disappears.

For example:

```tsx
import {
  AnimatePresence,
  motion
} from "motion/react";
```

Then:

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Menu
    </motion.div>
  )}
</AnimatePresence>
```

---

# 24. `exit`

`exit` defines the animation that happens when the component is removed.

Example:

```tsx
exit={{ opacity: 0 }}
```

Without `AnimatePresence`, exit animations generally won't work as intended because React removes the element immediately.

---

# 25. Motion + Tailwind

This is important for your portfolio.

Motion and Tailwind have different responsibilities.

Example:

```tsx
<motion.section
  className="mx-auto max-w-6xl px-6 py-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  Projects
</motion.section>
```

Break it down:

```text
className
     ↓
Tailwind CSS
     ↓
Layout + spacing + appearance

initial
     ↓
Motion
     ↓
Starting animation state

whileInView
     ↓
Motion
     ↓
Animation when visible

viewport
     ↓
Motion
     ↓
Viewport behavior
```

---

# 26. Tailwind vs Motion

A useful mental model:

```text
Tailwind
    ↓
How does it LOOK?

Motion
    ↓
How does it MOVE?

React
    ↓
How does it BEHAVE?

TypeScript
    ↓
Is the code TYPE-SAFE?
```

---

# 27. CSS Animation vs Motion

You don't always need Motion.

CSS is perfectly suitable for simple animations.

For example:

```css
button {
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}
```

Tailwind can do something similar:

```tsx
<button className="transition-transform hover:scale-105">
```

Motion becomes more useful when animation is connected to application state, component lifecycle, viewport, gestures, coordinated sequences, or more complex interactions.

---

# 28. Don't Animate Everything

A common beginner mistake is adding animations everywhere.

Good animation should communicate something.

Examples:

```text
Page loads
→ Hero fades in

User scrolls
→ Section appears

User hovers
→ Button responds

Menu opens
→ Menu animates

Menu closes
→ Menu exits
```

Animation should generally support the user interface rather than distract from it.

---

# 29. Accessibility

Some users prefer reduced motion.

Modern applications should consider:

```text
prefers-reduced-motion
```

If you build more advanced animations later, learn how Motion and your application can respect reduced-motion preferences.

---

# 30. Performance

Be careful with:

```text
Too many animations
Very large lists
Continuous expensive animations
Complex effects on low-end devices
```

For a portfolio:

```text
Small entrance animations
Hover interactions
Simple scroll animations
```

are usually enough.

---

# 31. Common Beginner Mistakes

### Mistake 1

Copying:

```tsx
initial={{ ... }}
animate={{ ... }}
```

without understanding what initial and animate mean.

Remember:

```text
initial = START

animate = TARGET
```

---

### Mistake 2

Using Motion for every CSS transition.

Sometimes:

```tsx
hover:scale-105
```

is enough.

---

### Mistake 3

Using very long animations.

A button shouldn't take two seconds to respond.

---

### Mistake 4

Ignoring mobile performance.

Your portfolio should remain responsive on mobile devices.

---

# 32. Practice Exercises

### Exercise 1

Create a fade-in:

```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
```

---

### Exercise 2

Create a slide-up:

```tsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
```

---

### Exercise 3

Create a hover button:

```tsx
whileHover={{ scale: 1.05 }}
```

---

### Exercise 4

Create a press animation:

```tsx
whileTap={{ scale: 0.95 }}
```

---

### Exercise 5

Create a scroll animation:

```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
```

---

### Exercise 6

Create three cards and use:

```text
variants
+
staggerChildren
```

to make them appear one after another.

---

# 33. Motion Cheat Sheet

```text
motion.div
motion.section
motion.button

initial
animate
transition

whileHover
whileTap
whileFocus
whileInView

viewport

variants
staggerChildren

exit
AnimatePresence

layout
```

---

# 34. What You Should Know After This File

You don't need to become an animation expert.

You should be able to look at:

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

and understand:

```text
motion.div
→ Motion-enabled div

initial
→ starting state

whileInView
→ target state when visible

opacity
→ fade effect

y
→ vertical movement

transition
→ controls how the animation happens
```

That is enough to start modifying your portfolio independently.
