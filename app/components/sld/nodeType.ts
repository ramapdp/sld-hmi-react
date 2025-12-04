import {
  // Basic shapes
  LineNode,
  CustomSVGNode,
  TextNode,
  RectangleNode,
  CircleNode,
  // Sites and Substations
  SubstationOffNode,
  SubstationNode,
  // Switches
  RecloserSwitchClosedNode,
  RecloserSwitchOpenNode,
  LbsClosedNode,
  LbsOpenNode,
  SwitchClosedNode,
  SwitchOpenNode,
  // Transformers
  TrafoTMNode,
  TrafoTTNode,
  Trafo3BelitanNode,
  TrafoAutoNode,
  TrafoDayaNode,
  // Generators
  Generator1Node,
  Generator2Node,
  Generator3Node,
  Generator4Node,
  // Sources
  PembangkitNode,
  Source2Node,
  // Shunts
  Shunt1Node,
  Shunt2Node,
  // Power Electronic Devices
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
  // Grounding
  GroundNode,
  // General shapes
  TriangleNode,
  SquareNode,
  HomeNode,
  // Telemetry
  TapChangerNode,
  FrequencyNode,
  VoltageNode,
  PowerActiveNode,
  PowerReactiveNode,
  CurrentRNode,
  CurrentSNode,
  CurrentTNode,
  CustomTelemetryNode,
  // Manual Set
  ManualSet1Node,
  ManualSet2Node,
} from "~/components/sld/SLDNodeComponents";

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
  LbsClosed: LbsClosedNode,
  LbsOpen: LbsOpenNode,
  switchClosed: SwitchClosedNode,
  switchOpen: SwitchOpenNode,

  // Transformers
  trafoTM: TrafoTMNode,
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

  // Manual Set
  manualSet1: ManualSet1Node,
  manualSet2: ManualSet2Node,
};
