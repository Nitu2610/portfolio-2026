import { useEffect, useRef } from "react";

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  //

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const ctxElement = canvasElement.getContext("2d");
    if (!ctxElement) return;

    const canvas = canvasElement;
    const ctx = ctxElement;
    let particles: Particle[] = [];

    const particleCount = 60;
    const colors = ["rgba(255,255,255,0.7)"];

    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;

        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;

        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Horizontal wrapping
        if (this.x < 0) {
          this.x = canvas.width;
        }
        if (this.x > canvas.width) {
          this.x = 0;
        }

        // Vertical wrapping
        if (this.y < 0) {
          this.y = canvas.height;
        }
        if (this.y > canvas.height) {
          this.y = 0;
        }

        this.draw();
      }
    }

    function createParticles() {
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function handleResize() {
      const devicePixelRatio = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      createParticles();
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    let animationId: number;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
   className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    ></canvas>
  );
};


