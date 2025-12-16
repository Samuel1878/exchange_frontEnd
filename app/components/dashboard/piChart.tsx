import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Sector,

  Tooltip,
  type PieSectorDataItem,
  type TooltipProps,

} from "recharts";
import { ChartContainer, type ChartConfig } from "../ui/chart";

const COLORS = [
  "#22c55e", // green
  "#3b82f6", // blue
  "#f59e0b", // amber
];

type Props = {
  walletTotals: Record<string, number> | null;
};
const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
type WalletPieItem = {
  name: string;
  value: number;
};

const toPieData = (
  walletTotals: Record<string, number> | null
): WalletPieItem[] => {
  if (!walletTotals) return [];

  return Object.entries(walletTotals)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => ({
      name: key.toUpperCase(),
      value,
    }));
};
const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={16}
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        fontSize={14}
      >
        {`(Dominance ${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function CustomActiveShapePieChart({
  isAnimationActive = true,
  defaultIndex = undefined,
  walletTotals
}) {
    const data = toPieData(walletTotals);

      if (!data.length) return null;

      const total = data.reduce((sum, d) => sum + d.value, 0);

      // attach total for tooltip percentage
      const chartData = data.map((d) => ({
        ...d,
        total,
      }));
  return (
    <ChartContainer
      config={chartConfig}
      style={{ width: "400px", height: "400px" }}
    >
      <PieChart
        style={{
          width: "100%",
          // maxWidth: "50px",
          // maxHeight: "500px",
          aspectRatio: 1,
        }}
      >
        <Pie
          data={chartData}
          dataKey="value"
          activeShape={renderActiveShape}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={50}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip content={() => null} defaultIndex={defaultIndex} active isAnimationActive />
      </PieChart>
    </ChartContainer>
  );
}
