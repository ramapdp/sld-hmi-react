import Substation from "~/assets/icons/sites-substations/Frame 480.svg";
import RecloserSwitch from "~/assets/icons/switches/Frame 478.svg";
import Lbs from "~/assets/icons/switches/Frame 480.svg";
import Switch from "~/assets/icons/switches/Frame 482.svg";
import Trafo2Belitan from "~/assets/icons/transformers/Frame 478.svg";
import Trafo3Belitan from "~/assets/icons/transformers/Frame 485.svg";
import TrafoAuto from "~/assets/icons/transformers/Frame 486.svg";
import TrafoDaya from "~/assets/icons/transformers/Frame 487.svg";
import Generator2 from "~/assets/icons/generator-loads/Frame 479.svg";
import Pembangkit from "~/assets/icons/generator-loads/Frame 480.svg";
import Shunt1 from "~/assets/icons/shunts-filters/Frame 479.svg";
import Shunt2 from "~/assets/icons/shunts-filters/Frame 480.svg";
import PowerElectronic1 from "~/assets/icons/power-electronic-devices/Frame 478.svg";
import PowerElectronic2 from "~/assets/icons/power-electronic-devices/Frame 479.svg";
import PowerElectronic3 from "~/assets/icons/power-electronic-devices/Frame 480.svg";
import PowerElectronic4 from "~/assets/icons/power-electronic-devices/Frame 481.svg";
import PowerElectronic5 from "~/assets/icons/power-electronic-devices/Frame 481-1.svg";
import PowerElectronic6 from "~/assets/icons/power-electronic-devices/Frame 482.svg";
import PowerElectronic7 from "~/assets/icons/power-electronic-devices/Frame 483-1.svg";
import PowerElectronic8 from "~/assets/icons/power-electronic-devices/Frame 483-2.svg";
import PowerElectronic9 from "~/assets/icons/power-electronic-devices/Frame 483.svg";
import PowerElectronic10 from "~/assets/icons/power-electronic-devices/Frame 484.svg";
import PowerElectronic11 from "~/assets/icons/power-electronic-devices/Frame 485.svg";
import PowerElectronic12 from "~/assets/icons/power-electronic-devices/Frame 486.svg";
import PowerElectronic13 from "~/assets/icons/power-electronic-devices/Frame 487.svg";
import PowerElectronic14 from "~/assets/icons/power-electronic-devices/Frame 488.svg";
import PowerElectronic15 from "~/assets/icons/power-electronic-devices/Frame 489.svg";
import Ground from "~/assets/icons/grounding-elements/Frame 478(1).svg";
import Line from "~/assets/icons/general/Frame 479.svg";
import Triangle from "~/assets/icons/general/Frame 480.svg";
import Square from "~/assets/icons/general/Frame 481.svg";
import Circle from "~/assets/icons/general/Frame 482.svg";
import Home from "~/assets/icons/general/Frame 483.svg";
import Text from "~/assets/icons/general/Frame 484.svg";
import ManualSet1 from "~/assets/icons/manual-set/Frame 478.svg";
import ManualSet2 from "~/assets/icons/manual-set/Frame 486.svg";
import TapChanger from "~/assets/icons/telemetry/draw-tele-01.svg";
import Frequecy from "~/assets/icons/telemetry/draw-tele-02.svg";
import Voltage from "~/assets/icons/telemetry/draw-tele-03.svg";
import PowerActive from "~/assets/icons/telemetry/draw-tele-04.svg";
import PowerReactive from "~/assets/icons/telemetry/draw-tele-05.svg";
import CurrentR from "~/assets/icons/telemetry/draw-tele-06.svg";
import CurrentS from "~/assets/icons/telemetry/draw-tele-07.svg";
import CurrentT from "~/assets/icons/telemetry/draw-tele-08.svg";
import CustomTelemetry from "~/assets/icons/telemetry/draw-tele-09.svg";
import Bus from "~/assets/icons/bus-lines/busbar.svg";

