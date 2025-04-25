document.addEventListener('click', function(e) {
    const container = document.getElementById('container');
    const circle = document.createElement('div');
    circle.id = 'circle';
  
    const mouseX = e.clientX;
    const mouseY = e.clientY;
  
    // Calculate the circle's position
    const circleX = mouseX - 50; // Half of the circle's width
    const circleY = mouseY - 50; // Half of the circle's height
  
    circle.style.top = `${circleY}px`;
    circle.style.left = `${circleX}px`;
  
    container.appendChild(circle);
  
    // Optional: Remove the circle after a short delay
    setTimeout(() => {
      container.removeChild(circle);
    }, 1000); // Remove after 1 second
  });