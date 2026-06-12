// exercise1.ts — add the types; do NOT change the logic
const BASE_PRICE = 200;
function ticketPrice(age:number, isMember?:boolean):number {
  // isMember should be OPTIONAL
  let price = BASE_PRICE;
  if (age < 12) price = price / 2;
  if (age >= 60) price = price * 0.7;
  if (isMember) price = price - 20;
  return price;
}
function totalFor(ages:number[]):number {
  // ages: array of numbers
  let total = 0;
  for (const age of ages) total += ticketPrice(age);
  return total;
}
console.log(ticketPrice(30)); // 200
console.log(ticketPrice(8, true)); // 80
console.log(totalFor([30, 8, 65])); // 440

// console.log(ticketPrice("30")); //error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

const SHOW_TIMES:string[] = ["11:20", "12:12", "02:30"];

