const bubbleSort = (arr) => {
  let swapped = true;

  while (swapped) {
    swapped = false;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  }

  return arr;
};

let nums = [2, 5, 3, 7, 6];
console.log(bubbleSort(nums));
