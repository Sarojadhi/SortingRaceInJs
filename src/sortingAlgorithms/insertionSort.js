/* export const insertionSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr];
  let n = arrCopy.length;
  
  for (let i = 1; i < n; i++) {
    let key = arrCopy[i];
    let j = i - 1;
    
    steps.push({ array: [...arrCopy], comparing: [i, j], swapping: false });
    
    while (j >= 0 && arrCopy[j] > key) {
      steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: true });
      arrCopy[j + 1] = arrCopy[j];
      steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: false });
      j = j - 1;
    }
    
    arrCopy[j + 1] = key;
    steps.push({ array: [...arrCopy], comparing: [], swapping: false });
  }
  
  steps.push({ array: [...arrCopy], comparing: [], swapping: false });
  return steps;
};*/


export const insertionSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr];
  let n = arrCopy.length;
  
  const startTime = performance.now(); // Track sorting time
  
  for (let i = 1; i < n; i++) {
    let key = arrCopy[i];
    let j = i - 1;
    
    // Push the initial comparison between key and arr[j]
    steps.push({ array: [...arrCopy], comparing: [i, j], swapping: false });

    while (j >= 0 && arrCopy[j] > key) {
      // Swapping is about to happen
      steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: true });
      
      // Shift arr[j] to the right
      arrCopy[j + 1] = arrCopy[j];

      // Show the current array state after the swap
      steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: false });
      j = j - 1;
    }
    
    // Insert key at the correct position
    arrCopy[j + 1] = key;

    // Show the array after placing the key
    steps.push({ array: [...arrCopy], comparing: [], swapping: false });
  }
  
  const endTime = performance.now();
  const sortingTime = endTime - startTime;  // Measure time taken for sorting
  
  console.log(`Insertion Sort completed in ${sortingTime.toFixed(2)}ms`);
  
  // Final step to indicate sorting is complete
  steps.push({ array: [...arrCopy], comparing: [], swapping: false });
  
  return steps;
};
