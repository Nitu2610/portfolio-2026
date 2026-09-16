# ParticleBackground Component — React + TypeScript + Tailwind

> **Purpose of this file:** Understand your actual `ParticleBackground.tsx` component by connecting React, TypeScript, Tailwind CSS, and the Canvas API.

> **Important:** This particular component **does not use Motion/Framer Motion**. It uses React + TypeScript + the browser Canvas API + Tailwind CSS.

---

# 1. The Complete Component

```tsx
import { useEffect, useRef } from "react";

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) return;

    const ctx = canvasElement.getContext("2d");

    if (!ctx) return;

    const canvas = canvasElement;

    let particles: Particle[] = [];

    const particleCount = 60;

    const colors = [
      "rgba(255, 255, 255, 0.7)"
    ];

    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.radius = Math.random() * 2 + 1;

        this.color =
          colors[Math.floor(Math.random() * colors.length)];

        this.speedX =
          (Math.random() - 0.5) * 0.5;

        this.speedY =
          (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.radius,
          0,
          Math.PI * 2
        );

        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;

        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) {
          this.x = canvas.width;
        }

        if (this.x > canvas.width) {
          this.x = 0;
        }

        if (this.y < 0) {
          this.y = canvas.height;
        }

        if (this.y > canvas.height) {
          this.y = 0;
        }

        this.draw();
      }
    }

    const createParticles = () => {
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const handleResize = () => {
      const devicePixelRatio =
        window.devicePixelRatio || 1;

      canvas.width =
        window.innerWidth * devicePixelRatio;

      canvas.height =
        window.innerHeight * devicePixelRatio;

      canvas.style.width =
        `${window.innerWidth}px`;

      canvas.style.height =
        `${window.innerHeight}px`;

      ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
      );

      createParticles();
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    let animationId: number;

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      particles.forEach((particle) => {
        particle.update();
      });

      animationId =
        requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
```

---

# 2. What Technologies Are Actually Being Used?

This component contains:

```text
React
+
TypeScript
+
Canvas API
+
Tailwind CSS
```

It does **not** use Motion.

Think about the roles:

```text
React
↓
Component + lifecycle

TypeScript
↓
Type safety

Canvas API
↓
Drawing + animation

Tailwind
↓
Positioning + styling
```

---

# 3. Importing React Hooks

```tsx
import {
  useEffect,
  useRef
} from "react";
```

Two React hooks are being imported.

```text
useRef
↓
Access DOM element

useEffect
↓
Run side effects
```

---

# 4. Creating the Component

```tsx
export const ParticleBackground = () => {
```

This creates a React functional component.

It can then be used elsewhere:

```tsx
<ParticleBackground />
```

---

# 5. Understanding `useRef`

```tsx
const canvasRef =
  useRef<HTMLCanvasElement | null>(null);
```

This is one of the most important lines.

We want React to give us access to the actual:

```html
<canvas>
```

element in the browser.

---

# 6. Understanding the TypeScript

Look at:

```tsx
useRef<HTMLCanvasElement | null>
```

We are telling TypeScript:

> "This ref will either contain an HTML canvas element or null."

Why `null`?

Because before React renders the component, the canvas doesn't exist yet.

So initially:

```text
canvasRef.current
        ↓
null
```

After React renders:

```text
canvasRef.current
        ↓
HTMLCanvasElement
```

---

# 7. The Canvas Element

At the bottom:

```tsx
<canvas
  ref={canvasRef}
  ...
/>
```

This connects the DOM element to our React ref.

Think:

```text
canvasRef
     ↓
React
     ↓
<canvas>
     ↓
Browser DOM
```

---

# 8. `useEffect`

The animation setup is inside:

```tsx
useEffect(() => {
  ...
}, []);
```

`useEffect` is used for **side effects**.

Examples of side effects:

```text
API calls
Timers
Event listeners
DOM manipulation
Subscriptions
Animations
```

Canvas animation is a side effect because we're directly interacting with a browser API.

---

# 9. Why `[]`?

At the end:

```tsx
}, []);
```

The empty dependency array means this effect is set up after the component mounts, rather than being rerun after every render.

Think:

```text
Component mounts
      ↓
useEffect runs
      ↓
Canvas setup
      ↓
Animation starts
```

---

# 10. Getting the Canvas

```tsx
const canvasElement =
  canvasRef.current;
```

Now we're asking:

