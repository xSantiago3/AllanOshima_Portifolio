import Phaser from "phaser";

export type StationData = { id: string; glyph: string; label: string; accent: string };

type StationRuntime = { id: string; x: number; prompt: Phaser.GameObjects.Container };

export type WorldInit = {
  stations: StationData[];
  controls: { left: boolean; right: boolean; interact: boolean };
  onEnter: (id: string) => void;
  enterPrompt: string;
};

const GROUND_Y = 0.78; // fraction of height
const SPACING = 560;
const MARGIN = 460;
const GOLD = 0xd4af37;
const GOLD_DIM = 0x9c7a24;
const INK = 0x0b0a07;

export class WorldScene extends Phaser.Scene {
  private cfg!: WorldInit;
  private player!: Phaser.GameObjects.Container;
  private legs: Phaser.GameObjects.Rectangle[] = [];
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyA!: Phaser.Input.Keyboard.Key;
  private keyD!: Phaser.Input.Keyboard.Key;
  private keyInteract!: Phaser.Input.Keyboard.Key;
  private keyInteract2!: Phaser.Input.Keyboard.Key;
  private stations: StationRuntime[] = [];
  private worldWidth = 2000;
  private groundY = 400;
  private facing = 1;
  private walkPhase = 0;
  private interactLatch = false;
  private nearId: string | null = null;

  constructor() {
    super("world");
  }

  init(data: WorldInit) {
    this.cfg = data;
  }

  create() {
    const { width, height } = this.scale;
    this.groundY = height * GROUND_Y;
    this.worldWidth = MARGIN * 2 + (this.cfg.stations.length - 1) * SPACING + 600;

    this.cameras.main.setBounds(0, 0, this.worldWidth, height);
    this.cameras.main.setBackgroundColor("#0b0a07");

    this.drawBackdrop(width, height);
    this.drawGround();
    this.buildStations();
    this.buildPlayer();

    const kb = this.input.keyboard!;
    this.cursors = kb.createCursorKeys();
    this.keyA = kb.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = kb.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyInteract = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyInteract2 = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.scale.on("resize", this.handleResize, this);
  }

  private handleResize(gameSize: Phaser.Structs.Size) {
    this.cameras.main.setBounds(0, 0, this.worldWidth, gameSize.height);
  }

  private drawBackdrop(width: number, height: number) {
    // moon (fixed-ish, scroll factor 0.1)
    const moon = this.add.circle(width * 0.7, height * 0.26, Math.min(width, height) * 0.12, GOLD, 0.9);
    moon.setScrollFactor(0.1);

    // far mountains
    const far = this.add.graphics();
    far.fillStyle(0x13100b, 1);
    const baseY = this.groundY;
    far.beginPath();
    far.moveTo(0, baseY);
    let x = 0;
    let up = true;
    while (x < this.worldWidth + 200) {
      const peak = up ? baseY - 160 - Math.abs(((x / 211) % 3) * 40) : baseY - 70;
      far.lineTo(x, peak);
      x += 220;
      up = !up;
    }
    far.lineTo(this.worldWidth + 200, baseY);
    far.lineTo(0, baseY);
    far.closePath();
    far.fillPath();
    far.setScrollFactor(0.35);
  }

  private drawGround() {
    const g = this.add.graphics();
    g.fillStyle(0x0d0b07, 1);
    g.fillRect(0, this.groundY, this.worldWidth, this.scale.height - this.groundY + 4);
    g.lineStyle(2, GOLD_DIM, 0.5);
    g.lineBetween(0, this.groundY, this.worldWidth, this.groundY);
    // dashed path
    const path = this.add.graphics();
    path.lineStyle(2, GOLD, 0.25);
    for (let x = 0; x < this.worldWidth; x += 26) {
      path.lineBetween(x, this.groundY + 24, x + 12, this.groundY + 24);
    }
  }

  private buildStations() {
    this.cfg.stations.forEach((s, i) => {
      const x = MARGIN + i * SPACING;
      const accent = Phaser.Display.Color.HexStringToColor(s.accent).color;
      this.drawTorii(x, accent);

      // glyph
      this.add
        .text(x, this.groundY - 150, s.glyph, { fontFamily: "serif", fontSize: "30px", color: s.accent })
        .setOrigin(0.5);
      // label
      this.add
        .text(x, this.groundY + 40, s.label, {
          fontFamily: "monospace",
          fontSize: "12px",
          color: "#b9a679",
          align: "center",
          wordWrap: { width: 220 },
        })
        .setOrigin(0.5, 0);

      // prompt (hidden until near)
      const prompt = this.add.container(x, this.groundY - 196);
      const bubble = this.add.rectangle(0, 0, 132, 26, INK, 0.85).setStrokeStyle(1, GOLD);
      const ptxt = this.add
        .text(0, 0, this.cfg.enterPrompt, { fontFamily: "monospace", fontSize: "11px", color: "#e6c65a" })
        .setOrigin(0.5);
      prompt.add([bubble, ptxt]);
      prompt.setAlpha(0);

      this.stations.push({ id: s.id, x, prompt });
    });

    // end marker — a bright torii
    const endX = MARGIN + (this.cfg.stations.length - 1) * SPACING + 360;
    this.drawTorii(endX, GOLD, 1.3);
    this.add
      .text(endX, this.groundY + 40, "✦", { fontFamily: "serif", fontSize: "20px", color: "#e6c65a" })
      .setOrigin(0.5, 0);
  }

