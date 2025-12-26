/* export const quickSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr];
  
  const partition = (array, low, high) => {
    let pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      steps.push({ array: [...array], comparing: [j, high], swapping: false });
      
      if (array[j] < pivot) {
        i++;
        steps.push({ array: [...array], comparing: [i, j], swapping: true });
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({ array: [...array], comparing: [i, j], swapping: false });
      }
    }
    
    steps.push({ array: [...array], comparing: [i + 1, high], swapping: true });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({ array: [...array], comparing: [i + 1, high], swapping: false });
    
    return i + 1;
  };
  
  const quickSortHelper = (array, low, high) => {
    if (low < high) {
      let pi = partition(array, low, high);
      quickSortHelper(array, low, pi - 1);
      quickSortHelper(array, pi + 1, high);
    }
  };
  
  quickSortHelper(arrCopy, 0, arrCopy.length - 1);
  steps.push({ array: [...arrCopy], comparing: [], swapping: false });
  
  return steps;
}; */


export const quickSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr]; // Create a copy to preserve original array

  // Partition function to find the pivot point and sort around it
  const partition = (array, low, high) => {
    let pivot = array[high];
    let i = low - 1;

    // Loop through the array, comparing elements with the pivot
    for (let j = low; j < high; j++) {
      steps.push({ array: [...array], comparing: [j, high], swapping: false });

      if (array[j] < pivot) {
        i++;
        // Swap elements if the current element is smaller than the pivot
        steps.push({ array: [...array], comparing: [i, j], swapping: true });
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({ array: [...array], comparing: [i, j], swapping: false });
      }
    }

    // Place pivot in the correct position
    steps.push({ array: [...array], comparing: [i + 1, high], swapping: true });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({ array: [...array], comparing: [i + 1, high], swapping: false });

    return i + 1;
  };

  // Helper function for quickSort (recursively calls itself)
  const quickSortHelper = (array, low, high) => {
    if (low < high) {
      let pi = partition(array, low, high); // Get partition index
      quickSortHelper(array, low, pi - 1);   // Recursively sort left
      quickSortHelper(array, pi + 1, high);  // Recursively sort right
    }
  };

  // Start the sorting process
  const startTime = performance.now();
  quickSortHelper(arrCopy, 0, arrCopy.length - 1);
  const endTime = performance.now();
  const sortingTime = endTime - startTime;
  console.log(`Quick Sort completed in ${sortingTime.toFixed(2)}ms`);

  // Push the final sorted array step
  steps.push({ array: [...arrCopy], comparing: [], swapping: false });

  return steps;
};
