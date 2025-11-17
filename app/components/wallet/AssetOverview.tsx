import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from "~/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
const AssetOverview = () => {
    const [isPriceVisible, setIsPriceVisible] = useState(true);
    const actualPrice = '$1,250.00';
    const hiddenPrice = '•••••';
    const togglePriceVisibility = () => {
        setIsPriceVisible(!isPriceVisible);
    };
    return (
        <>
            <div className="border border-gray-700 rounded-2xl p-4 text-white">
                <div className="grid grid-cols-3 gap-2 py-4">
                    {[
                        { name: 'Spot Account', value: '$0', today: '0', proportion: '0.000' },
                        { name: 'Asset Account', value: '$0', today: '0', proportion: '0.000' },
                        { name: 'Financial Account', value: '$0', today: '0', proportion: '0.000' }
                    ].map((asset, index) => (
                        <Card className="@container/card bg-opacity-50 bg-gradient-to-b from-gray-950 via-gray-800 to-gray-900 border-gray-500 text-white">
                            <CardHeader>
                                <CardDescription>{asset.name}</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex gap-3">
                                    {isPriceVisible ? asset.value : hiddenPrice}
                                    <button
                                        className="eye-toggle"
                                        onClick={togglePriceVisibility}
                                        aria-label={isPriceVisible ? 'Hide price' : 'Show price'}
                                    >
                                        {isPriceVisible ? (
                                            <Eye size={24} className="eye-icon open" />
                                        ) : (
                                            <EyeOff size={24} className="eye-icon" />
                                        )}
                                    </button>
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline" className='text-white'>
                                        {/* <IconTrendingUp /> */}
                                        {asset.proportion}%
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Today {asset.today}
                                </div>
                                <div className="text-muted-foreground">
                                    Visitors for the last 6 months
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="space-y-7 p-2">
                    <div className="grid grid-cols-4 gap-2 text-white">
                        <button className=' border-gray-700 border p-2 bg-gray-700 rounded-2xl'>Deposit</button>
                        <button className=' border-gray-700 border p-2 bg-gray-700 rounded-2xl'>Withdraw</button>
                        <button className=' border-gray-700 border p-2 bg-gray-700 rounded-2xl'>Convert</button>
                        <button className=' border-gray-700 border p-2 bg-gray-700 rounded-2xl'>Transfer</button>
                    </div>
                </div>
                <div className="space-y-7 p-2">
                    <h1>heksdjf;lsadkjf</h1>
                </div>
            </div>
        </>
    );
};

export default AssetOverview;