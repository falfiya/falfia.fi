+++
title = "Type Theory for Programmers"
date = 2025-03-22

[taxonomies]
categories = ["tutorial"]
tags = ["math", "type theory", "computer science"]
+++

<style>
   pre code table mark {
      background-color:rgba(192, 69, 122, 0.67) !important;
      color: #ffffff; /* White text for better contrast */
   }
   table tbody td:first-child {
      font-weight: inherit !important;
   }
   table td {
      vertical-align: middle;
   }
   table td p {
      line-height: 1.5em;
      margin: 0 !important;
   }
   table td pre {
      margin: 5px !important;
      /* border-radius: 0 !important; */
   }
   table.center td {
      text-align: center;
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

<h2 id="javascript-in-n-seconds">JavaScript in 111 Seconds</h2>
<script>
   document.getElementById("javascript-in-n-seconds").innerText =
      `JavaScript in ${Math.random() * 100 + 100 | 0} Seconds`;
</script>

To get on the same page, this post is going to use JavaScript for it's examples.
If you already know JavaScript and TypeScript, you can
[skip ahead](#dynamic-typing).

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

In dynamically typed languages like JavaScript and Python, you are not
guaranteed to know the type of variables.

Let's look at an example program in JavaScript:

```js
// average.js
function average(a, b) {
   return (a + b) / 2;
}
```

I can call this function in several different ways:

```js
average(4, 2);         => 3
average(5.5, 4.5);     => 5
average(4, "2");       => 21
average("uh", "oh");   => NaN
```

Depending on the types of the arguments, something *very* different happens.
Particularly on lines 3 and 4.

In JavaScript, when you add two numbers, you get another number.
But when you add two strings, you get another string.

Additionally, anything plus a string gets you another string.
People call this behavior *weak-typing*[^2].

```js
 1   +  2  == 3
"1"  + "2" == "12"
 1   + "2" == "12"
null + "y" == "nully"
```

## Graduating to Static Typing

Let's switch to TypeScript and start adding types to our arguments.
We'd like to prohibit certain inputs that make the function behave strangely.

```ts,hl_lines=6-7,linenos
// average.ts
function average(a: number, b: number): number {
   return (a + b) / 2;
}

average(4, "2");
average("uh", "oh");
```

> Argument of type 'string' is not assignable to parameter of type 'number'.

As desired. In this case, we used types to constrain the function domain,
thereby shrinking the program execution space to something more representative
of "average". A smaller execution space is easier to reason about.

With static typing, we can catch bugs that would otherwise be very rare:

```ts,hl_lines=7,linenos
let x;
if (Math.random() > 0.001) {
   x = average(9, 9);
} else {
   // very rare!
   // compiler catches the bug anyways
   x = average("9", 9);
}
```

Another way of thinking about types is as sets.

## Easing Into Math

Our next code sample is rather contrived:

```ts,hl_lines=8,linenos
// times_two.ts
function times_two(x: number): number {
   const y = Math.floor(x) * 2;
   if (y % 2 === 0) {
      return y;
   }

   //return
}
```

> Function lacks ending return statement and return type does not include 'undefined'

We, as humans, know that `y` is always an integer multiple of 2. `y` modulo 2
must be 0.
Unfortunately, TypeScript isn't that clever yet.

Let's try and talk about that in a more mathematical way.
The primary motivation for math in this case is terseness, formality, and
precision.
To do that, we'll need to briefly cover logic and set theory.
If you know these, you can [skip ahead](#average.ts-explanation).

- Logical Connectives
   - Not: $\neg$
   - And: $\land$
   - Or: $\lor$
- Quantifiers
   - Exists: $\exists$
   - For All: $\forall$
- Misc
   - Such That: $\text{st}$ or $\ni:$
   - Therefore: $\therefore$

Sets are pretty great.
They're similar to arrays or lists in that they contain elements, but a set
cannot have duplicate elements. A value is either in a set or it isn't.
Unlike a list, the order of elements within a set does not matter.

A set is written using braces.
The following are sets containing only 1, 2, and 3 and they are all equivalent:

- $\\{1, 2, 3\\}$
- $\\{1, 2, 3, 1\\}$
- $\\{3, 2, 1\\}$

To write "`a` is an element of `A`", we write $a\\,\in\\,A$.

<center>

$$
\begin{array}{rcllr}
1&\in &\\{1, 2, 3\\}& \quad& \text{True}\\\\
4&\in &\\{1, 2, 3\\}& &\text{False}\\\\
4&\cancel{\in} &\\{1, 2, 3\\}&& \text{True}\\\\
\end{array}
$$

</center>

You can also construct sets using other sets.
The syntax is $\\{\textit{value}\\,|\\,\textit{conditional}\\}$. For example:

$$
\begin{align}
\text{let}\\,A &= \\{1, 2, 3\\} \\\\
B &= \\{2 * a\\,|\\,a\in A\\} \\\\
B &= \\{2, 4, 6\\}
\end{align}
$$

There are also some common set names:

- Empty Set: $\text{Ø}$
- Real Numbers: $\mathbb{R}$
- Integers: $\mathbb{Z}$
- Positive Integers (Natural Numbers): $\mathbb{N}^+$

<a name="average.ts-explanation"></a>
<table>
   <tr><td>TypeScript</td><td>Math</td><td>English</td></tr>
   <tr>

   <td>

```ts
function times_two(x: number)
```

   </td>

   <td>
$$
x \in \mathbb{R}
$$

   </td>
   <td>

`x` is *some* real number.

   </td>
   </tr>

   <tr>
   <td rowspan="2">

```ts
   const y = Math.floor(x) * 2;
```

   </td>
   <td>
$$
y = 2 * \text{floor}(x)
$$

   </td>
   <td>

`y` is 2 times the floor of `x`.

   </td>
   </tr>

   <tr>
   <td>

$$
y \in \\{2a\\,|\\,a \in \mathbb{Z}\\}
$$

   </td>
   <td>

`y` is an integer multiple of 2.

   </td>
   </tr>

   <tr>
   <td>

```ts
   if (y % 2 === 0) {
      return y;
   }
```

   </td>
   <td>

$$
\therefore
mod(y, 2) = 0
$$

   </td>
   <td>

Therefore, `y` modulo 2 is 0. The conditional is always true and `y` is
returned.

   </td>
   </tr>
</table>

Was this argument convincing? I think it was.
But there's a huge problem: we had to use our brain.
Brains can make mistakes and can be convinced of things that are untrue so this
proof is ungood.

*I;m Thinking About Thos Types*


## Assembling a Type Theory

It'd be just great if we could mechanize this process.
Once again, I will introduce more notation[^3]:

$$
\frac{\textit{Premise}_1\quad...\quad\textit{Premise}_n}{\textit{Conclusion}}\textit{Name}
$$

This is no fraction! This is an inference rule. Let's look at a few examples:

<table>
<tr>
<td>

$$
\frac{\text{Raining}}{\text{Wet In My Garden}}
$$

</td>
<td>

$$
\frac{\text{Sprinklers On}}{\text{Wet In My Garden}}
$$

</td>
</tr>

<tr>
<td colspan="2">

$$
\frac{\text{Flowers in My Garden} \quad \text{Wet In My Garden}}{\text{Flowers Watered}}
$$

</td>
</tr>
</table>

From these rules, I can prove that if it is raining **and** I have flowers in my
garden, then my flowers are watered.

$$
\frac{\dfrac{\text{Raining}}{\text{Wet In My Garden}}\quad\text{Flowers in My Garden}}{\text{Flowers Watered}}
$$

Also, if we can prove something without a premise, we simply omit the premises
entirely:

$$
\frac{}{\text{Types Are Wonderful!}}
$$

Fun, right?
Let's get some type theory going by writing inference rules for the JavaScript
`+` operator.

First, recursively define JavaScript expressions and create notation:

- $n$ is any $\mathbb{R}$
- $s$ is any `string`
- $e$ is an expression, which is one of:
   - $n$
   - $s$
   - $e_1 + e_2$

Subscripting any of these just distinguishes them.
$n_1$ and $n_2$ are both Reals, but not necessarily the same one.

Here are some JavaScript expressions written out in symbols:

<table>
<tr>
<td>

$$
[s]
$$

</td>
<td>

$$
[e_1 + s]
$$

</td>
<td>

$$
[n + e_1 + s]
$$

</td>
<td>

$$
[e_2 + e_1 + n + n]
$$

</td>
</table>

For clarity, let's always use brackets around the whole expression.

Next, let's define our types.

- $\diamond$ (diamond)
- $\omega$ (omega)
- $\tau$ (tau) is a type, which is one of:
   - $\diamond$
   - $\omega$

Now, I'm not going to tell you what $\diamond$ and $\omega$ are but I will show
you how they're used.

<table>
<tr>
<td>

$$
\frac{}{[n] : \diamond}
$$

</td>
<td>

$$
\frac{}{[s] : \omega}
$$

</td>
<td>

$$
\frac{e_1 : \diamond \quad e_2 : \diamond}{[e_1 + e_2] : \diamond}
$$

</td>
</tr>
<tr>
<td>

$$
\frac{e_1 : \omega \quad e_2 : \diamond}{[e_1 + e_2] : \omega}
$$

</td>
<td>

$$
\frac{e_1 : \diamond \quad e_2 : \omega}{[e_1 + e_2] : \omega}
$$

</td>
<td>

$$
\frac{e_1 : \omega \quad e_2 : \omega}{[e_1 + e_2] : \omega}
$$

</td>
</tr>
</table>

Recall the rules of the JavaScript `+` operator:

```ts
number + number => number
string + any    => string
any    + string => string
```

Try to understand the notation and guess what $\diamond$ and $\omega$ mean.
Then open the answer below.

<details>
   <summary>Answer</summary>

   When I write $[e] : \tau$, read "the JavaScript expression $e$ has type $\tau$".

   - $\diamond$ is for numbers
   - $\omega$ is for strings

   These are not sets. They are simply symbols that we'll attach to JavaScript
   expressions using the colon.

   <table class="center">
   <tr><td>Type Theory</td><td>English</td></tr>
   <tr>
   <td>
   $$
   \frac{e_1 : \diamond \quad e_2 : \omega}{[e_1 + e_2] : \omega}
   $$
   </td>
   <td>

   If the type of $e_1$ is `number` and the type of $e_2$ is `string`,

   then the type of $e_1 + e_2$ is `string`.

   </td>
   </tr>
   </table>
</details>

## Adding Variables and Context

$$
\frac{\Gamma \vdash [e_1] : \tau_1 \rightarrow \tau_2 \quad \Gamma \vdash [e_2] : \tau_1}{\Gamma \vdash [e_1(e_2)] : \tau_2}
$$

## Citations

1. F. Shinko, Introduction to type theory. [Online]. Available: https://math.berkeley.edu/~forte/notes/type_theory.pdf. Accessed: Mar. 12, 2025.
2. H. Geuvers, Introduction to Type Theory. [Online]. Available: https://www.cs.ru.nl/~herman/onderwijs/provingwithCA/paper-lncs.pdf. Accessed: Mar. 13, 2025.
3. B. C. Pierce, Types and Programming Languages Cambridge, MA, USA: MIT Press, 2002.

## Footnotes

[^1]: `int | float` is a valid way to write that, but I didn't want to introduce
union types just yet.

[^2]: People call things *weakly-typed* when they don't like what happens.

[^3]: This notation is called "Gentzen-style Natural Deduction"
