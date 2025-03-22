+++
title = "Type Theory for Programmers"
date = 2025-03-22

[taxonomies]
categories = ["tutorial"]
tags = ["math", "type theory", "computer science"]
+++

<style>
   pre code table mark {
      background-color: #ff0000aa !important;
      color: #ffffff; /* White text for better contrast */
   }
   table tbody td:first-child {
      font-weight: inherit !important;
      color: inherit !important;
   }
</style>

A program can be thought of as a mathematical function; it takes data in and it gives data out.
There are many different *types* of data.

```py
32.1
"hello!"
```

Each value has a *type* associated with it. `32.1` is a `number` and `"hello!"`
is a string.
Types for the same conceptual value might not be the same in every programming
language.
In C, C++, Java, and Python, `32.1` is a `float`. Unlike JavaScript, these
languages differentiate between integers and other real numbers.

## JavaScript in 111 Seconds

To get on the same page, this post is going to use JavaScript for it's examples.
If you already know JavaScript and TypeScript, you can
[skip ahead](#motivation-for-type-theories).

Here are some different types in a few programming languages:

<table>
   <tr><th></th><th>JavaScript</th><th>C/C++</th><th>Java</th><th>Python</th></tr>
   <tr><td>Real Number ($\mathbb{R}$)</td>
   <td>number</td>
   <td>int

   unsigned int

   float

   double
   </td>

   <td>int

   float

   double
   </td>
   <td>int

   float
   </td>
   </tr>
   <tr><td>String</td><td>string</td><td>char *</td><td>String</td><td>str</td></tr>
   <tr><td>Nothing</td><td>
   undefined

   null
   </td>
   <td>void</td><td>void</td><td>None</td></tr>
</table>

This is not an exhaustive list but it should be enough to get us up and running.

To get familiar with the syntax of JavaScript,
I'm going to write the same few functions in each of these languages:

<table>
<tr>
   <td>

   JavaScript

   </td>
   <td>

   ```js
   function average(a, b) {
      return (a + b) / 2;
   }

   function exclaim(s) {
      return s + "!";
   }
   ```
   </td>
</tr>

<tr>
   <td>

   TypeScript

   </td>
   <td>

   ```ts
   function average(a: number, b: number): number {
      return (a + b) / 2;
   }

   function exclaim(s: string): string {
      return s + "!";
   }
   ```
   </td>
</tr>

<tr>
   <td>

   C / C++

   </td>
   <td>

   ```cxx
   float average(float a, float b) {
      return (a + b) / 2;
   }

   char *exclaim(char const *s) {
      size_t old_len = strlen(s);
      size_t new_len = old_len + 1;
      char *out = malloc(new_len + 1); // +1 for '\0'
      memcpy(out, s, old_len);
      out[old_len] = '!';
      out[new_len] = '\0';
      return out;
   }
   ```
   </td>
</tr>

<tr>
   <td>

   Java

   </td>
   <td>

   ```java
   float average(float a, float b) {
      return (a + b) / 2;
   }

   String exclaim(String s) {
      return s + "!";
   }
   ```
   </td>
</tr>

<tr>
   <td>

   Python

   </td>
   <td>

   ```py
   def average(a, b):
      return (a + b) / 2

   def exclaim(s: str) -> str:
      return s + "!"
   ```
   </td>
</tr>

</table>

Besides the C one that took some memory finagling, they all more or less look
the same.
There are two things of note:

1. The TypeScript is almost identical to the the JavaScript. The only difference
   is types attached using `: type`.
2. The Python program has types listed for `exclaim` but not `average`. That's
   because `average(a: int, b: int) -> float` wouldn't quite be accurate.
   `a` and `b` can be either `int` *or* `float`[^1].

The rest of this post will use JavaScript (and eventually TypeScript).
We won't use advanced syntax in this post.

## Dynamic Typing

Let's look at an example program in JavaScript:

<a name="add_iij.js"></a>

```js
// add_iij.js
function add_iij(i, j) {
   return i + i + j;
}
```

I can call this function in several different ways:

<table>
<tr><td>

Call</td><td>

```js
add_iij(1, 2)
add_iij(2.2, 2.4)
add_iij("had had ", "a better effect on the teacher")
```

</td></tr>
<tr>


<td>

Result</td>

<td>

```js
4
6.800000000000001 // pain
"had had had had a better effect on the teacher"
```

</td>

</tr>
</table>

In JavaScript, when you add two numbers, you get another number.
But when you add two strings, you get another string.

```ts
number + number => number
string + string => string
```

## Gradually Typing Statically

- Check errors
- Give more information to the programmer
- Produce optimized programs

## Motivation for Type Theories

From a programmer's perspective, the primary motivation for type theories is *terseness*, *formality*, and *precision*.

From here on out, let's use $x$, $y$, and $z$ to refer to expressions. They could be any expression such as:

- `1 + 2`
- `5 * f(3)`
- `"hello" + " world"`
- `foobar`



In today's blog post, we're going to be trying to understand this:

$$
\frac{\Gamma \vdash f : \tau \rightarrow \tau' \quad \Gamma \vdash x : \tau}{\Gamma \vdash f\\,x : \tau'}
$$

Today we are going to look at simple type theory. I've often found type theory
to be somewhat inaccessible because of the notational barrier and so this is a
guide for programmers to get into type theory.

To start off with, we're going to need to get you familiar with sets and math.

Unlike programming languages, math is much more fluid and there is sometimes syntactic ambiguity.

First, I'm going to introduce basic set theory.

## Basic Set Theory

Have code snippets complete with **clipboard functionality** and **fancy
language tags**. No more boring code snippets in your pages. Oh yeah baby! Click
on this article to see some code in action.[^2]

## Where Math and Programming Differ

So math is syntactically ambiguous. It seems that as long as there is a valid way to interpret something, it's fine.

Same snippet with line numbers and line highlighting:

```ts,hl_lines=6,linenos
function timesTwo(x: number): number {
   const y = Math.floor(x) * 2;
   if (y % 2 === 0) {
      return y;
   }
}
```

TypeScript isn't fond of this at all.

> Function lacks ending return statement and return type does not include 'undefined'

We, as humans, know that since `y` is always an integer multiple of 2, `y` modulo 2 will always be 0.
Unfortunately, TypeScript isn't that clever yet.


## Easing into Math

$y = \\{2a\\,|\\,a \in \mathbb{Z}\\}$ and that therefore $\forall b \in y : mod(b, 2) = 0$


## Citations

1. F. Shinko, Introduction to type theory. [Online]. Available: https://math.berkeley.edu/~forte/notes/type_theory.pdf. Accessed: Mar. 12, 2025.
2. H. Geuvers, Introduction to Type Theory. [Online]. Available: https://www.cs.ru.nl/~herman/onderwijs/provingwithCA/paper-lncs.pdf. Accessed: Mar. 13, 2025.
3. B. C. Pierce, Types and Programming Languages Cambridge, MA, USA: MIT Press, 2002.

## Links

[^1]: `int | float` is a valid way to write that, but I didn't want to introduce union types just yet.
