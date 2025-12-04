// Basic shapes
import {
  LineNode,
  CustomSVGNode,
  TextNode,
  RectangleNode,
  CircleNode,
} from "~/components/sld/node-component/BasicShapes";

// Sites and Substations
import {
  SubstationOffNode,
  SubstationNode,
} from "~/components/sld/node-component/SitesSubstations";

// Switches
import {
  RecloserSwitchClosedNode,
  RecloserSwitchOpenNode,
  LbsClosedNode,
  LbsOpenNode,
  SwitchClosedNode,
  SwitchOpenNode,
} from "~/components/sld/node-component/Switches";

// Transformers
import {
  TrafoTMNode,
  Trafo2BelitanNode,
  TrafoTTNode,
  Trafo3BelitanNode,
  TrafoAutoNode,
  TrafoDayaNode,
} from "~/components/sld/node-component/Transformers";

// Generators
import {
  Generator1Node,
  Generator2Node,
  Generator3Node,
  Generator4Node,
} from "~/components/sld/node-component/Generators";

// Sources
import {
  PembangkitNode,
  Source2Node,
} from "~/components/sld/node-component/Sources";

// Shunts
import {
  Shunt1Node,
  Shunt2Node,
} from "~/components/sld/node-component/Shunts";

// Power Electronic Devices
import {
  CircuitBreakerNode,
  PowerElectronic2Node,
  PowerElectronic3Node,
  PowerElectronic4Node,
  PowerElectronic5Node,
  PowerElectronic6Node,
  PowerElectronic7Node,
  PowerElectronic8Node,
  PowerElectronic9Node,
  PowerElectronic10Node,
  PowerElectronic11Node,
  PowerElectronic12Node,
  PowerElectronic13Node,
  PowerElectronic14Node,
  PowerElectronic15Node,
} from "~/components/sld/node-component/PowerElectronics";

// Grounding
import { GroundNode } from "~/components/sld/node-component/Grounding";

// Busbar
import { BusbarNode } from "~/components/sld/node-component/Busbar";

// General shapes
import {
  TriangleNode,
  SquareNode,
  HomeNode,
} from "~/components/sld/node-component/GeneralShapes";

// Telemetry
import {
  TapChangerNode,
  FrequencyNode,
  VoltageNode,
  PowerActiveNode,
  PowerReactiveNode,
  CurrentRNode,
  CurrentSNode,
  CurrentTNode,
  CustomTelemetryNode,
} from "~/components/sld/node-component/Telemetry";

// Manual Set
import {
  ManualSet1Node,
  ManualSet2Node,
} from "~/components/sld/node-component/ManualSet";

export const nodeTypes = {
  // Basic Shapes
  line: LineNode,
  customSVG: CustomSVGNode,
  text: TextNode,
  rectangle: RectangleNode,
  circle: CircleNode,

  // Sites and Substations
  substationOff: SubstationOffNode,
  substation: SubstationNode,

  // Switches
  RecloserSwitchClosed: RecloserSwitchClosedNode,
  RecloserSwitchOpen: RecloserSwitchOpenNode,
  RecloserSwitch: RecloserSwitchClosedNode,
  LbsClosed: LbsClosedNode,
  LbsOpen: LbsOpenNode,
  Lbs: LbsClosedNode,
  switchClosed: SwitchClosedNode,
  switchOpen: SwitchOpenNode,
  switch: SwitchClosedNode,

  // Transformers
  trafoTM: TrafoTMNode,
  trafo2Belitan: Trafo2BelitanNode,
  trafoTT: TrafoTTNode,
  trafo3Belitan: Trafo3BelitanNode,
  trafoAuto: TrafoAutoNode,
  trafoDaya: TrafoDayaNode,

  // Generators
  generator1: Generator1Node,
  generator2: Generator2Node,
  generator3: Generator3Node,
  generator4: Generator4Node,

  // Sources
  pembangkit: PembangkitNode,
  source2: Source2Node,

  // Shunts and Filters
  shunt1: Shunt1Node,
  shunt2: Shunt2Node,

  // Power Electronic Devices
  circuitBreaker: CircuitBreakerNode,
  cb: CircuitBreakerNode,
  powerElectronic2: PowerElectronic2Node,
  powerElectronic3: PowerElectronic3Node,
  powerElectronic4: PowerElectronic4Node,
  powerElectronic5: PowerElectronic5Node,
  powerElectronic6: PowerElectronic6Node,
  powerElectronic7: PowerElectronic7Node,
  powerElectronic8: PowerElectronic8Node,
  powerElectronic9: PowerElectronic9Node,
  powerElectronic10: PowerElectronic10Node,
  powerElectronic11: PowerElectronic11Node,
  powerElectronic12: PowerElectronic12Node,
  powerElectronic13: PowerElectronic13Node,
  powerElectronic14: PowerElectronic14Node,
  powerElectronic15: PowerElectronic15Node,

  // Grounding
  ground: GroundNode,

  // Busbar
  busbar: BusbarNode,
  bus: BusbarNode,

  // General Components
  triangle: TriangleNode,
  square: SquareNode,
  circleIcon: CircleNode,
  home: HomeNode,

  // Telemetry
  tapChanger: TapChangerNode,
  frequency: FrequencyNode,
  voltage: VoltageNode,
  powerActive: PowerActiveNode,
  powerReactive: PowerReactiveNode,
  currentR: CurrentRNode,
  currentS: CurrentSNode,
  currentT: CurrentTNode,
  customTelemetry: CustomTelemetryNode,
  telemetry: CustomTelemetryNode,

  // Manual Set
  manualSet1: ManualSet1Node,
  manualSet2: ManualSet2Node,
};
