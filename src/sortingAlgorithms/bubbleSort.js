/* export const bubbleSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr];
  let n = arrCopy.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: false });
      
      if (arrCopy[j] > arrCopy[j + 1]) {
        steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: true });
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
        steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: false });
      }
    }
  }
  
  steps.push({ array: [...arrCopy], comparing: [], swapping: false });
  return steps;
}; */


export const bubbleSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr];
  let n = arrCopy.length;

  // Track time to measure the actual sorting time outside the function
  const startTime = performance.now(); // Record the start time
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Push the current state of the array for visualization
      steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: false });

      if (arrCopy[j] > arrCopy[j + 1]) {
        // Swap the elements
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
        steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: true });
      }

      // After each swap or comparison, show the current array state
      steps.push({ array: [...arrCopy], comparing: [j, j + 1], swapping: false });
    }
  }
  
  // End time for the sorting process
  const endTime = performance.now();
  const sortingTime = endTime - startTime;  // Calculate the time taken to sort the array
  
  // Add a final step after sorting is done (optional)
  steps.push({ array: [...arrCopy], comparing: [], swapping: false });

  console.log(`Bubble Sort completed in ${sortingTime.toFixed(2)}ms`);
  
  return steps;
};
