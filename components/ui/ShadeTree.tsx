import { SHADE_TREE_VIEWBOX } from "./shadeTreeGeometry";

// Scene positions use the tree's own coordinates (scripts/generate-shade-tree.mjs):
// the trunk stands at x = 500 and meets the ground at y ≈ 1004.
const GROUND = 1004;
const MASK = "url(/textures/shade-tree.svg) center bottom / contain no-repeat";

/**
 * The cover's red shade tree, drawn large behind the content: wood grain runs
 * through it, a pool of shade lies beneath it, and a reader sits against the
 * trunk with a copy of TIM ATIEP.
 */
export function ShadeTree({
  className = "",
  showcaseReader = true,
}: {
  className?: string;
  /** Full-strength reader; when false they fade into the tree so text over them stays readable. */
  showcaseReader?: boolean;
}) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <SceneLayer>
        <defs>
          <radialGradient id="shade-tree-shadow">
            <stop offset="0" style={{ stopColor: "var(--color-indigo-deep)", stopOpacity: 0.95 }} />
            <stop offset="0.55" style={{ stopColor: "var(--color-indigo-deep)", stopOpacity: 0.55 }} />
            <stop offset="1" style={{ stopColor: "var(--color-indigo-deep)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <ellipse cx={500} cy={GROUND + 10} rx={600} ry={70} fill="url(#shade-tree-shadow)" />
      </SceneLayer>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          WebkitMask: MASK,
          mask: MASK,
          backgroundColor: "var(--color-tree-red)",
          backgroundImage: "url(/textures/tree-grain.svg)",
          backgroundSize: "24rem auto",
        }}
      />

      <SceneLayer>
        <g style={{ opacity: showcaseReader ? 1 : 0.35, transition: "opacity 0.8s ease" }}>
          <Reader />
        </g>
      </SceneLayer>
    </div>
  );
}

function SceneLayer({ children }: { children: React.ReactNode }) {
  return (
    <svg className="absolute inset-0 size-full overflow-visible" viewBox={SHADE_TREE_VIEWBOX} preserveAspectRatio="xMidYMax meet">
      {children}
    </svg>
  );
}

/** Side-on figure leaning back against the trunk, knees up, reading. */
function ReaderBody() {
  return (
    <>
      {/* head bowed toward the book */}
      <circle cx={596} cy={861} r={19} />
      {/* neck + torso, leaning back into the trunk */}
      <path d="M582 870 L600 874 L602 890 L578 890 Z" />
      <path d="M566 884 Q590 874 606 888 Q616 944 624 1002 L574 1004 Q560 944 566 884 Z" />
      {/* far leg */}
      <path d="M598 986 L652 930 Q664 924 670 936 L614 1002 Z" />
      <path d="M656 928 Q668 920 676 932 L694 998 L672 1002 Z" />
      {/* near leg */}
      <path d="M606 990 L668 926 Q682 920 688 936 L624 1004 Z" />
      <path d="M670 928 Q684 920 692 934 L712 998 L688 1004 Z" />
      <path d="M686 994 L726 996 Q732 1004 724 1008 L684 1008 Z" />
      {/* upper arm resting along the thigh */}
      <path d="M582 896 Q598 886 608 900 L640 946 L622 956 Z" />
    </>
  );
}

function Reader() {
  return (
    <g>
      {/* Indigo outline first, then the fill on top, so only the outer edge shows. */}
      <g className="fill-indigo-base stroke-indigo-base" strokeWidth={8} strokeLinejoin="round">
        <ReaderBody />
      </g>
      <g className="fill-tree-red" opacity={0.75}>
        <ReaderBody />
      </g>

      {/* The book: a tiny TIM ATIEP — indigo cover, white edge, red tree, white title. */}
      <g transform="rotate(-30 664 892)">
        <rect x={644} y={864} width={40} height={54} rx={3} className="fill-indigo-base stroke-clean-white" strokeWidth={3} />
        <rect x={651} y={871} width={26} height={3.5} className="fill-clean-white" />
        <circle cx={664} cy={890} r={10} className="fill-tree-red" />
        <rect x={662} y={894} width={4} height={16} className="fill-tree-red" />
      </g>

      {/* forearm and hand holding the book's lower edge */}
      <g className="fill-indigo-base stroke-indigo-base" strokeWidth={8} strokeLinejoin="round">
        <path d="M622 948 L650 910 L664 918 L636 958 Z" />
        <circle cx={655} cy={912} r={8} />
      </g>
      <g className="fill-tree-red" opacity={0.75}>
        <path d="M622 948 L650 910 L664 918 L636 958 Z" />
        <circle cx={655} cy={912} r={8} />
      </g>
    </g>
  );
}
