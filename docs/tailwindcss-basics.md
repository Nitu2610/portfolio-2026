# Tailwind CSS Basics

> **Purpose of this file:** Learn the fundamentals of Tailwind CSS that you are likely to encounter while building React projects and your portfolio.

---

## 1. What is Tailwind CSS?

Tailwind CSS is a **utility-first CSS framework**.

Normally, when writing CSS, we might create a class:

```css
.card {
  background-color: black;
  padding: 24px;
  border-radius: 12px;
  color: white;
}
```

Then use it:

```html
<div class="card">
  Hello
</div>
```

With Tailwind, we can write those styles directly using utility classes:

```tsx
<div className="bg-black p-6 rounded-xl text-white">
  Hello
</div>
```

Each class performs a small job.

```text
bg-black     → background color
p-6          → padding
rounded-xl   → border radius
text-white   → text color
```

This is the main idea behind Tailwind.

---

# 2. Tailwind in React

In normal HTML:

```html
<div class="bg-black text-white">
```

In React/JSX:

```tsx
<div className="bg-black text-white">
```

React uses:

```tsx
className
```

instead of:

```html
class
```

So when you see:

```tsx
<section className="flex items-center justify-center">
```

you should read it as:

> "Apply these Tailwind CSS utilities to this section."

---

# 3. Understanding Tailwind's Mental Model

Think about Tailwind like this:

```text
React element
      ↓
className
      ↓
Tailwind utility classes
      ↓
Generated CSS
      ↓
Browser
```

For example:

```tsx
<div className="p-6 bg-slate-900 rounded-xl">
```

means approximately:

```css
padding: 1.5rem;
background-color: ...;
border-radius: 0.75rem;
```

You don't need to memorize the generated CSS.

You need to understand what the utility means.

---

# 4. Spacing

Spacing is one of the most commonly used parts of Tailwind.

## Padding

```tsx
<div className="p-4">
```

Means:

```text
padding on all four sides
```

You can also control individual directions.

```tsx
<div className="px-4">
```

`px` = padding left + right.

```tsx
<div className="py-4">
```

`py` = padding top + bottom.

Other examples:

```text
pt-4 → padding-top
pb-4 → padding-bottom
pl-4 → padding-left
pr-4 → padding-right
```

---

# 5. Margin

Margin works similarly.

```tsx
<div className="m-4">
```

Margin on all sides.

```tsx
<div className="mx-auto">
```

Horizontal margin is automatically calculated.

This is commonly used to center containers:

```tsx
<div className="max-w-6xl mx-auto">
```

Think:

```text
mx → margin left + right
auto → browser calculates the remaining space
```

---

# 6. Gap

When using Flexbox or Grid, `gap` is extremely useful.

```tsx
<div className="flex gap-4">
```

This creates space between the children.

Instead of:

```css
margin-right: ...
```

you can often use:

```tsx
gap-4
```

Examples:

```text
gap-2
gap-4
gap-6
gap-8
```

You can also use:

```tsx
gap-x-4
gap-y-6
```

---

# 7. Width and Height

Common width utilities:

```text
w-full
w-screen
w-1/2
w-fit
w-auto
max-w-xl
max-w-4xl
max-w-6xl
```

Example:

```tsx
<div className="w-full max-w-6xl">
```

This means:

```text
width: 100%
but don't become wider than the max width
```

This pattern is very common for websites.

---

## Height

Examples:

```text
h-full
h-screen
min-h-screen
```

For example:

```tsx
<section className="min-h-screen">
```

means:

> The section should be at least the height of the viewport.

---

# 8. Flexbox

Flexbox is extremely important.

Tailwind:

```tsx
<div className="flex">
```

is essentially:

```css
display: flex;
```

---

## Direction

```tsx
<div className="flex flex-row">
```

Children are arranged horizontally.

```tsx
<div className="flex flex-col">
```

Children are arranged vertically.

A very common responsive pattern:

```tsx
<div className="flex flex-col md:flex-row">
```

Meaning:

```text
Mobile
↓
column

Medium screens and larger
↓
row
```

---

# 9. Aligning Items

```tsx
<div className="flex items-center">
```

means:

```css
align-items: center;
```

Other examples:

```text
items-start
items-center
items-end
items-stretch
```

---

# 10. Justifying Content

```tsx
<div className="flex justify-center">
```

Centers content along the main axis.

Other common values:

```text
justify-start
justify-center
justify-end
justify-between
justify-around
justify-evenly
```

Example:

```tsx
<nav className="flex justify-between">
```

Useful for:

```text
Logo                 Navigation
```

---

# 11. Common Flexbox Pattern

You will see this constantly:

```tsx
<div className="flex items-center justify-center">
```

Break it down:

```text
flex
 ↓
Enable Flexbox

items-center
 ↓
Cross-axis alignment

justify-center
 ↓
Main-axis alignment
```

If the direction is row:

```text
items-center
→ vertical alignment

justify-center
→ horizontal alignment
```

---

# 12. Grid

Tailwind also provides CSS Grid utilities.

```tsx
<div className="grid">
```

Columns:

```tsx
<div className="grid grid-cols-2">
```

Two columns.

```tsx
<div className="grid grid-cols-3">
```

Three columns.

Example portfolio project section:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

Meaning:

```text
Mobile
→ 1 column

Medium
→ 2 columns

Large
→ 3 columns
```

---

# 13. Typography

Common text utilities:

```text
text-sm
text-base
text-lg
text-xl
text-2xl
text-3xl
text-4xl
text-5xl
```

Example:

```tsx
<h1 className="text-5xl">
  My Portfolio
</h1>
```

---

## Font Weight

```text
font-light
font-normal
font-medium
font-semibold
font-bold
```

Example:

```tsx
<h1 className="text-4xl font-bold">
```

---

## Text Alignment

```text
text-left
text-center
text-right
```

Example:

```tsx
<h1 className="text-center">
```

---

# 14. Colors

Tailwind provides predefined color scales.

For example:

```text
bg-blue-500
bg-red-500
bg-green-500
bg-slate-900
bg-gray-100
```

Text:

```text
text-white
text-black
text-blue-500
text-slate-400
```

Border:

```text
border-gray-700
border-slate-800
```

Example:

```tsx
<div className="bg-slate-900 text-white">
```

---

# 15. Borders

```text
border
border-2
border-4
```

Example:

```tsx
<div className="border border-slate-700">
```

---

# 16. Border Radius

```text
rounded
rounded-sm
rounded-md
rounded-lg
rounded-xl
rounded-2xl
rounded-full
```

Example:

```tsx
<button className="rounded-lg">
```

A circular button:

```tsx
<button className="rounded-full">
```

---

# 17. Shadows

Common utilities:

```text
shadow
shadow-sm
shadow-md
shadow-lg
shadow-xl
shadow-2xl
```

Example:

```tsx
<div className="rounded-xl shadow-lg">
```

---

# 18. Positioning

This is very important for your particle background.

Tailwind:

```text
relative
absolute
fixed
sticky
```

These correspond to CSS positioning concepts.

---

## Relative

```tsx
<div className="relative">
```

Equivalent idea:

```css
position: relative;
```

Usually used as the positioning reference for absolutely positioned children.

---

## Absolute

```tsx
<div className="absolute">
```

The element is positioned relative to an appropriate positioned ancestor.

---

## Fixed

```tsx
<div className="fixed">
```

The element is positioned relative to the viewport.

This is what your particle background uses.

---

# 19. `inset-0`

You will often see:

```tsx
<div className="fixed inset-0">
```

This is shorthand for approximately:

```css
top: 0;
right: 0;
bottom: 0;
left: 0;
```

So:

```tsx
fixed inset-0
```

means:

> Fix this element to all four edges of the viewport.

---

# 20. Z-Index

Z-index controls stacking order.

```text
z-0
z-10
z-20
z-50
```

For example:

```tsx
<div className="z-0">
```

and:

```tsx
<div className="z-10">
```

The second element is placed above the first when stacking contexts permit.

---

# 21. Responsive Design

One of Tailwind's most important features is responsive utilities.

Example:

```tsx
<div className="text-sm md:text-lg lg:text-2xl">
```

Meaning:

```text
Default
→ text-sm

md and above
→ text-lg

lg and above
→ text-2xl
```

Tailwind is **mobile-first**.

Think:

```text
Base styles
    ↓
sm:
    ↓
md:
    ↓
lg:
    ↓
xl:
```

You don't need to write a separate media query for every change.

---

# 22. Responsive Flexbox

Example:

```tsx
<div className="flex flex-col md:flex-row">
```

Mobile:

```text
A
B
C
```

Medium and above:

```text
A   B   C
```

This is extremely common in portfolio layouts.

---

# 23. Hover

Tailwind supports state variants.

```tsx
<button className="bg-blue-600 hover:bg-blue-700">
```

Normal:

```text
blue-600
```

Hover:

```text
blue-700
```

---

# 24. Focus

```tsx
<button className="focus:ring-2">
```

This applies styling when the element receives focus.

This is important for keyboard accessibility.

---

# 25. Other Useful Variants

Common variants include:

```text
hover:
focus:
active:
disabled:
group-hover:
focus-visible:
```

Example:

```tsx
<button className="disabled:opacity-50">
```

When disabled:

```text
opacity → 50%
```

---

# 26. `group` and `group-hover`

This is useful when hovering one element should affect another.

