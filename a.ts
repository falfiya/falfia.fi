function average(a: number, b: number): number {
   return (a + b) / 2;
}

let x;
if (Math.random() > 0.01) {
   x = average(9, 9);
} else {
   // very rare!
   x = average("9", 9);
}