> "Give me the actual canvas DOM element."

---

# 11. Why Do We Check for Null?

```tsx
if (!canvasElement) return;
```

Because TypeScript knows:

```text
canvasElement
↓
HTMLCanvasElement | null
```

It might be null.

So we check.

After this:

```tsx
if (!canvasElement) return;
```

TypeScript can understand that the remaining code has a valid canvas.

---

# 12. Getting the Drawing Context

```tsx
const ctx =
  canvasElement.getContext("2d");
```

Canvas itself is just the drawing surface.

The context gives us the drawing tools.

Think:

```text
Canvas
   ↓
2D Context
   ↓
Drawing commands
```

---

# 13. Another Null Check

```tsx
if (!ctx) return;
```

`getContext()` can potentially return null.

So we check it before using:

```tsx
ctx.beginPath();
```

---

# 14. Why Create Another Variable?

```tsx
const canvas =
  canvasElement;
```

This gives us a stable, non-null variable.

Now TypeScript understands:

```text
canvas
↓
HTMLCanvasElement
```

rather than:

```text
HTMLCanvasElement | null
```

This avoids errors such as:

```text
'canvas' is possibly 'null'
```

---

# 15. The Particle Array

```tsx
let particles: Particle[] = [];
```

This means:

> Create an array that will contain Particle objects.

Initially:

```text
particles = []
```

Later:

```text
particles = [
  Particle,
  Particle,
  Particle,
  ...
]
```

---

# 16. Particle Count

```tsx
const particleCount = 60;
```

We want 60 particles.

If you change:

```tsx
const particleCount = 100;
```

you will get more particles.

Try experimenting with:

```text
20
40
60
100
200
```

You will also learn how particle count affects performance.

---

# 17. Particle Colors

```tsx
const colors = [
  "rgba(255, 255, 255, 0.7)"
];
```

This is an array.

Currently there is only one color.

You could add more:

```tsx
const colors = [
  "rgba(255, 255, 255, 0.7)",
  "rgba(100, 200, 255, 0.7)",
  "rgba(150, 100, 255, 0.7)"
];
```

---

# 18. The Particle Class

```tsx
class Particle {
```

A class is a blueprint for creating objects.

Imagine:

```text
Particle
   ↓
Blueprint
   ↓
Create many particles
```

For example:

```text
Particle 1
x = 100
y = 300

Particle 2
x = 500
y = 100

Particle 3
x = 800
y = 600
```

Each particle has its own values.

---

# 19. Particle Properties

```tsx
x: number;
y: number;
radius: number;
color: string;
speedX: number;
speedY: number;
```

These are TypeScript property declarations.

Each particle has:

```text
x
→ horizontal position

y
→ vertical position

radius
→ size

color
→ particle color

speedX
→ horizontal movement

speedY
→ vertical movement
```

---

# 20. Constructor

```tsx
constructor() {
```

The constructor runs whenever we create:

```tsx
new Particle()
```

---

# 21. Random X Position

```tsx
this.x =
  Math.random() * canvas.width;
```

`Math.random()` generates a number between:

```text
0 and 1
```

Multiplying by canvas width gives a random horizontal position.

Example:

```text
Math.random()
= 0.5

canvas width
= 1000

0.5 × 1000
= 500
```

So the particle starts at x = 500.

---

# 22. Random Y Position

```tsx
this.y =
  Math.random() * canvas.height;
```

Same idea, but vertically.

---

# 23. Random Particle Size

```tsx
this.radius =
  Math.random() * 2 + 1;
```

This creates values approximately between:

```text
1 and 3
```

So particles have slightly different sizes.

---

# 24. Selecting a Color

```tsx
this.color =
  colors[
    Math.floor(
      Math.random() * colors.length
    )
  ];
```

This selects a random color from the array.

If there are:

```text
3 colors
```

the random index could be:

```text
0
1
2
```

---

# 25. Particle Speed

```tsx
this.speedX =
  (Math.random() - 0.5) * 0.5;
```

This creates a small random movement.

Because:

```text
Math.random()
```

is between:

```text
0 and 1
```

subtracting:

```text
0.5
```

creates approximately:

```text
-0.5 to +0.5
```

Therefore particles can move:

```text
left
or
right
```

Similarly:

```tsx
this.speedY =
  (Math.random() - 0.5) * 0.5;
```

allows:

```text
up
or
down
```

