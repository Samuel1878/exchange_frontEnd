import{ useState, type FunctionComponent } from 'react';
import type { LevelType } from '~/context/slices/orderBook';

import { formatNumber } from "~/utils/helpers";


const Spread= (data:string) => {

  

  return (
    <div
      className={`
  bg-gray-900
  text-gray-100
 text-center
  p-1
  `}
    >
      {data}
     
    </div>
  );
};

export default Spread;