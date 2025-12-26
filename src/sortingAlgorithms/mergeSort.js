/* export const mergeSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr];
  
  const merge = (array, left, mid, right) => {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    
    let L = new Array(n1);
    let R = new Array(n2);
    
    for (let i = 0; i < n1; i++) {
      L[i] = array[left + i];
    }
    
    for (let j = 0; j < n2; j++) {
      R[j] = array[mid + 1 + j];
    }
    
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
      steps.push({ array: [...array], comparing: [left + i, mid + 1 + j], swapping: false });
      
      if (L[i] <= R[j]) {
        array[k] = L[i];
        i++;
      } else {
        array[k] = R[j];
        j++;
      }
      k++;
    }
    
    while (i < n1) {
      array[k] = L[i];
      i++;
      k++;
    }
    
    while (j < n2) {
      array[k] = R[j];
      j++;
      k++;
    }
  };
  
  const mergeSortHelper = (array, left, right) => {
    if (left >= right) return;
    
    let mid = left + Math.floor((right - left) / 2);
    mergeSortHelper(array, left, mid);
    mergeSortHelper(array, mid + 1, right);
    merge(array, left, mid, right);
  };
  
  mergeSortHelper(arrCopy, 0, arrCopy.length - 1);
  steps.push({ array: [...arrCopy], comparing: [], swapping: false });
  
  return steps;
}; */

export const mergeSort = (arr, speed) => {
  const steps = [];
  const arrCopy = [...arr]; // Create a copy to keep original array intact
  
  const merge = (array, left, mid, right) => {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    
    let L = new Array(n1);
    let R = new Array(n2);
    
    for (let i = 0; i < n1; i++) {
      L[i] = array[left + i];
    }
    
    for (let j = 0; j < n2; j++) {
      R[j] = array[mid + 1 + j];
    }
    
    let i = 0, j = 0, k = left;

    // Merging the two halves into a sorted array
    while (i < n1 && j < n2) {
      steps.push({ array: [...array], comparing: [left + i, mid + 1 + j], swapping: false });
      
      if (L[i] <= R[j]) {
        array[k] = L[i];
        i++;
      } else {
        array[k] = R[j];
        j++;
      }
      k++;
    }

    // Copy the remaining elements of L[] if there are any
    while (i < n1) {
      array[k] = L[i];
      i++;
      k++;
    }

    // Copy the remaining elements of R[] if there are any
    while (j < n2) {
      array[k] = R[j];
      j++;
      k++;
    }
  };

  const mergeSortHelper = (array, left, right) => {
    if (left >= right) return;
    
    let mid = left + Math.floor((right - left) / 2);
    mergeSortHelper(array, left, mid);
    mergeSortHelper(array, mid + 1, right);
    merge(array, left, mid, right);
    
    // Push the final sorted array at the end
    steps.push({ array: [...array], comparing: [], swapping: false });
  };

  // Begin sorting and track performance
  const startTime = performance.now();
  mergeSortHelper(arrCopy, 0, arrCopy.length - 1);
  const endTime = performance.now();
  const sortingTime = endTime - startTime;
  console.log(`Merge Sort completed in ${sortingTime.toFixed(2)}ms`);

  return steps;
};
