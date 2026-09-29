'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './DualSpotlightSystem.module.css';

interface Props {
  heroRef: React.RefObject<HTMLElement | null>;
}

export const DualSpotlightSystem: React.FC<Props> = ({ heroRef }) => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Fixture coordinates physically anchored on OPPOSITE SIDES of the hero
  // Spotlight 1: on the LEFT
  // Spotlight 2: on the RIGHT
  const [fixtures, setFixtures] = useState({
    s1: { x: 90, y: 0 },
    s2: { x: 1110, y: 0 },
  });

  // Cursor tracking target and eased position
  const targetPos = useRef({ x: 600, y: 400 });
  const currentPos = useRef({ x: 600, y: 400 });
  const rafRef = useRef<number | null>(null);

  // Beam geometry synchronized to fixture rotation
  const [beamData, setBeamData] = useState({
    s1: {
      fixtureRotationDeg: -35,
      polygon: '',
      lensCenter: { x: 90, y: 38 },
      target: { x: 600, y: 400 },
    },
    s2: {
      fixtureRotationDeg: 35,
      polygon: '',
      lensCenter: { x: 1110, y: 38 },
      target: { x: 600, y: 400 },
    },
    groundPool: { x: 600, y: 400 },
  });

  // Calculate fixture positions anchored on opposite sides
  const updateLayout = useCallback(() => {
    if (!heroRef.current) return;
    const w = heroRef.current.clientWidth;
    const h = heroRef.current.clientHeight;
    setDimensions({ width: w, height: h });

    const containerPad = 24;
    const containerLeft = Math.max(0, (w - 1440) / 2) + containerPad;
    const containerRight = w - containerLeft;

    // Spotlight 1: near the LEFT edge of the hero container
    const s1X = containerLeft + Math.min(70, Math.max(30, w * 0.05));

    // Spotlight 2: near the RIGHT edge of the hero container (opposite side, same height)
    const s2X = containerRight - Math.min(70, Math.max(30, w * 0.05));

    setFixtures({
      s1: { x: s1X, y: 0 },
      s2: { x: s2X, y: 0 },
    });
  }, [heroRef]);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsTouchDevice(isTouch);

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  /**
   * Single source of truth for spotlight aiming:
   * 1. targetAngle = Math.atan2(cursorY - pivotY, cursorX - spotlightX)
   * 2. The fixture graphic points naturally straight down (+90° in standard polar coords).
   *    Therefore: fixtureRotationDeg = (targetAngle * 180 / Math.PI) - 90°
   * 3. The light beam originates at the lens face:
   *    lensCenter = (spotlightX + cos(targetAngle) * barrelLen, pivotY + sin(targetAngle) * barrelLen)
   * 4. The beam propagates along (cos(targetAngle), sin(targetAngle)) toward the cursor.
   * Fixture rotation, lens position, and beam direction are locked to the exact same angle.
   */
  const computeBeam = (fx: number, fy: number, cursorX: number, cursorY: number) => {
    const pivotY = fy + 20;

    // Vector from fixture pivot to cursor
    const rawDx = cursorX - fx;
    const rawDy = cursorY - pivotY;

    // Calculate angle from fixture to cursor
    let targetAngle = Math.atan2(rawDy, rawDx);

    // Clamp angle so fixture stays aimed downward into hero (between 18° and 162°)
    const minAngle = (18 * Math.PI) / 180;
    const maxAngle = (162 * Math.PI) / 180;
    targetAngle = Math.max(minAngle, Math.min(maxAngle, targetAngle));

    // Unit direction vectors pointing TOWARD cursor
    const dirX = Math.cos(targetAngle);
    const dirY = Math.sin(targetAngle);

    // Unit perpendicular vector across beam axis
    const perpX = -dirY;
    const perpY = dirX;

    // Fixture rotation in degrees (natural graphic orientation is 90° straight down)
    const fixtureRotationDeg = (targetAngle * 180) / Math.PI - 90;

    // Lens face center position at the front of the 38px barrel
    const barrelLen = 38;
    const lensX = fx + dirX * barrelLen;
    const lensY = pivotY + dirY * barrelLen;

    // Aperture width at lens face (radius = 12px)
    const r0 = 12;
    const aLeftX = lensX - perpX * r0;
    const aLeftY = lensY - perpY * r0;
    const aRightX = lensX + perpX * r0;
    const aRightY = lensY + perpY * r0;

    // Distance to cursor target
    const dist = Math.hypot(cursorX - lensX, cursorY - lensY);

    // Cone spread at the cursor / floor plane
    const spread = Math.max(90, Math.min(220, dist * 0.32));

    const tLeftX = cursorX - perpX * spread;
    const tLeftY = cursorY - perpY * spread;
    const tRightX = cursorX + perpX * spread;
    const tRightY = cursorY + perpY * spread;

    // Symmetrical 4-point cone: left-lens -> left-target -> right-target -> right-lens
    const polygon = `${aLeftX.toFixed(1)},${aLeftY.toFixed(1)} ${tLeftX.toFixed(1)},${tLeftY.toFixed(1)} ${tRightX.toFixed(1)},${tRightY.toFixed(1)} ${aRightX.toFixed(1)},${aRightY.toFixed(1)}`;

    return {
      fixtureRotationDeg,
      polygon,
      lensCenter: { x: lensX, y: lensY },
      target: { x: cursorX, y: cursorY },
    };
  };

  // Eased animation loop
  const updateBeams = useCallback(() => {
    const lerp = 0.055; // Physically believable inertia / easing
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

    const tx = currentPos.current.x;
    const ty = currentPos.current.y;

    const b1 = computeBeam(fixtures.s1.x, fixtures.s1.y, tx, ty);
    const b2 = computeBeam(fixtures.s2.x, fixtures.s2.y, tx, ty);

    setBeamData({
      s1: b1,
      s2: b2,
      groundPool: { x: tx, y: ty },
    });

    rafRef.current = requestAnimationFrame(updateBeams);
  }, [fixtures]);

  useEffect(() => {
    if (isTouchDevice) {
      // Mobile fallback: both spotlights subtly point inward toward center
      const tx = dimensions.width * 0.5;
      const ty = dimensions.height * 0.55;
      const b1 = computeBeam(fixtures.s1.x, fixtures.s1.y, tx - 40, ty);
      const b2 = computeBeam(fixtures.s2.x, fixtures.s2.y, tx + 40, ty);
      setBeamData({
        s1: b1,
        s2: b2,
        groundPool: { x: tx, y: ty },
      });
      return;
    }

    const hero = heroRef.current;
    if (!hero) return;

    // Listen on window for continuous, smooth tracking across all hero elements
    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      if (
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100
      ) {
        targetPos.current = {
          x: Math.max(30, Math.min(rect.width - 30, e.clientX - rect.left)),
          y: Math.max(80, Math.min(rect.height - 30, e.clientY - rect.top)),
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(updateBeams);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, fixtures, dimensions, updateBeams, heroRef]);

  // Render individual physical spotlight fixture matching the reference photo
  const renderFixture = (fx: number, fy: number, rotationDeg: number) => {
    const pivotY = fy + 20;
    return (
      <g className={styles.fixtureGroup}>
        {/* Overhead ceiling track mount clamp */}
        <rect
          x={fx - 9}
          y={fy}
          width={18}
          height={7}
          rx={1.5}
          fill="#1c1c1c"
          stroke="#2d2d2d"
          strokeWidth={0.8}
        />
        {/* Downrod / Swivel stem */}
        <line
          x1={fx}
          y1={fy + 7}
          x2={fx}
          y2={fy + 13}
          stroke="#252525"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* U-Shaped Bracket / Yoke */}
        <path
          d={`M ${fx - 13} ${fy + 12} L ${fx - 13} ${pivotY} A 13 13 0 0 0 ${fx + 13} ${pivotY} L ${fx + 13} ${fy + 12}`}
          stroke="#161616"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Pivot Knobs on yoke sides */}
        <circle cx={fx - 13} cy={pivotY} r={2.5} fill="#2f2f2f" stroke="#111" strokeWidth={0.6} />
        <circle cx={fx + 13} cy={pivotY} r={2.5} fill="#2f2f2f" stroke="#111" strokeWidth={0.6} />

        {/* Rotating Cylindrical Barrel / Can aiming directly toward cursor */}
        <g transform={`rotate(${rotationDeg}, ${fx}, ${pivotY})`}>
          {/* Canister barrel */}
          <rect
            x={fx - 11}
            y={pivotY - 6}
            width={22}
            height={38}
            rx={2.5}
            fill="#121212"
            stroke="#262626"
            strokeWidth={0.8}
          />
          {/* Cooling fin accents on barrel */}
          <line x1={fx - 10} y1={pivotY + 6} x2={fx + 10} y2={pivotY + 6} stroke="#1d1d1d" strokeWidth={0.8} />
          <line x1={fx - 10} y1={pivotY + 16} x2={fx + 10} y2={pivotY + 16} stroke="#1d1d1d" strokeWidth={0.8} />
          <line x1={fx - 10} y1={pivotY + 26} x2={fx + 10} y2={pivotY + 26} stroke="#1d1d1d" strokeWidth={0.8} />

          {/* Front Bezel / Rim */}
          <rect
            x={fx - 13}
            y={pivotY + 32}
            width={26}
            height={6}
            rx={1.5}
            fill="#0a0a0a"
            stroke="#303030"
            strokeWidth={0.8}
          />

          {/* Glowing lens face from which beam emits */}
          <ellipse
            cx={fx}
            cy={pivotY + 35}
            rx={11}
            ry={3.5}
            fill="rgba(255, 255, 245, 0.9)"
            filter="url(#lensGlow)"
          />
        </g>
      </g>
    );
  };

  return (
    <svg
      className={styles.spotlightCanvas}
      width={dimensions.width}
      height={dimensions.height}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      aria-hidden="true"
    >
      <defs>
        {/* Soft volumetric blur for light beams */}
        <filter id="beamBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>

        {/* Lens glow filter */}
        <filter id="lensGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        {/* Spotlight 1 (Left) Beam Gradient */}
        <linearGradient
          id="beamGrad1"
          x1={beamData.s1.lensCenter.x}
          y1={beamData.s1.lensCenter.y}
          x2={beamData.s1.target.x}
          y2={beamData.s1.target.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
          <stop offset="22%" stopColor="#ffffff" stopOpacity="0.11" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="85%" stopColor="#ffffff" stopOpacity="0.01" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Spotlight 2 (Right) Beam Gradient */}
        <linearGradient
          id="beamGrad2"
          x1={beamData.s2.lensCenter.x}
          y1={beamData.s2.lensCenter.y}
          x2={beamData.s2.target.x}
          y2={beamData.s2.target.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
          <stop offset="22%" stopColor="#ffffff" stopOpacity="0.11" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="85%" stopColor="#ffffff" stopOpacity="0.01" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Soft ground illumination pool */}
        <radialGradient id="groundPoolGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.13" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Volumetric Light Beams (rendered behind fixtures) ── */}
      {beamData.s1.polygon && (
        <polygon
          points={beamData.s1.polygon}
          fill="url(#beamGrad1)"
          filter="url(#beamBlur)"
          opacity="0.9"
        />
      )}
      {beamData.s2.polygon && (
        <polygon
          points={beamData.s2.polygon}
          fill="url(#beamGrad2)"
          filter="url(#beamBlur)"
          opacity="0.9"
        />
      )}

      {/* ── Soft Ground / Cursor Illumination Pool ── */}
      <ellipse
        cx={beamData.groundPool.x}
        cy={beamData.groundPool.y}
        rx={160}
        ry={90}
        fill="url(#groundPoolGrad)"
        filter="url(#beamBlur)"
      />

      {/* ── Physical Fixtures Anchored at Opposite Sides ── */}
      {renderFixture(fixtures.s1.x, fixtures.s1.y, beamData.s1.fixtureRotationDeg)}
      {renderFixture(fixtures.s2.x, fixtures.s2.y, beamData.s2.fixtureRotationDeg)}
    </svg>
  );
};