---

# 26. Drawing the Particle

```tsx
draw() {
```

This function draws one particle.

---

# 27. Starting a Drawing Path

```tsx
ctx.beginPath();
```

This tells Canvas:

> Start a new drawing path.

---

# 28. Drawing a Circle

```tsx
ctx.arc(
  this.x,
  this.y,
  this.radius,
  0,
  Math.PI * 2
);
```

The important values are:

```text
x
y
radius
start angle
end angle
```

`Math.PI * 2` represents a full circle.

So we get:

```text
●
```

---

# 29. Glow

```tsx
ctx.shadowBlur = 10;
ctx.shadowColor = this.color;
```

This creates a glow around the particle.

---

# 30. Fill Color

```tsx
ctx.fillStyle = this.color;
```

This determines the particle's color.

---

# 31. Actually Drawing It

```tsx
ctx.fill();
```

This fills the circle.

Without it, defining the path doesn't necessarily produce the visible filled particle you want.

---

# 32. Updating the Particle

```tsx
update() {
```

The update function changes the particle's position and then draws it.

---

# 33. Moving the Particle

```tsx
this.x += this.speedX;
this.y += this.speedY;
```

If:

```text
x = 100
speedX = 0.5
```

then:

```text
new x = 100.5
```

Every frame, the particle moves slightly.

---

# 34. Screen Wrapping

Consider:

```tsx
if (this.x < 0) {
  this.x = canvas.width;
}
```

If the particle leaves the left side:

```text
particle
   ←
screen edge
```

we move it to the right side.

Similarly:

```tsx
if (this.x > canvas.width) {
  this.x = 0;
}
```

So particles continuously wrap around the screen.

The same happens vertically.

---

# 35. Calling `draw()`

At the end of `update()`:

```tsx
this.draw();
```

So:

```text
update position
      ↓
draw particle
```

---

# 36. Creating Particles

```tsx
const createParticles = () => {
  particles = [];

  for (
    let i = 0;
    i < particleCount;
    i++
  ) {
    particles.push(
      new Particle()
    );
  }
};
```

This function:

1. Clears the existing particle array.
2. Loops `particleCount` times.
3. Creates a new Particle.
4. Adds it to the array.

---

# 37. Understanding `for`

```tsx
for (
  let i = 0;
  i < particleCount;
  i++
)
```

If:

```text
particleCount = 60
```

the loop runs:

```text
0
1
2
3
...
59
```

That's 60 iterations.

---

# 38. `new Particle()`

```tsx
new Particle()
```

creates a new object using the class.

Then:

```tsx
particles.push(
  new Particle()
);
```

adds it to the array.

---

# 39. Resize Handling

```tsx
const handleResize = () => {
```

The browser window can change size.

For example:

```text
Desktop
    ↓
Resize browser
    ↓
Canvas needs new dimensions
```

---

# 40. Device Pixel Ratio

```tsx
const devicePixelRatio =
  window.devicePixelRatio || 1;
```

Modern screens can have different pixel densities.

For example:

```text
Normal display
DPR = 1

High-density display
DPR = 2
```

Using the device pixel ratio helps make Canvas drawings sharper.

---

# 41. Canvas Internal Size

```tsx
canvas.width =
  window.innerWidth *
  devicePixelRatio;

canvas.height =
  window.innerHeight *
  devicePixelRatio;
```

This controls the internal drawing resolution.

---

# 42. CSS Size

```tsx
canvas.style.width =
  `${window.innerWidth}px`;

canvas.style.height =
  `${window.innerHeight}px`;
```

This controls the displayed CSS size.

This is an important distinction:

```text
canvas.width
canvas.height
     ↓
Drawing resolution


canvas.style.width
canvas.style.height
     ↓
Visual CSS size
```

---

# 43. `setTransform`

```tsx
ctx.setTransform(
  devicePixelRatio,
  0,
  0,
  devicePixelRatio,
  0,
  0
);
```

This tells Canvas how to map drawing coordinates when using a high-DPI drawing buffer.

You don't need to memorize the six numbers yet.

Understand the purpose:

> Make the drawing coordinate system work correctly with the device pixel ratio.

---

# 44. Creating Particles After Resize

```tsx
createParticles();
```

When the screen changes size, we recreate the particles so they fit the new canvas dimensions.

---

# 45. Resize Event

```tsx
window.addEventListener(
  "resize",
  handleResize
);
```

