let arr = [
  [14, 16, 5,  1,  4,  3,  20,  1],
  [19, 17, 11, 8,  10, 18, 20, 1],
  [2,  5,  4,  1,  14, 17, 20,  1],
  [4,  9,  3,  13, 16, 15, 20, 1],
  [5,  2,  7,  10, 2,  16, 20,  1],
  [14, 15, 4,  5,  17, 5,  20,  2]
]

getMiddleColIndex = function(currentArray) {
  return (currentArray[0].length / 2) - 1;
}

getMiddleCol = function(currentArray) {
  let index = getMiddleColIndex(currentArray);
  let middleCol = [];
  for (let num of arr) {
    middleCol.push(num[index])
  }
  return middleCol;
}

maxInCol = function(currentArray) {
  let col = getMiddleCol(currentArray)
  return Math.max(...col) //This has the potential to fail if the array is too large
}

getIndexOfMax = function(currentArray) {
  let arr = getMiddleCol(currentArray)
  return(arr.reduce((iMax, x, i, arr2) => x > arr2[iMax] ? i : iMax, 0)); //stolen from StackOverflow. Need to look into reduce()
}

buildLeftArray = function(currentArray, j) {
  let oldArray = currentArray;
  console.log(oldArray);
  let newArray = [];
  for (let num of oldArray) {
    newArray.push(num.slice(0, j));
  }
  console.log('new left array');
  console.log(newArray);
  return newArray;
}

buildRightArray = function(currentArray, j) {
  let oldArray = currentArray;
  let newArray = [];
  for (let num of oldArray) {
    newArray.push(num.slice(j + 1))
  }
  console.log('new right array');
  console.log(newArray);
  return newArray;
}

determineSearch = function (array) {
  let currentArray = array;
  let newArray = [];
  let start = [getIndexOfMax(currentArray), getMiddleColIndex(currentArray)];
  let i = start[0], j = start[1]
  console.log('start')
  console.log(start)
  if (currentArray[i][j-1] > currentArray[i][j]) {
    newArray = buildLeftArray(currentArray, j);
    return determineSearch(newArray);
  } else if (arr[i][j+1] > arr[i][j]) {
    console.log(arr[i][j+1]);
    console.log(arr[i][j])
    newArray = buildRightArray(currentArray, j);
    return determineSearch(newArray);
  } else {
    console.log('done')
    console.log(currentArray)
    return (currentArray.reduce((iMax, x, i, arr2) => x > arr2[iMax] ? i : iMax, 0)); 
  }
}

console.log(determineSearch(arr));

//Find middle column
//Find maximum in this column at (i, j) [i = row, j = col]
//Compare (i, j-1), (i, j), (i, j +1)
// Determine which half to search in:
  //Pick left columns if (i, j-1) > (i, j) else right cols if (i, j+1) > (i, j)
  //If neither of these is the case, the peak has been found
//Contiue splitting and searching either left or right columns until there is 1 column remaining
//Find maxiumum in final single column