export const componentsList = [
  {
    category: "Sites and Substations",
    collapsed: false,
    items: [
      {
        type: "substation",
        label: "Substation",
        icon: <img src={Substation} alt="Substation" className="w-6 h-auto" />,
        defaultData: { label: "Substation", voltage: "150", type: "type3" },
      },
    ],
  },
  {
    category: "Switches",
    collapsed: false,
    items: [
      {
        type: "RecloserSwitch",
        label: "Recloser Switch ",
        icon: (
          <img
            src={RecloserSwitch}
            alt="Recloser Switch "
            className="w-6 h-auto"
          />
        ),
        defaultData: {
          label: "Recloser Switch ",
          status: "CLOSE",
          voltage: "20",
        },
      },
      {
        type: "Lbs",
        label: "LBS ",
        icon: <img src={Lbs} alt="LBS " className="w-6 h-auto" />,
        defaultData: { label: "LBS ", status: "CLOSE", voltage: "20" },
      },
      {
        type: "switch",
        label: "Switch ",
        icon: (
          <img src={Switch} alt="Switch " className="w-6 h-auto" />
        ),
        defaultData: { label: "Switch ", status: "CLOSE", voltage: "20" },
      },
    ],
  },
  {
    category: "Transformers",
    collapsed: false,
    items: [
      {
        type: "trafo2Belitan",
        label: "Trafo 2 Belitan",
        icon: <img src={Trafo2Belitan} alt="Trafo 2 Belitan" className="w-6 h-auto" />,
        defaultData: {
          label: "Trafo 2 Belitan",
          capacity: "100",
          voltageLevel: "HV/MV",
        },
      },
      {
        type: "trafo3Belitan",
        label: "Trafo 3 Belitan",
        icon: (
          <img
            src={Trafo3Belitan}
            alt="Trafo 3 Belitan"
            className="w-6 h-auto"
          />
        ),
        defaultData: {
          label: "Trafo 3 Belitan",
          capacity: "200",
          voltageLevel: "HV/LV",
        },
      },
      {
        type: "trafoAuto",
        label: "Auto Trafo",
        icon: <img src={TrafoAuto} alt="Auto Trafo" className="w-6 h-auto" />,
        defaultData: {
          label: "Auto Trafo",
          capacity: "250",
          voltageLevel: "HV/MV",
        },
      },
      {
        type: "trafoDaya",
        label: "Trafo Daya",
        icon: <img src={TrafoDaya} alt="Trafo Daya" className="w-6 h-auto" />,
        defaultData: {
          label: "Trafo Daya",
          capacity: "300",
          voltageLevel: "MV/LV",
        },
      },
    ],
  },
  {
    category: "Generators and Loads",
    collapsed: false,
    items: [
      {
        type: "pembangkit",
        label: "Pembangkit",
        icon: <img src={Pembangkit} alt="Pembangkit" className="w-6 h-auto" />,
        defaultData: { label: "Pembangkit", power: "200", type: "type3" },
      },
      {
        type: "generator2",
        label: "Generator Type 2",
        icon: (
          <img src={Generator2} alt="Generator Type 2" className="w-6 h-auto" />
        ),
        defaultData: { label: "Generator 2", power: "150", type: "type2" },
      },
    ],
  },
  {
    category: "Sources",
    collapsed: false,
    items: [
      {
        type: "pembangkit",
        label: "Pembangkit",
        icon: <img src={Pembangkit} alt="Pembangkit" className="w-6 h-auto" />,
        defaultData: { label: "Pembangkit", power: "200", type: "type3" },
      },
    ],
  },
  {
    category: "Bus and Lines",
    collapsed: false,
    items: [
      {
        type: "bus",
        label: "Bus",
        icon: <img src={Bus} alt="Bus" className="w-6 h-auto" />,
        defaultData: { label: "Bus", power: "200", type: "type3" },
      },
    ],
  },
  {
    category: "Shunts and Filters",
    collapsed: false,
    items: [
      {
        type: "shunt1",
        label: "Shunt Type 1",
        icon: <img src={Shunt1} alt="Shunt Type 1" className="w-6 h-auto" />,
        defaultData: { label: "Shunt 1", capacitance: "50", type: "Capacitor" },
      },
      {
        type: "shunt2",
        label: "Shunt Type 2",
        icon: <img src={Shunt2} alt="Shunt Type 2" className="w-6 h-auto" />,
        defaultData: { label: "Shunt 2", inductance: "30", type: "Inductor" },
      },
    ],
  },
  {
    category: "Power Electronic Devices",
    collapsed: false,
    items: [
      {
        type: "circuitBreaker",
        label: "Circuit Breaker (CB)",
        icon: (
          <img
            src={PowerElectronic1}
            alt="Circuit Breaker"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "Circuit Breaker", rating: "100", type: "CB" },
      },
      {
        type: "powerElectronic2",
        label: "Power Electronic Device Type 2",
        icon: (
          <img
            src={PowerElectronic2}
            alt="Power Electronic Device Type 2"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 2", rating: "150", type: "Converter" },
      },
      {
        type: "powerElectronic3",
        label: "Power Electronic Device Type 3",
        icon: (
          <img
            src={PowerElectronic3}
            alt="Power Electronic Device Type 3"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 3", rating: "200", type: "Rectifier" },
      },
      {
        type: "powerElectronic4",
        label: "Power Electronic Device Type 4",
        icon: (
          <img
            src={PowerElectronic4}
            alt="Power Electronic Device Type 4"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 4", rating: "250", type: "Chopper" },
      },
      {
        type: "powerElectronic5",
        label: "Power Electronic Device Type 5",
        icon: (
          <img
            src={PowerElectronic5}
            alt="Power Electronic Device Type 5"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 5", rating: "300", type: "Cycloconverter" },
      },
      {
        type: "powerElectronic6",
        label: "Power Electronic Device Type 6",
        icon: (
          <img
            src={PowerElectronic6}
            alt="Power Electronic Device Type 6"
            className="w-6 h-auto"
          />
        ),
        defaultData: {
          label: "PED 6",
          rating: "350",
          type: "Static VAR Compensator",
        },
      },
      {
        type: "powerElectronic7",
        label: "Power Electronic Device Type 7",
        icon: (
          <img
            src={PowerElectronic7}
            alt="Power Electronic Device Type 7"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 7", rating: "400", type: "STATCOM" },
      },
      {
        type: "powerElectronic8",
        label: "Power Electronic Device Type 8",
        icon: (
          <img
            src={PowerElectronic8}
            alt="Power Electronic Device Type 8"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 8", rating: "450", type: "SVC" },
      },
      {
        type: "powerElectronic9",
        label: "Power Electronic Device Type 9",
        icon: (
          <img
            src={PowerElectronic9}
            alt="Power Electronic Device Type 9"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 9", rating: "500", type: "Active Filter" },
      },
      {
        type: "powerElectronic10",
        label: "Power Electronic Device Type 10",
        icon: (
          <img
            src={PowerElectronic10}
            alt="Power Electronic Device Type 10"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 10", rating: "550", type: "Passive Filter" },
      },
      {
        type: "powerElectronic11",
        label: "Power Electronic Device Type 11",
        icon: (
          <img
            src={PowerElectronic11}
            alt="Power Electronic Device Type 11"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 11", rating: "600", type: "HVDC Converter" },
      },
      {
        type: "powerElectronic12",
        label: "Power Electronic Device Type 12",
        icon: (
          <img
            src={PowerElectronic12}
            alt="Power Electronic Device Type 12"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "PED 12", rating: "650", type: "FACTS Device" },
      },
      {
        type: "powerElectronic13",
        label: "Power Electronic Device Type 13",
        icon: (
          <img
            src={PowerElectronic13}
            alt="Power Electronic Device Type 13"
            className="w-6 h-auto"
          />
        ),
        defaultData: {
          label: "PED 13",
          rating: "700",
          type: "Solid State Transformer",
        },
      },
      {
        type: "powerElectronic14",
        label: "Power Electronic Device Type 14",
        icon: (
          <img
            src={PowerElectronic14}
            alt="Power Electronic Device Type 14"
            className="w-6 h-auto"
          />
        ),
        defaultData: {
          label: "PED 14",
          rating: "750",
          type: "Matrix Converter",
        },
      },
      {
        type: "powerElectronic15",
        label: "Power Electronic Device Type 15",
        icon: (
          <img
            src={PowerElectronic15}
            alt="Power Electronic Device Type 15"
            className="w-6 h-auto"
          />
        ),
        defaultData: {
          label: "PED 15",
          rating: "800",
          type: "Thyristor Controlled Reactor",
        },
      },
    ],
  },
  {
    category: "Grounding Elements",
    collapsed: false,
    items: [
      {
        type: "ground",
        label: "Grounding",
        icon: <img src={Ground} alt="Grounding" className="w-6 h-auto" />,
        defaultData: { label: "Ground 1", resistance: "5" },
      },
    ],
  },
  {
    category: "Telemetry",
    collapsed: false,
    items: [
      {
        type: "tapChanger",
        label: "Tap Changer",
        icon: <img src={TapChanger} alt="Tap Changer" className="w-5 h-auto" />,
        defaultData: { label: "Tap Changer" },
      },
      {
        type: "frequency",
        label: "Frequency",
        icon: <img src={Frequecy} alt="Frequency" className="w-5 h-auto" />,
        defaultData: { label: "Frequency" },
      },
      {
        type: "voltage",
        label: "Voltage",
        icon: <img src={Voltage} alt="Voltage" className="w-5 h-auto" />,
        defaultData: { label: "Voltage" },
      },
      {
        type: "powerActive",
        label: "Power Active",
        icon: (
          <img src={PowerActive} alt="Power Active" className="w-5 h-auto" />
        ),
        defaultData: { label: "Power Active" },
      },
      {
        type: "powerReactive",
        label: "Power Reactive",
        icon: (
          <img
            src={PowerReactive}
            alt="Power Reactive"
            className="w-5 h-auto"
          />
        ),
        defaultData: { label: "Power Reactive" },
      },
      {
        type: "currentR",
        label: "Current R",
        icon: <img src={CurrentR} alt="Current R" className="w-5 h-auto" />,
        defaultData: { label: "Current R" },
      },
      {
        type: "currentS",
        label: "Current S",
        icon: <img src={CurrentS} alt="Current S" className="w-5 h-auto" />,
        defaultData: { label: "Current S" },
      },
      {
        type: "currentT",
        label: "Current T",
        icon: <img src={CurrentT} alt="Current T" className="w-5 h-auto" />,
        defaultData: { label: "Current T" },
      },
      {
        type: "customTelemetry",
        label: "Custom Telemetry",
        icon: (
          <img
            src={CustomTelemetry}
            alt="Custom Telemetry"
            className="w-5 h-auto"
          />
        ),
        defaultData: { label: "Custom Telemetry" },
      },
    ],
  },
  {
    category: "General",
    collapsed: false,
    items: [
      {
        type: "line",
        label: "Line",
        icon: <img src={Line} alt="Line" className="w-6 h-auto" />,
        defaultData: {
          label: "Line",
          length: 100,
          angle: 0,
          color: "#ffffff",
          thickness: 2,
        },
      },
      {
        type: "triangle",
        label: "Triangle",
        icon: <img src={Triangle} alt="Triangle" className="w-6 h-auto" />,
        defaultData: { label: "Triangle" },
      },
      {
        type: "square",
        label: "Square",
        icon: <img src={Square} alt="square" className="w-6 h-auto" />,
        defaultData: { label: "Square" },
      },
      {
        type: "circleIcon",
        label: "Circle",
        icon: <img src={Circle} alt="Circle" className="w-6 h-auto" />,
        defaultData: { label: "Circle" },
      },
      {
        type: "home",
        label: "Home",
        icon: <img src={Home} alt="Home" className="w-6 h-auto" />,
        defaultData: { label: "Home" },
      },
      {
        type: "text",
        label: "Text",
        icon: <img src={Text} alt="Text" className="w-6 h-auto" />,
        defaultData: { label: "Text", fontSize: 14, color: "#ffffff" },
      },
    ],
  },
  {
    category: "Manual Set",
    collapsed: false,
    items: [
      {
        type: "manualSet1",
        label: "Manual Set Type 1",
        icon: (
          <img
            src={ManualSet1}
            alt="Manual Set Type 1"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "Manual Set 1" },
      },
      {
        type: "manualSet2",
        label: "Manual Set Type 2",
        icon: (
          <img
            src={ManualSet2}
            alt="Manual Set Type 2"
            className="w-6 h-auto"
          />
        ),
        defaultData: { label: "Manual Set 2" },
      },
    ],
  },
];
