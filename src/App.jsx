import React, { useState, useEffect, useCallback } from 'react';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort
} from './sortingAlgorithms';

const App = () => {
  const [arraySize, setArraySize] = useState(20);
  const [sortingSpeed, setSortingSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithms, setAlgorithms] = useState([
    { 
      name: 'Bubble Sort', 
      sortFn: bubbleSort, 
      steps: [], 
      currentStep: 0, 
      isSorted: false, 
      time: 0, 
      completed: false, // Track individual completion
      color: '#FF6B6B',
      description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
    },
    { 
      name: 'Selection Sort', 
      sortFn: selectionSort, 
      steps: [], 
      currentStep: 0, 
      isSorted: false, 
      time: 0,
      completed: false,
      color: '#4ECDC4',
      description: 'Repeatedly finds the minimum element from unsorted part and puts it at the beginning.'
    },
    { 
      name: 'Insertion Sort', 
      sortFn: insertionSort, 
      steps: [], 
      currentStep: 0, 
      isSorted: false, 
      time: 0,
      completed: false,
      color: '#FFD166',
      description: 'Builds the final sorted array one item at a time by comparisons.'
    },
    { 
      name: 'Quick Sort', 
      sortFn: quickSort, 
      steps: [], 
      currentStep: 0, 
      isSorted: false, 
      time: 0,
      completed: false,
      color: '#06D6A0',
      description: 'Divide and conquer algorithm that picks an element as pivot and partitions the array around the pivot.'
    },
    { 
      name: 'Merge Sort', 
      sortFn: mergeSort, 
      steps: [], 
      currentStep: 0, 
      isSorted: false, 
      time: 0,
      completed: false,
      color: '#118AB2',
      description: 'Divide and conquer algorithm that divides the array into halves, sorts them and merges them.'
    },
  ]);
  const [initialArray, setInitialArray] = useState([]);
  const [winner, setWinner] = useState(null);

  // Initialize with random array
  const generateNewArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 5);
    setInitialArray(newArray);
    
    const updatedAlgorithms = algorithms.map(algo => ({
      ...algo,
      steps: [],
      currentStep: 0,
      isSorted: false,
      completed: false,
      time: 0
    }));
    
    setAlgorithms(updatedAlgorithms);
    setWinner(null);
  }, [arraySize]);

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  const startSortingRace = () => {
    if (isSorting) return;
    
    setIsSorting(true);
    setWinner(null);
    const startTime = performance.now();
    
    // Generate steps for each algorithm
    const updatedAlgorithms = algorithms.map(algo => {
      const steps = algo.sortFn(initialArray);
      return {
        ...algo,
        steps,
        currentStep: 0,
        isSorted: false,
        completed: false,
        time: 0
      };
    });
    
    setAlgorithms(updatedAlgorithms);
    
    // Track individual completion
    const completedAlgorithms = new Set();
    
    let currentStep = 0;
    const maxSteps = Math.max(...updatedAlgorithms.map(algo => algo.steps.length));
    
    const interval = setInterval(() => {
      const currentTime = performance.now() - startTime;
      
      setAlgorithms(prev => prev.map(algo => {
        // If algorithm is already completed, don't update its step
        if (algo.completed) {
          return algo;
        }
        
        // If algorithm has steps remaining for this currentStep
        if (currentStep < algo.steps.length) {
          return {
            ...algo,
            currentStep,
            time: currentTime
          };
        } 
        // Algorithm just completed in this step
        else if (currentStep >= algo.steps.length && !algo.completed) {
          completedAlgorithms.add(algo.name);
          
          // Check if this is the first algorithm to complete
          if (completedAlgorithms.size === 1) {
            setWinner({
              name: algo.name,
              time: currentTime,
              color: algo.color
            });
          }
          
          return {
            ...algo,
            isSorted: true,
            completed: true,
            time: currentTime // Record the actual completion time
          };
        }
        // Algorithm should continue with current time
        else {
          return {
            ...algo,
            time: currentTime
          };
        }
      }));
      
      // Check if all algorithms are done
      const allCompleted = updatedAlgorithms.every(algo => 
        currentStep >= algo.steps.length
      );
      
      if (currentStep >= maxSteps || allCompleted) {
        clearInterval(interval);
        setIsSorting(false);
        
        // Final update to ensure all times are set
        const finalTime = performance.now() - startTime;
        setAlgorithms(prev => prev.map(algo => ({
          ...algo,
          isSorted: true,
          completed: true,
          time: algo.completed ? algo.time : finalTime
        })));
        
        // If no winner was set (all finished at same time), set the fastest
        if (!winner) {
          const fastest = prev => {
            const sorted = [...prev].sort((a, b) => a.time - b.time);
            return sorted[0];
          };
          setAlgorithms(prev => {
            const fastestAlgo = fastest(prev);
            setWinner({
              name: fastestAlgo.name,
              time: fastestAlgo.time,
              color: fastestAlgo.color
            });
            return prev;
          });
        }
      }
      
      currentStep++;
    }, 100 - sortingSpeed);
  };

  const resetRace = () => {
    setIsSorting(false);
    setWinner(null);
    generateNewArray();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-6">
      {/* Header */}
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
          Sorting Algorithm Race
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Watch 5 sorting algorithms compete to sort the same array in real-time!
        </p>
      </header>

      {/* Winner Banner */}
      {winner && (
        <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-700/30 border border-yellow-600/50 rounded-2xl p-4 mb-6 animate-pulse">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-3xl">🏆</span>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-300">
                Winner: {winner.name}!
              </div>
              <div className="text-gray-300">
                Finished in {winner.time.toFixed(0)}ms
              </div>
            </div>
            <span className="text-3xl">🏆</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/50 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-3">
            <label className="block text-gray-300 font-medium">
              Array Size: <span className="text-cyan-400">{arraySize}</span>
            </label>
            <input
              type="range"
              min="10"
              max="40"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isSorting}
              className="w-full h-2 bg-gradient-to-r from-red-500 to-cyan-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>10</span>
              <span>25</span>
              <span>40</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-gray-300 font-medium">
              Sorting Speed: <span className="text-cyan-400">{sortingSpeed}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="90"
              value={sortingSpeed}
              onChange={(e) => setSortingSpeed(parseInt(e.target.value))}
              disabled={isSorting}
              className="w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>Slow</span>
              <span>Medium</span>
              <span>Fast</span>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={startSortingRace}
                disabled={isSorting}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              >
                {isSorting ? '🏁 Racing...' : '🚀 Start Race'}
              </button>
              <button
                onClick={resetRace}
                disabled={isSorting}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              >
                🔄 Reset
              </button>
            </div>
            <button
              onClick={generateNewArray}
              disabled={isSorting}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              🎲 Generate New Array
            </button>
          </div>
        </div>
      </div>

      {/* Initial Array Visualization */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/50 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">
          Initial Array
        </h2>
        <div className="flex justify-center items-end h-48 bg-gray-900/50 rounded-xl p-4 border border-gray-700/30">
          {initialArray.map((value, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center mx-1"
              style={{ width: `${100 / arraySize}%` }}
            >
              <div
                className="w-full rounded-t-lg transition-all duration-200 ease-out"
                style={{
                  height: `${value * 2.5}px`,
                  backgroundColor: '#8B5CF6',
                  boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)'
                }}
              ></div>
              <span className="text-xs mt-2 text-gray-300 font-medium">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Algorithms Race */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">
          Sorting Algorithms Race
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {algorithms.map((algo, index) => {
            const currentStepData = algo.steps[algo.currentStep] || { 
              array: initialArray, 
              comparing: [], 
              swapping: false 
            };
            const arrayToDisplay = currentStepData.array.length > 0 ? currentStepData.array : initialArray;
            const progress = algo.steps.length > 0 ? (algo.currentStep / algo.steps.length) * 100 : 0;
            
            return (
              <div
                key={index}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-[1.02] ${
                  algo.isSorted
                    ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'border-gray-700/50'
                } ${winner?.name === algo.name ? 'ring-2 ring-yellow-500/50' : ''}`}
              >
                {/* Algorithm Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: algo.color }}
                    ></div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-100">{algo.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{algo.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">
                      {algo.time.toFixed(0)}<span className="text-sm font-normal text-gray-400">ms</span>
                    </div>
                    <div className={`text-sm font-medium px-3 py-1 rounded-full mt-1 ${
                      algo.isSorted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isSorting
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {algo.isSorted ? '🏁 Sorted!' : isSorting ? '⚡ Sorting...' : '⏳ Ready'}
                    </div>
                  </div>
                </div>

                {/* Array Visualization */}
                <div className="flex justify-center items-end h-32 bg-gray-900/50 rounded-xl p-3 mb-4 border border-gray-700/30">
                  {arrayToDisplay.map((value, idx) => {
                    let barColor = algo.color;
                    let barClass = "mx-0.5 rounded-t-lg transition-all duration-200";
                    
                    if (currentStepData.comparing.includes(idx)) {
                      barColor = currentStepData.swapping ? '#EF476F' : '#FFD166';
                      barClass += " shadow-lg";
                    }
                    
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center"
                        style={{ width: `${100 / arrayToDisplay.length}%` }}
                      >
                        <div
                          className={barClass}
                          style={{
                            height: `${value * 2}px`,
                            backgroundColor: barColor,
                            boxShadow: currentStepData.comparing.includes(idx)
                              ? `0 0 15px ${barColor}80`
                              : `0 4px 6px ${barColor}30`
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progress</span>
                    <span>{algo.currentStep} / {algo.steps.length || 0} steps</span>
                  </div>
                  <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: algo.color,
                        boxShadow: `0 0 10px ${algo.color}80`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">
          Color Legend
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {algorithms.map((algo, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: algo.color }}
              ></div>
              <span className="text-sm text-gray-300">{algo.name}</span>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-300">Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-300">Swapping</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500 text-sm">
        <p>
          Sorting Algorithm Race • Built with React + Vite + Tailwind CSS • 
          Watch Quick Sort and Merge Sort usually win the race! 🏎️
        </p>
      </footer>
    </div>
  );
};

export default App;