/* export const selectionSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr];
  let n = arrCopy.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...arrCopy], comparing: [minIdx, j], swapping: false });
      
      if (arrCopy[j] < arrCopy[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      steps.push({ array: [...arrCopy], comparing: [i, minIdx], swapping: true });
      [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]];
      steps.push({ array: [...arrCopy], comparing: [i, minIdx], swapping: false });
    }
  }
  
  steps.push({ array: [...arrCopy], comparing: [], swapping: false });
  return steps;
}; */



export const selectionSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr]; // Make a copy of the array to avoid mutation of the original
  let n = arrCopy.length;

  // Traverse the array
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find the minimum element in the unsorted part of the array
    for (let j = i + 1; j < n; j++) {
      // Push the current comparison step (before any swapping)
      steps.push({ array: [...arrCopy], comparing: [minIdx, j], swapping: false });

      // Update the minimum index if a smaller element is found
      if (arrCopy[j] < arrCopy[minIdx]) {
        minIdx = j;
      }
    }

    // If the minIdx has changed, perform the swap and log it
    if (minIdx !== i) {
      steps.push({ array: [...arrCopy], comparing: [i, minIdx], swapping: true });
      [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]];
      steps.push({ array: [...arrCopy], comparing: [i, minIdx], swapping: false });
    }
  }

  // Final step after sorting is complete
  steps.push({ array: [...arrCopy], comparing: [], swapping: false });

  return steps;
};
