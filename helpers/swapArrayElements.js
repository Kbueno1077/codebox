export const swapArrayElements = function (arr, indexA, indexB) {
  let temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};
