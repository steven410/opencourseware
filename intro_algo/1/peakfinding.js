  //Creates a grid using a 2D array
  let arr = [
    [14, 16, 5,  1,  4,  3,  13,  1, 2],
    [19, 17, 11, 8,  10, 18, 2, 1, 8],
    [2,  5,  4,  1,  14, 17, 7,  1, 5],
    [4,  9,  3,  13, 16, 15, 5, 1, 12],
    [5,  2,  7,  10, 2,  16, 20,  1, 4],
    [14, 15, 4,  5,  7, 5,  8,  2, 14]
  ]

  //Return the index of the middle number of an array rounded down
  getMiddleColIndex = function(currentArray) {
    let index = Math.floor(currentArray[0].length / 2)
    return (index);
  }

  //Given a 2D array, return an array made of the values in the middle column
  getMiddleCol = function(currentArray) {
    let index = getMiddleColIndex(currentArray);
    let middleCol = [];
    for (let num of arr) {
      middleCol.push(num[index])
    }
    return middleCol;
  }

  //Given an array, return the largest value in the middle col of the array
  maxInCol = function(currentArray) {
    let col = getMiddleCol(currentArray)
    let max = col.indexOf(Math.max(...col)) //This has the potential to fail if the array is too large
    return max
  }

  // getIndexOfMax = function(currentArray) {
  //   let arr = getMiddleCol(currentArray)
  //   indexMax = arr.reduce((bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, array) => currentlyTestedValue > array[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar, 0);; //stolen from StackOverflow. Need to look into reduce()
  //   return indexMax
  // }

  buildLeftArray = function(currentArray, j) {
    let oldArray = currentArray;
    let newArray = [];
    for (let num of oldArray) {
      newArray.push(num.slice(0, j));
    }
    return newArray;
  }

  buildRightArray = function(currentArray, j) {
    let oldArray = currentArray;
    let newArray = [];
    for (let num of oldArray) {
      newArray.push(num.slice(j + 1))
    }
    return newArray;
  }

  determineSearch = function (array) {
    let currentArray = array;
    let newArray = [];
    //Determine a starting point for searching by finding the index and value of the largest number in the middle col
    let start = [maxInCol(currentArray), getMiddleColIndex(currentArray)];
    let i = start[0], j = start[1]; //i = row, j = col
    if (currentArray[i][j-1] !== undefined && currentArray[i][j-1] > currentArray[i][j]) {
      newArray = buildLeftArray(currentArray, j);
      determineSearch(newArray);
    } else if (currentArray[i][j+1] !== undefined && currentArray[i][j+1] > currentArray[i][j]) {
      newArray = buildRightArray(currentArray, j);
      return determineSearch(newArray);
    } else {
      return "Peak found at col " + i + " row " + j + " with value " + currentArray[i][j]
    }
  }

  console.log(determineSearch(arr))

  //Basic flow:
  //Find middle column of the matrix
  //Find maximum in this column at (i, j) [i = row, j = col]
  //Compare (i, j-1), (i, j), (i, j +1)
  // Determine which half to search in:
    //Pick left columns if (i, j-1) > (i, j) else right cols if (i, j+1) > (i, j)
    //If neither of these is the case, the peak has been found
  //Contiue splitting and searching either left or right columns until there is 1 column remaining
  //Find maxiumum in final single column - this a peak