This tells the browser:

> Whenever the window is resized, run `handleResize`.

---

# 46. Animation ID

```tsx
let animationId: number;
```

We need this later so we can stop the animation.

---

# 47. Animation Function

```tsx
const animate = () => {
```

This function represents one animation frame.

Inside:

```tsx
ctx.clearRect(
  0,
  0,
  window.innerWidth,
  window.innerHeight
);
```

The previous frame is cleared.

---

# 48. Updating Every Particle

```tsx
particles.forEach((particle) => {
  particle.update();
});
```

If there are 60 particles:

```text
Particle 1 → update
Particle 2 → update
Particle 3 → update
...
Particle 60 → update
```

---

# 49. `requestAnimationFrame`

The most important line:

```tsx
animationId =
  requestAnimationFrame(animate);
```

This tells the browser:

> Run `animate()` again on the next animation frame.

The cycle becomes:

```text
animate()
   ↓
clear canvas
   ↓
update particles
   ↓
draw particles
   ↓
requestAnimationFrame()
   ↓
animate()
   ↓
repeat
```

This creates the illusion of continuous movement.

---

# 50. Starting the Animation

```tsx
animate();
```

This starts the loop.

Without this line, defining the animation function isn't enough.

---

# 51. Cleanup

At the end:

```tsx
return () => {
```

This is the cleanup function from `useEffect`.

---

# 52. Cancel Animation

```tsx
cancelAnimationFrame(
  animationId
);
```

When the component is removed, we stop the animation.

Otherwise, the animation could continue running unnecessarily.

---

# 53. Remove Event Listener

```tsx
window.removeEventListener(
  "resize",
  handleResize
);
```

We also remove the resize listener.

This is important because event listeners are resources that should be cleaned up when no longer needed.

---

# 54. Why Cleanup Matters

Think about:

```text
Component mounted
       ↓
Animation started
       ↓
Resize listener added
       ↓
Component removed
       ↓
Cleanup
       ↓
Animation stopped
       ↓
Listener removed
```

This prevents unnecessary work and potential memory/resource issues.

---

# 55. The Canvas JSX

Finally:

```tsx
return (
  <canvas
    ref={canvasRef}
    className="fixed inset-0 w-full h-full pointer-events-none z-0"
  />
);
```

This is the actual HTML canvas element.

---

# 56. Tailwind in This Component

Now let's look specifically at:

```tsx
className="
  fixed
  inset-0
  w-full
  h-full
  pointer-events-none
  z-0
"
```

---

## `fixed`

```text
position: fixed
```

The canvas is positioned relative to the viewport.

---

## `inset-0`

Approximately:

```css
top: 0;
right: 0;
bottom: 0;
left: 0;
```

So the canvas covers the viewport.

---

## `w-full`

```text
width: 100%
```

---

## `h-full`

```text
height: 100%
```

---

## `pointer-events-none`

The canvas does not capture pointer events.

This is extremely important for a background.

Imagine:

```text
Particle canvas
      ↓
Button
```

Without `pointer-events-none`, the canvas could interfere with clicking elements.

With:

```text
pointer-events-none
```

the pointer effectively passes through it.

---

## `z-0`

This establishes a low stacking layer.

Your foreground content can be placed above it using an appropriate z-index.

---

# 57. Equivalent CSS

Your Tailwind:

```tsx
className="
  fixed
  inset-0
  w-full
  h-full
  pointer-events-none
  z-0
"
```

is conceptually similar to:

```css
canvas {
  position: fixed;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;

  z-index: 0;
}
```

This is one of the best ways to learn Tailwind:

> Look at the Tailwind version and understand what the normal CSS would be doing.

---

# 58. Where Is Motion?

This component doesn't use Motion.

That's completely fine.

Your portfolio can have:

```text
ParticleBackground
       ↓
React
TypeScript
Canvas
Tailwind
```

And another component can have:

```text
Hero
   ↓
React
TypeScript
Tailwind
Motion
```

Different tools can be used in different components.

---

# 59. Where Motion Could Be Used

For example:

```tsx
<motion.section
  className="px-6 py-20"
  initial={{
    opacity: 0,
    y: 30
  }}
  whileInView={{
    opacity: 1,
    y: 0
  }}
  viewport={{
    once: true
  }}
>
  <h2>
    My Projects
  </h2>
</motion.section>
```

