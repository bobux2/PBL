import React, { useState, useEffect, useRef } from 'react';

const ThreeDCreditScore = ({ initialScore = 700 }) => {
  const [score, setScore] = useState(initialScore);
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const textElementsRef = useRef([]);
  
  // Handle score changes
  const handleScoreChange = (e) => {
    setScore(parseInt(e.target.value, 10));
  };
  
  // Quick navigation buttons
  const jumpToScore = (newScore) => {
    setScore(newScore);
  };
  
  // Get score category label
  const getScoreCategory = (score) => {
    if (score < 580) return "Poor";
    if (score < 670) return "Fair";
    if (score < 740) return "Good";
    if (score < 800) return "Very Good";
    return "Excellent";
  };
  
  // Get score color as hex string for UI
  const getScoreColorHex = (score) => {
    if (score < 580) return "#e94560";
    if (score < 670) return "#ffa500";
    if (score < 740) return "#ffce00";
    if (score < 800) return "#16c79a";
    return "#3490de";
  };
  
  useEffect(() => {
    // Map score to position on the x-axis
    const mapScoreToPosition = (score) => {
      // Map from score range (300-850) to x-position (-40 to 40)
      return -40 + ((score - 300) / (850 - 300)) * 80;
    };

    // Helper function to get color based on score
    const getScoreColor = (score) => {
      if (score < 580) return 0xe94560;     // Poor - red
      if (score < 670) return 0xffa500;     // Fair - orange
      if (score < 740) return 0xffce00;     // Good - yellow
      if (score < 800) return 0x16c79a;     // Very Good - green
      return 0x3490de;                      // Excellent - blue
    };
    
    // Clean up previous scene if it exists
    const cleanup = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Remove text elements
      textElementsRef.current.forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
      textElementsRef.current = [];
    };
    
    // Load Three.js script
    const loadThreeJS = () => {
      return new Promise((resolve, reject) => {
        if (window.THREE) {
          resolve(window.THREE);
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.async = true;
        script.onload = () => resolve(window.THREE);
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };
    
    // Initialize Three.js scene
    const initScene = async () => {
      if (!containerRef.current) return;
      
      // Clean up previous scene
      cleanup();
      
      try {
        const THREE = await loadThreeJS();
        
        // Get container dimensions
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e);
        sceneRef.current = scene;
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 0.1, 1000);
        camera.position.set(0, 15, 30);
        camera.lookAt(0, 5, 0);
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        renderer.shadowMap.enabled = true;
        rendererRef.current = renderer;
        
        // Add renderer to DOM
        containerRef.current.appendChild(renderer.domElement);
        
        // Setup lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        
        // Create city floor
        const floorGeometry = new THREE.PlaneGeometry(100, 40);
        const floorMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x0f3460,
          shininess: 10,
          side: THREE.DoubleSide
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1;
        floor.receiveShadow = true;
        scene.add(floor);
        
        // Create grid lines on floor
        const gridHelper = new THREE.GridHelper(100, 50, 0xffffff, 0x444444);
        gridHelper.position.y = -0.99;
        scene.add(gridHelper);
        
        // Helper to create a building group
        const createBuildingGroup = (color, maxHeight, minScore, maxScore) => {
          const group = new THREE.Group();
          const rangeWidth = (maxScore - minScore) / 5;
          
          for (let i = 0; i < 5; i++) {
            const height = maxHeight * (0.7 + Math.random() * 0.3);
            const widthX = 1 + Math.random() * 1.5;
            const widthZ = 1 + Math.random() * 1.5;
            
            const buildingGeometry = new THREE.BoxGeometry(widthX, height, widthZ);
            const buildingMaterial = new THREE.MeshPhongMaterial({ 
              color: color,
              shininess: 30,
              emissive: color,
              emissiveIntensity: 0.2,
              transparent: true,
              opacity: 0.9
            });
            
            const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
            building.position.set(
              i * rangeWidth/5 - rangeWidth/2 + Math.random() * 0.5, 
              height/2, 
              (Math.random() - 0.5) * 10
            );
            building.castShadow = true;
            building.receiveShadow = true;
            
            // Add windows
            const windowSize = 0.2;
            const windowGeometry = new THREE.BoxGeometry(windowSize, windowSize, 0.1);
            const windowMaterial = new THREE.MeshPhongMaterial({ 
              color: 0xffffcc,
              emissive: 0xffffcc,
              emissiveIntensity: 0.5
            });
            
            const windowsPerFloor = Math.floor(widthX / (windowSize * 1.5));
            const floors = Math.floor(height / (windowSize * 1.5));
            
            for (let f = 0; f < floors; f++) {
              for (let w = 0; w < windowsPerFloor; w++) {
                // Front windows
                const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                frontWindow.position.set(
                  (w * windowSize * 1.5) - (widthX/2) + windowSize,
                  (f * windowSize * 1.5) - (height/2) + windowSize * 2,
                  widthZ/2 + 0.01
                );
                building.add(frontWindow);
                
                // Back windows
                const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                backWindow.position.set(
                  (w * windowSize * 1.5) - (widthX/2) + windowSize,
                  (f * windowSize * 1.5) - (height/2) + windowSize * 2,
                  -widthZ/2 - 0.01
                );
                building.add(backWindow);
              }
            }
            
            group.add(building);
          }
          
          return group;
        };
        
        // Create buildings for each score range
        const buildCity = () => {
          const scoreRanges = [
            { min: 300, max: 579, color: 0xe94560, height: 3 },
            { min: 580, max: 669, color: 0xffa500, height: 5 },
            { min: 670, max: 739, color: 0xffce00, height: 7 },
            { min: 740, max: 799, color: 0x16c79a, height: 9 },
            { min: 800, max: 850, color: 0x3490de, height: 12 }
          ];
          
          const buildings = new THREE.Group();
          let posX = -40;
          
          scoreRanges.forEach(range => {
            const rangeWidth = (range.max - range.min) / 5;
            const buildingGroup = createBuildingGroup(range.color, range.height, range.min, range.max);
            buildingGroup.position.set(posX + rangeWidth/2, 0, 0);
            buildings.add(buildingGroup);
            posX += rangeWidth;
            
            // Add range label
            const midPoint = (range.max + range.min) / 2;
            const xPos = mapScoreToPosition(midPoint);
            
            const rangeText = document.createElement('div');
            rangeText.style.position = 'absolute';
            rangeText.style.fontSize = '0.8rem';
            rangeText.style.fontFamily = 'Arial, sans-serif';
            rangeText.style.color = '#ffffff';
            rangeText.style.textAlign = 'center';
            rangeText.style.width = '80px';
            rangeText.style.textShadow = '0 0 3px rgba(0,0,0,0.8)';
            rangeText.innerHTML = `${range.min}-${range.max}`;
            containerRef.current.appendChild(rangeText);
            textElementsRef.current.push(rangeText);
            
            // Update text position in animation
            const updateTextPosition = () => {
              if (!containerRef.current) return;
              const vector = new THREE.Vector3(xPos, -0.98, 5);
              vector.project(camera);
              
              const x = (vector.x * 0.5 + 0.5) * containerWidth;
              const y = (-(vector.y * 0.5) + 0.5) * containerHeight;
              
              rangeText.style.transform = `translate(-50%, 0)`;
              rangeText.style.left = `${x}px`;
              rangeText.style.bottom = `10px`;
            };
            
            updateTextPosition();
          });
          
          scene.add(buildings);
          return buildings;
        };
        
        // Create and add buildings
        buildCity();
        
        // Create score indicator
        const createScoreIndicator = (score) => {
          const indicatorGroup = new THREE.Group();
          
          // Create sphere
          const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
          const sphereMaterial = new THREE.MeshPhongMaterial({
            color: getScoreColor(score),
            shininess: 100,
            emissive: getScoreColor(score),
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8
          });
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          indicatorGroup.add(sphere);
          
          // Create ring
          const ringGeometry = new THREE.TorusGeometry(1.5, 0.2, 16, 32);
          const ringMaterial = new THREE.MeshPhongMaterial({
            color: getScoreColor(score),
            emissive: getScoreColor(score),
            emissiveIntensity: 0.7,
            transparent: true,
            opacity: 0.5
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = Math.PI / 2;
          indicatorGroup.add(ring);
          
          // Create beam
          const beamGeometry = new THREE.CylinderGeometry(0.1, 0.5, 5, 16);
          const beamMaterial = new THREE.MeshPhongMaterial({
            color: getScoreColor(score),
            emissive: getScoreColor(score),
            emissiveIntensity: 0.7,
            transparent: true,
            opacity: 0.3
          });
          const beam = new THREE.Mesh(beamGeometry, beamMaterial);
          beam.position.y = -2.5;
          indicatorGroup.add(beam);
          
          // Position indicator
          const xPos = mapScoreToPosition(score);
          indicatorGroup.position.set(xPos, 5, 0);
          
          // Add score text
          const scoreDisplay = document.createElement('div');
          scoreDisplay.style.position = 'absolute';
          scoreDisplay.style.fontSize = '1.5rem';
          scoreDisplay.style.fontWeight = 'bold';
          scoreDisplay.style.fontFamily = 'Arial, sans-serif';
          scoreDisplay.style.color = '#ffffff';
          scoreDisplay.style.textAlign = 'center';
          scoreDisplay.style.width = '120px';
          scoreDisplay.style.textShadow = '0 0 5px rgba(0,0,0,0.8)';
          scoreDisplay.innerHTML = `Score<br>${score}`;
          containerRef.current.appendChild(scoreDisplay);
          textElementsRef.current.push(scoreDisplay);
          
          scene.add(indicatorGroup);
          
          return { 
            group: indicatorGroup, 
            sphere, 
            ring, 
            beam, 
            scoreDisplay,
            updateColor: (newScore) => {
              const newColor = getScoreColor(newScore);
              sphere.material.color.set(newColor);
              sphere.material.emissive.set(newColor);
              ring.material.color.set(newColor);
              ring.material.emissive.set(newColor);
              beam.material.color.set(newColor);
              beam.material.emissive.set(newColor);
              scoreDisplay.innerHTML = `Score<br>${newScore}`;
            },
            updatePosition: () => {
              // Update score text position
              if (!containerRef.current) return;
              const vector = new THREE.Vector3(indicatorGroup.position.x, indicatorGroup.position.y + 2, indicatorGroup.position.z);
              vector.project(camera);
              
              const x = (vector.x * 0.5 + 0.5) * containerWidth;
              const y = (-(vector.y * 0.5) + 0.5) * containerHeight;
              
              scoreDisplay.style.transform = `translate(-50%, -50%)`;
              scoreDisplay.style.left = `${x}px`;
              scoreDisplay.style.top = `${y}px`;
            }
          };
        };
        
        // Create score indicator
        const indicator = createScoreIndicator(score);
        
        // Camera positions
        const cameraPositions = {
          fixed: { position: new THREE.Vector3(0, 15, 30), target: new THREE.Vector3(0, 5, 0) },
          overhead: { position: new THREE.Vector3(0, 40, 0), target: new THREE.Vector3(0, 0, 0) },
          firstPerson: { position: new THREE.Vector3(0, 2, 25), target: new THREE.Vector3(0, 5, 0) }
        };
        
        // Camera control function
        window.changeCameraView = (mode) => {
          if (mode === "followScore") {
            const xPos = mapScoreToPosition(score);
            camera.position.set(xPos, 7, 12);
            camera.lookAt(xPos, 5, 0);
          } else if (cameraPositions[mode]) {
            camera.position.copy(cameraPositions[mode].position);
            camera.lookAt(cameraPositions[mode].target);
          }
        };
        
        // Animation variables
        let targetX = mapScoreToPosition(score);
        let currentX = targetX;
        
        // Animation loop
        const animate = () => {
          animationRef.current = requestAnimationFrame(animate);
          
          // Update position if score changes
          if (score !== parseInt(indicator.scoreDisplay.innerHTML.split('<br>')[1])) {
            indicator.updateColor(score);
            targetX = mapScoreToPosition(score);
          }
          
          // Smooth movement
          currentX += (targetX - currentX) * 0.05;
          indicator.group.position.x = currentX;
          
          // Floating animation
          indicator.group.position.y = 5 + Math.sin(Date.now() * 0.001) * 0.5;
          indicator.ring.rotation.z += 0.01;
          
          // Update text positions
          indicator.updatePosition();
          
          // Render scene
          renderer.render(scene, camera);
        };
        
        // Start animation
        animate();
        
        // Handle window resize
        const handleResize = () => {
          if (!containerRef.current) return;
          
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Return cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          if (typeof window.changeCameraView !== 'undefined') {
            delete window.changeCameraView;
          }
          cleanup();
        };
      } catch (error) {
        console.error("Error initializing Three.js scene:", error);
      }
    };
    
    // Initialize scene
    initScene();
    
    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, []);
  
  // Update score when it changes
  useEffect(() => {
    // This effect handles updates to the score
    // The 3D scene will pick up these changes in the animation loop
  }, [score]);
  
  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="bg-gray-900 rounded-lg p-4 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Credit Score Visualizer</h2>
          <div className="flex items-center">
            <span className="mr-2">Score:</span>
            <span 
              className="text-xl font-bold px-2 py-1 rounded-md" 
              style={{ backgroundColor: getScoreColorHex(score), color: score < 670 ? 'white' : 'black' }}
            >
              {score}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm w-8">300</span>
            <input 
              type="range" 
              min="300" 
              max="850" 
              value={score} 
              onChange={handleScoreChange}
              className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm w-8">850</span>
          </div>
          
          <div className="text-center">
            <div className="inline-block px-4 py-2 rounded-md" style={{ backgroundColor: getScoreColorHex(score), color: score < 670 ? 'white' : 'black' }}>
              {getScoreCategory(score)}
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            <button 
              onClick={() => jumpToScore(350)} 
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm"
            >
              Poor
            </button>
            <button 
              onClick={() => jumpToScore(620)} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-md text-sm"
            >
              Fair
            </button>
            <button 
              onClick={() => jumpToScore(700)} 
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-2 py-1 rounded-md text-sm"
            >
              Good
            </button>
            <button 
              onClick={() => jumpToScore(770)} 
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-sm"
            >
              Very Good
            </button>
            <button 
              onClick={() => jumpToScore(825)} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm"
            >
              Excellent
            </button>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <button 
              onClick={() => window.changeCameraView && window.changeCameraView('fixed')} 
              className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded-md text-sm flex-grow"
            >
              Default View
            </button>
            <button 
              onClick={() => window.changeCameraView && window.changeCameraView('overhead')} 
              className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded-md text-sm flex-grow"
            >
              Overhead View
            </button>
            <button 
              onClick={() => window.changeCameraView && window.changeCameraView('firstPerson')} 
              className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded-md text-sm flex-grow"
            >
              First Person
            </button>
            <button 
              onClick={() => window.changeCameraView && window.changeCameraView('followScore')} 
              className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded-md text-sm flex-grow"
            >
              Follow Score
            </button>
          </div>
        </div>
      </div>
      
      {/* 3D Visualization Container */}
      <div 
        ref={containerRef} 
        className="w-full h-96 bg-black rounded-lg overflow-hidden relative"
        style={{ minHeight: '400px' }}
      ></div>
    </div>
  );
};

export default ThreeDCreditScore;