  private drawTorii(x: number, color: number, scale = 1) {
    const g = this.add.graphics();
    const h = 130 * scale;
    const w = 96 * scale;
    const top = this.groundY - h;
    g.fillStyle(color, 0.92);
    // pillars
    g.fillRect(x - w / 2, top + 24, 10 * scale, h - 24);
    g.fillRect(x + w / 2 - 10 * scale, top + 24, 10 * scale, h - 24);
    // lintels
    g.fillRect(x - w / 2 - 14 * scale, top, w + 28 * scale, 12 * scale);
    g.fillRect(x - w / 2 - 8 * scale, top + 22 * scale, w + 16 * scale, 8 * scale);
    g.fillStyle(0xe6c65a, 1);
    g.fillRect(x - w / 2 - 16 * scale, top - 5 * scale, w + 32 * scale, 5 * scale);
  }

  private buildPlayer() {
    const c = this.add.container(MARGIN - 220, this.groundY);
    const mk = (
      x: number,
      y: number,
      w: number,
      h: number,
      color: number,
    ): Phaser.GameObjects.Rectangle => this.add.rectangle(x, y, w, h, color).setOrigin(0.5, 1);

    const legL = mk(-5, 0, 7, 12, 0x15120c);
    const legR = mk(5, 0, 7, 12, 0x15120c);
    const body = mk(0, -10, 24, 26, 0x17140d);
    const belt = this.add.rectangle(0, -22, 24, 4, GOLD).setOrigin(0.5, 1);
    const head = mk(0, -34, 16, 14, 0xe9dcc2);
    const hair = mk(0, -46, 20, 7, 0x15120c);
    const knot = mk(0, -50, 5, 6, 0x15120c);
    const sword = this.add.rectangle(14, -28, 3, 30, GOLD).setOrigin(0.5, 1);
    sword.setAngle(28);

    c.add([sword, legL, legR, body, belt, head, hair, knot]);
    this.legs = [legL, legR];
    this.player = c;
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08, 0, this.scale.height * 0.12);
  }

  update(_time: number, delta: number) {
    if (!this.player) return;
    const ctl = this.cfg.controls;
    const left = this.cursors.left.isDown || this.keyA.isDown || ctl.left;
    const right = this.cursors.right.isDown || this.keyD.isDown || ctl.right;

    const speed = 0.28 * delta;
    let moving = false;
    if (left && !right) {
      this.player.x -= speed;
      this.facing = -1;
      moving = true;
    } else if (right && !left) {
      this.player.x += speed;
      this.facing = 1;
      moving = true;
    }
    this.player.x = Phaser.Math.Clamp(this.player.x, 40, this.worldWidth - 40);
    this.player.setScale(this.facing, 1);

    // walk animation
    if (moving) {
      this.walkPhase += delta * 0.02;
      const swing = Math.sin(this.walkPhase) * 4;
      this.legs[0].y = -Math.abs(swing) * 0.2;
      this.legs[1].y = -Math.abs(Math.sin(this.walkPhase + Math.PI)) * 0.2;
      this.player.y = this.groundY - (Math.abs(Math.sin(this.walkPhase)) > 0.7 ? 1.5 : 0);
    } else {
      this.player.y = this.groundY;
    }

    // proximity
    let near: StationRuntime | null = null;
    for (const st of this.stations) {
      const d = Math.abs(st.x - this.player.x);
      const isNear = d < 90;
      st.prompt.setAlpha(Phaser.Math.Linear(st.prompt.alpha, isNear ? 1 : 0, 0.2));
      if (isNear && (!near || d < Math.abs(near.x - this.player.x))) near = st;
    }
    this.nearId = near?.id ?? null;

    // interact (edge-triggered)
    const interactDown =
      this.keyInteract.isDown ||
      this.keyInteract2.isDown ||
      this.cursors.up.isDown ||
      ctl.interact;
    if (interactDown && !this.interactLatch) {
      this.interactLatch = true;
      if (this.nearId) this.cfg.onEnter(this.nearId);
    }
    if (!interactDown) this.interactLatch = false;
  }
}
