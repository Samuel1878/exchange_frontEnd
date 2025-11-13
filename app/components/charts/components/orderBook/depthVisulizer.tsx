import type{ FunctionComponent } from 'react';
import { OrderType } from "./orderBook";


interface DepthVisualizerProps {
  depth: number;
  orderType: OrderType;
  windowWidth: number;
}

const DepthVisualizerColors = {
  BIDS: "green",
  ASKS: "red"
};

const DepthVisualizer: FunctionComponent<DepthVisualizerProps> = ({windowWidth, depth, orderType }) => {
  return <div data-testid="depth-visualizer" style={{
    backgroundColor: `${orderType === OrderType.BIDS ? DepthVisualizerColors.BIDS : DepthVisualizerColors.ASKS}`,
    height: "1.250em",
    opacity:.4,
    width: `${depth}%`,
    position: "relative",
    top: 21,
    left: `${100 - depth}%`,
    marginTop: -24,
    zIndex: 1,
  }} />;
};

export default DepthVisualizer;