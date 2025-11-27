import type{ FunctionComponent } from 'react';
import { OrderType } from "./orderBook";


interface DepthVisualizerProps {
  depth: number;
  orderType: OrderType;

}

const DepthVisualizerColors = {
  BIDS: "oklch(72.3% 0.219 149.579)",
  ASKS: "rgba(255,30,30,1)",
};

const DepthVisualizer: FunctionComponent<DepthVisualizerProps> = ({ depth, orderType }) => {
  return <div className={``} data-testid="depth-visualizer" style={{
    backgroundColor: `${orderType === OrderType.BIDS ? DepthVisualizerColors.BIDS : DepthVisualizerColors.ASKS}`,
    opacity:.2,
    width: `${depth}%`,
    position: "absolute",
    top: 0,
    bottom:0,
    right:0,
        left: `${100 - depth}%`,
    // marginTop: -20,
    zIndex: 1,
  }} />;
};

export default DepthVisualizer;