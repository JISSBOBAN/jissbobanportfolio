/**
 * Cybersecurity Dynamic Network & Scroll Telemetry Canvas Engine
 * Er. Jiss Boban - Security Operations & SIEM Architecture
 */

(function () {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const nodes = [];
  const packets = [];
  const sonarRings = [];

  // Responsive node allocation
  const isMobile = width < 768;
  const nodeCount = isMobile ? 32 : Math.min(Math.floor((width * height) / 20000), 65);

  let mouse = {
    x: width / 2,
    y: height / 2,
    radius: 160,
    isActive: false,
  };

  // Scroll tracking
  let lastScrollY = window.scrollY;
  let scrollDelta = 0;
  let scrollSpeed = 0;
  let lastScrollTime = Date.now();

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

  // Passive scroll listener for reactive cyber bursts
  window.addEventListener(
    'scroll',
    () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      scrollDelta = currentScrollY - lastScrollY;
      const timeDiff = Math.max(now - lastScrollTime, 16);
      scrollSpeed = Math.min(Math.abs(scrollDelta) / timeDiff, 4);

      lastScrollY = currentScrollY;
      lastScrollTime = now;

      // Trigger a sonar radar ring occasionally during scroll
      if (Math.random() < 0.25 && scrollSpeed > 0.4) {
        spawnSonar(width * (0.2 + Math.random() * 0.6), height * (0.2 + Math.random() * 0.6));
      }

      // Parallax shift nodes slightly
      nodes.forEach((node) => {
        node.targetYOffset = -currentScrollY * node.parallaxFactor;
      });

      // Spawn extra packets during scroll
      if (packets.length < 50 && scrollSpeed > 0.3) {
        const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
        const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (sourceNode && targetNode && sourceNode !== targetNode) {
          packets.push(new TelemetryPacket(sourceNode, targetNode, true));
        }
      }
    },
    { passive: true }
  );

  function spawnSonar(x, y) {
    if (sonarRings.length < 6) {
      sonarRings.push({
        x: x,
        y: y,
        radius: 10,
        maxRadius: Math.min(width, height) * 0.4,
        alpha: 0.6,
        color: Math.random() > 0.5 ? '217, 70, 239' : '6, 182, 212', // Magenta or Cyan
      });
    }
  }

  // Telemetry Defense Node
  class DefenseNode {
    constructor() {
      this.baseX = Math.random() * width;
      this.baseY = Math.random() * height;
      this.x = this.baseX;
      this.y = this.baseY;
      this.yOffset = 0;
      this.targetYOffset = 0;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2.2 + 1.2;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.025 + Math.random() * 0.02;
      this.parallaxFactor = 0.06 + Math.random() * 0.12; // 3D depth

      // Cybersecurity theme colors: Violet, Magenta, Cyan
      const rand = Math.random();
      if (rand < 0.45) {
        this.rgb = '168, 85, 247'; // Violet
      } else if (rand < 0.75) {
        this.rgb = '217, 70, 239'; // Magenta
      } else {
        this.rgb = '6, 182, 212'; // Cyan
      }

      this.isHub = Math.random() < 0.08;
      if (this.isHub) {
        this.radius *= 1.8;
      }
    }

    update() {
      this.baseX += this.vx;
      this.baseY += this.vy;

      // Bounce smoothly off boundaries
      if (this.baseX < 0 || this.baseX > width) this.vx *= -1;
      if (this.baseY < 0 || this.baseY > height) this.vy *= -1;

      // Smooth scroll parallax interpolation
      this.yOffset += (this.targetYOffset - this.yOffset) * 0.1;
      this.x = this.baseX;
      this.y = ((this.baseY + this.yOffset) % height + height) % height;

      this.pulse += this.pulseSpeed;

      // Randomly spawn data packet to nearby connected node
      if (Math.random() < (this.isHub ? 0.02 : 0.005)) {
        const neighbor = findNeighbor(this);
        if (neighbor) {
          packets.push(new TelemetryPacket(this, neighbor, false));
        }
      }
    }

    draw() {
      const isLight = document.body.classList.contains('light');
      const pulseSize = Math.sin(this.pulse) * 1.2;
      const currentRadius = Math.max(this.radius + pulseSize, 1);

      ctx.beginPath();
      ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(${this.rgb}, 0.65)`
        : `rgba(${this.rgb}, 0.8)`;
      ctx.fill();

      // Outer glowing defense perimeter for hubs or mouse proximity
      let isNearMouse = false;
      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          isNearMouse = true;
          const glowAlpha = (1 - dist / mouse.radius) * 0.7;
          ctx.beginPath();
          ctx.arc(this.x, this.y, currentRadius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${glowAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      if (this.isHub && !isNearMouse) {
        const ringAlpha = (Math.sin(this.pulse) + 1) * 0.25;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${this.rgb}, ${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // Telemetry Packet Stream
  class TelemetryPacket {
    constructor(source, target, isFast) {
      this.source = source;
      this.target = target;
      this.progress = 0;
      this.speed = (isFast ? 0.025 : 0.012) + Math.random() * 0.01;
      this.color = Math.random() > 0.4 ? '#06b6d4' : '#d946ef';
      this.size = isFast ? 2.4 : 1.8;
    }

    update() {
      this.progress += this.speed;
      this.x = this.source.x + (this.target.x - this.source.x) * this.progress;
      this.y = this.source.y + (this.target.y - this.source.y) * this.progress;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function findNeighbor(originNode) {
    let closest = null;
    let minDistance = 140;
    for (let node of nodes) {
      if (node === originNode) continue;
      const dx = originNode.x - node.x;
      const dy = originNode.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDistance) {
        minDistance = dist;
        closest = node;
      }
    }
    return closest;
  }

  function initNodes() {
    nodes.length = 0;
    packets.length = 0;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new DefenseNode());
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.body.classList.contains('light');

    // 1. Draw Sonar Rings
    for (let i = sonarRings.length - 1; i >= 0; i--) {
      const ring = sonarRings[i];
      ring.radius += 2.5;
      ring.alpha -= 0.012;

      if (ring.alpha <= 0 || ring.radius >= ring.maxRadius) {
        sonarRings.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ring.color}, ${ring.alpha * (isLight ? 0.35 : 0.6)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 2. Draw Interconnecting Defense Mesh Lines
    const maxLinkDist = isMobile ? 95 : 125;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxLinkDist) {
          const alphaRatio = (1 - dist / maxLinkDist);
          const alpha = alphaRatio * (isLight ? 0.16 : 0.22);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${nodes[i].rgb}, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    // 3. Update & Draw Nodes
    nodes.forEach((node) => {
      node.update();
      node.draw();
    });

    // 4. Update & Draw Packet Streams
    for (let i = packets.length - 1; i >= 0; i--) {
      const packet = packets[i];
      packet.update();
      packet.draw();
      if (packet.progress >= 1) {
        packets.splice(i, 1);
      }
    }

    // Decay scroll speed
    scrollSpeed *= 0.94;

    requestAnimationFrame(render);
  }

  initNodes();
  render();
})();