Example:

```tsx
<div className="group">
  <h2 className="group-hover:text-blue-500">
    Project
  </h2>
</div>
```

When the parent is hovered, the heading changes color.

---

# 27. Arbitrary Values

Sometimes Tailwind doesn't have exactly the value you need.

You can use:

```tsx
<div className="w-[420px]">
```

or:

```tsx
<div className="top-[117px]">
```

or:

```tsx
<div className="bg-[#111827]">
```

Square brackets allow custom values.

However:

> Don't use arbitrary values for everything.

Prefer Tailwind's standard utilities when they fit your design.

---

# 28. Your Particle Background Class

Your component contains:

```tsx
className="fixed inset-0 w-full h-full pointer-events-none z-0"
```

Let's understand every class.

### `fixed`

```text
position: fixed
```

The canvas is attached to the viewport.

### `inset-0`

```text
top: 0
right: 0
bottom: 0
left: 0
```

### `w-full`

```text
width: 100%
```

### `h-full`

```text
height: 100%
```

### `pointer-events-none`

The canvas doesn't capture mouse clicks.

This is important because you don't want the background canvas to prevent users from clicking buttons and links above it.

### `z-0`

Places the canvas at a low stacking level.

---

# 29. Equivalent Normal CSS

This:

```tsx
<canvas
  className="fixed inset-0 w-full h-full pointer-events-none z-0"
/>
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

This comparison is one of the best ways to learn Tailwind.

---

# 30. Tailwind + React Components

You can create reusable components:

```tsx
const Button = () => {
  return (
    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
      Contact
    </button>
  );
};
```

Then:

```tsx
<Button />
```

The React component contains the styling.

---

# 31. Conditional Classes

Sometimes styling depends on a variable.

```tsx
const isActive = true;

<button
  className={
    isActive
      ? "bg-blue-600 text-white"
      : "bg-gray-200 text-black"
  }
>
  Home
</button>
```

For larger applications, developers often use utilities such as `clsx` or `classnames` to make conditional class composition easier.

---

# 32. Tailwind Is Still CSS

This is important.

Learning Tailwind does **not** mean you can ignore CSS.

You should still understand:

```text
Box model
Flexbox
Grid
Positioning
Display
Width / Height
Margin / Padding
Colors
Typography
Responsive design
Specificity
Overflow
Z-index
```

Tailwind is a different way of writing CSS.

---

# 33. Industry Learning Approach

Don't try to memorize 500 Tailwind classes.

Instead, learn the patterns.

For example:

```tsx
flex items-center justify-between
```

should immediately make you think:

```text
Flexbox
+
vertical alignment
+
space between children
```

Similarly:

```tsx
max-w-6xl mx-auto px-6
```

should make you think:

```text
Maximum content width
+
center container
+
horizontal padding
```

---

# 34. Practice Exercises

### Exercise 1

Create a card:

```text
Dark background
Rounded corners
Padding
Shadow
White heading
Gray description
```

---

### Exercise 2

Create a responsive layout:

```text
Mobile → 1 column
Tablet → 2 columns
Desktop → 3 columns
```

---

### Exercise 3

Create a button with:

```text
Normal state
Hover state
Focus state
Disabled state
```

---

### Exercise 4

Take one Tailwind class and write its equivalent normal CSS.

For example:

```text
flex
```

becomes:

```css
display: flex;
```

---

# 35. Tailwind Cheat Sheet

```text
LAYOUT
flex
grid
block
hidden

FLEX
flex-row
flex-col
items-center
justify-center
justify-between
gap-4

SPACING
p-4
px-4
py-4
m-4
mx-auto
mt-4
mb-4
gap-4

SIZE
w-full
h-full
h-screen
min-h-screen
max-w-6xl

TEXT
text-sm
text-lg
text-xl
text-2xl
font-medium
font-bold
text-center

COLORS
bg-slate-900
text-white
text-slate-400
border-slate-700

BORDER
border
rounded-lg
rounded-xl
rounded-full

POSITION
relative
absolute
fixed
sticky
inset-0

LAYER
z-0
z-10
z-50

RESPONSIVE
sm:
md:
lg:
xl:
2xl:

STATE
hover:
focus:
active:
disabled:
group-hover:
```

---

# 36. What You Should Be Able to Do After This File

You don't need to know every Tailwind utility.

You should be able to look at:

```tsx
className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-4"
```

and understand:

```text
flex
→ Flexbox

flex-col
→ vertical layout

md:flex-row
→ horizontal layout on medium+ screens

items-center
→ cross-axis alignment

justify-between
→ distribute children

gap-6
→ spacing between children

px-6
→ horizontal padding

py-4
→ vertical padding
```

That is the level of understanding you should aim for initially.
