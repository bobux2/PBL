import React, { useEffect, useRef } from 'react';

const P5Background = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let sketch;
    let p5;
    
    const loadP5 = async () => {
      // Dynamically import p5 from CDN
      if (!window.p5) {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.min.js";
        script.async = true;
        script.onload = () => initializeSketch();
        document.body.appendChild(script);
      } else {
        initializeSketch();
      }
    };
    
    const initializeSketch = () => {
      const p5 = window.p5;
      
      sketch = new p5((p) => {
        const particles = [];
        const particleCount = 50;
        
        p.setup = () => {
          const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
          canvas.style('display', 'block');
          
          for (let i = 0; i < particleCount; i++) {
            particles.push({
              x: p.random(p.width),
              y: p.random(p.height),
              size: p.random(2, 5),
              speedX: p.random(-0.5, 0.5),
              speedY: p.random(-0.5, 0.5),
              opacity: p.random(50, 150)
            });
          }
        };
        
        p.draw = () => {
          p.clear();
          
          // Draw connections
          p.stroke(100, 150, 255, 30);
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const d = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
              if (d < 150) {
                const alpha = p.map(d, 0, 150, 30, 0);
                p.stroke(100, 150, 255, alpha);
                p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
              }
            }
          }
          
          // Update and draw particles
          for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > p.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > p.height) particle.speedY *= -1;
            
            p.noStroke();
            p.fill(100, 150, 255, particle.opacity);
            p.ellipse(particle.x, particle.y, particle.size);
          }
        };
        
        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      }, containerRef.current);
    };
    
    loadP5();
    
    return () => {
      if (sketch) {
        sketch.remove();
      }
    };
  }, []);
  
  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default P5Background;