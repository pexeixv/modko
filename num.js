const numbers = [1, 2, 4, 7];

const arr = [];

for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    arr.push(`${numbers[i]}${numbers[j]}`)
  }
}

console.log(arr)