Here:

```text
Tailwind
↓
px-6
py-20

controls layout/spacing


Motion
↓
initial
whileInView
viewport

controls animation
```

---

# 60. The Big Picture

Your portfolio uses multiple technologies.

Think of them as different layers:

```text
┌───────────────────────────┐
│          React            │
│ Components + UI structure │
└─────────────┬─────────────┘
              │
      ┌───────┴────────┐
      ↓                ↓
 TypeScript          Tailwind
      ↓                ↓
 Type safety       Styling/Layout
      │
      ↓
   Motion
      ↓
   Animation
      │
      ↓
   Canvas API
      ↓
Special graphics
```

Each tool has a different responsibility.

---

# 61. What You Should Learn From This Component

After studying this file, you should be able to explain:

### React

```text
useEffect
useRef
component
cleanup
```

### TypeScript

```text
HTMLCanvasElement
null
number
string
class properties
type narrowing
```

### Tailwind

```text
fixed
inset-0
w-full
h-full
pointer-events-none
z-0
```

### Canvas

```text
getContext
beginPath
arc
fill
clearRect
requestAnimationFrame
```

### JavaScript

```text
class
constructor
new
array
for
forEach
Math.random
```

---

# 62. A Useful Learning Exercise

Don't just read this component.

Change it.

### Exercise 1 — Particle count

Change:

```tsx
const particleCount = 60;
```

to:

```tsx
const particleCount = 100;
```

Observe the result.

---

### Exercise 2 — Particle speed

Change:

```tsx
* 0.5
```

to:

```tsx
* 1
```

What happens?

---

### Exercise 3 — Particle size

Change:

```tsx
Math.random() * 2 + 1
```

to:

```tsx
Math.random() * 4 + 1
```

---

### Exercise 4 — Color

Change:

```tsx
"rgba(255, 255, 255, 0.7)"
```

to another color.

For example:

```tsx
"rgba(100, 200, 255, 0.7)"
```

---

### Exercise 5 — Tailwind

Change:

```tsx
z-0
```

and experiment with different stacking orders.

---

### Exercise 6 — Remove a class

Temporarily remove:

```tsx
pointer-events-none
```

Then interact with the page.

Think about what changed.

---

# 63. Important Debugging Lesson

Your original code had:

```tsx
canvas.heigth
```

instead of:

```tsx
canvas.height
```

This is a simple typo, but TypeScript helped identify it.

This is one of the advantages of TypeScript:

```text
You make a mistake
      ↓
TypeScript detects it
      ↓
Editor shows an error
      ↓
You fix it before runtime
```

---

# 64. Another Important Lesson

Your original code also accidentally placed functions such as:

```text
createParticles()
handleResize()
animate()
```

inside the `Particle` class.

This is a structural JavaScript/TypeScript problem.

The correct mental structure is:

```text
useEffect
│
├── Particle class
│   ├── constructor
│   ├── draw()
│   └── update()
│
├── createParticles()
├── handleResize()
├── animate()
└── cleanup
```

This separation makes the program easier to understand.

---

# 65. Final Mental Model

When you see this component, think:

```text
React
 ↓
Mount component
 ↓
Get canvas
 ↓
Create particles
 ↓
Start animation
 ↓
Every frame:
    Clear
      ↓
    Move
      ↓
    Draw
      ↓
    Repeat
 ↓
Resize?
    ↓
Update canvas
 ↓
Component removed?
    ↓
Cleanup
```

That's the core of the entire component.

---

# 66. How This Connects to Your Other Files

Your three learning files should now work together:

```text
01_TailwindCSS_Basics.md
        ↓
Learn:
How things LOOK


02_Motion_React_Basics.md
        ↓
Learn:
How things MOVE


03_ParticleBackground_Component.md
        ↓
Learn:
How React + TypeScript +
Tailwind + Canvas work together
```

Later, when you encounter something like:

```tsx
<motion.div
  className="flex items-center justify-center p-6"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
>
```

you should be able to break it down:

```text
motion.div
    ↓
Motion component

className
    ↓
Tailwind

flex
    ↓
Flexbox

items-center
    ↓
Cross-axis alignment

justify-center
    ↓
Main-axis alignment

p-6
    ↓
Padding

initial
    ↓
Animation starting state

whileInView
    ↓
Animation target when visible
```

That is the kind of understanding you should aim for while completing your portfolio.
