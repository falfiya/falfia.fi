+++
title = "Type Theory for Programmers"
date = 2025-03-21

[taxonomies]
categories = ["tutorial"]
tags = ["math", "type theory", "computer science"]
+++

*This post assumes basic familiarity with JavaScript, TypeScript, Python, or some other programming language.*

## What are Types?

If you're a programmer, chances are you've run into types.



## Type Systems

Let's look at an example program in JavaScript:

```js
// add3x.js
function add3x(i) {
   return i + i + i;
}
```

- Check errors
- Give more information to the programmer
- Produce optimized programs

```python
def add_3x(i):
   return i + i + i
```

```c
int add_3x(int i) {
   return i + i + i;
}
```

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
on this article to see some code in action.

## Where Math and Programming Differ

So math is syntactically ambiguous. It seems that as long as there is a valid way to interpret something, it's fine.



<!-- more -->

$$
\frac{d}{dx} \left( \int_{0}^{x} f(u) \, du \right) = f(x)
$$

```rust

fn main() {
    println!("Hello World");
}
```

Same snippet with line numbers:

```rust,linenos
fn main() {
    println!("Hello World");
}
```

Same snippet with line numbers and line highlighting:

```rust,hl_lines=2,linenos
fn main() {
    println!("Hello World");
}
```

Python example:

```python

def main():
    print("Hello, world!")
```

This is another code block with syntax highlighting. It's pretty cool, right?
You can also have inline code like this: `var example = true`.

<!-- prettier-ignore-->
```js

function debounce(func, wait) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}
```

## Citations

1. a
