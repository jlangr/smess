const arr = ['a', 'b', 'c'];
for (var i = 0; i < arr.length; i++) {
  setTimeout(() => console.log(arr[i]), 100);
}
