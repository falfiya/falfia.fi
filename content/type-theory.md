+++
title = "Type Theory for Programmers"
date = 2025-03-21

[taxonomies]
categories = ["tutorial"]
tags = ["math", "type theory", "computer science"]
+++

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
