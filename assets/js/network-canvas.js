/**
 * Interactive Network Telemetry & Data Stream Canvas
 * Simulates distributed enterprise log sources streaming packets to Microsoft Sentinel
 */

(function () {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const nodes = [];
  const packets = [];
  const nodeCount = Math.min(Math.floor((width * height) / 22000), 55);

  let mouse = {
    x: width / 2,
    y: height / 2,
    radius: 140,
    isActive: false,
  };

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  // Central Sentinel Ingestion Hub
  function getHub() {
    return {
      x: width > 992 ? width * 0.72 : width * 0.5,
      y: height > 768 ? height * 0.45 : height * 0.35,
    };
  }

  class TelemetryNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1.5;
      this.baseColor = Math.random() > 0.4 ? 'rgba(0, 229, 255,' : 'rgba(0, 120, 212,';
      this.type = Math.random() > 0.6 ? 'endpoint' : 'forwarder';
      this.pulse = Math.random() * Math.PI;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      this.pulse += 0.03;

      // Randomly spawn data packet directed towards Sentinel hub
      if (Math.random() < 0.007) {
        const hub = getHub();
        packets.push(new DataPacket(this.x, this.y, hub.x, hub.y));
      }
    }

    draw() {
      const pulseRadius = this.radius + Math.sin(this.pulse) * 0.8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.baseColor} 0.7)`;
      ctx.fill();

      // Mouse proximity interaction
      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, pulseRadius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 229, 255, ${1 - dist / mouse.radius})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  class DataPacket {
    constructor(startX, startY, targetX, targetY) {
      this.x = startX;
      this.y = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.progress = 0;
      this.speed = Math.random() * 0.008 + 0.005;
      this.size = Math.random() * 1.5 + 1;
      this.color = Math.random() > 0.3 ? '#00e5ff' : '#10b981';
    }

    update() {
      this.progress += this.speed;
      this.x = this.x + (this.targetX - this.x) * this.speed * 2;
      this.y = this.y + (this.targetY - this.y) * this.speed * 2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initNodes() {
    nodes.length = 0;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new TelemetryNode());
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw interconnect lines between nearby nodes
    const maxDistance = 110;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 162, 237, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update & draw nodes
    nodes.forEach((node) => {
      node.update();
      node.draw();
    });

    // Update & draw data packets
    for (let i = packets.length - 1; i >= 0; i--) {
      packets[i].update();
      packets[i].draw();
      if (packets[i].progress >= 1) {
        packets.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }

  initNodes();
  render();
})();
