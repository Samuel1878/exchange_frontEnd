import React, { useEffect, useState } from "react";
import useWindowDimensions from "~/hooks/windowWidth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { walletTypes } from "~/consts";
import { RiArrowUpDownFill } from "react-icons/ri";
import { getSortedCoinsNoFilter } from "~/utils/helpers";
import type { WalletBalance } from "~/utils/types";
import { Coins } from "~/utils";
import { AllCoinNames } from "~/consts/pairs";
import { TradeButton } from "../charts/components/buttons";
const isWallet = (w:string):boolean => w === "spot" || w==="financial" || w==="funding" 
export default function TransferDrawerDialog({
  open,
  setOpen,
  wallet,
  walletDetails,
}: {
  open: boolean;
  setOpen: () => void;
  wallet: string;
  walletDetails: WalletBalance[];
}) {
  const [from, setFrom] = useState(isWallet(wallet) ? wallet:"spot");
  const [to, setTo] = useState(from === "spot" ? "financial" : "spot");
  const [availableAmount, setAvailableAmount] = useState(0);
  const { width } = useWindowDimensions();
  const [list, setList] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmout] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (isWallet(from || wallet)) {
      const assets = walletDetails?.filter((e) => e.walletType === from);
      setList(getSortedCoinsNoFilter(assets && assets[0]?.assets));
    }
 
  }, [from]);
  useEffect(()=>{
    setValid(Number(amount)>0 && Number(amount)<=availableAmount ? true: false)
  },[amount])
  useEffect(() => {
    if (selectedCoin) {
      list?.map((e) => {
        if (selectedCoin.toUpperCase() === e.symbol.toUpperCase()) {
          setAvailableAmount(e.balance);
          return;
        }
      });
    }
  }, [selectedCoin, list]);
  const toggleWalletType = () => {
    let temFrom: string;
    temFrom = from;
    setFrom(to);
    setTo(temFrom);
    setAvailableAmount(0);
  };
    return (
      <React.Fragment>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="md:w-150 w-120 bg-gray-900 outline-0 border-0 items-center">
            <DialogHeader className="text-center text-gray-50 font-bold text-xl">
              Transfer
            </DialogHeader>
            <DialogTitle/>
            <div className="flex w-full flex-col items-center p-0 md:p-2">
              <div className="border-gray-700 border-0 bg-gray-800 md:bg-gray-900 md:border-2 w-full p-2 py-4 rounded-md flex justify-between">
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-baseline cursor-pointer">
                    <div className="w-14 text-gray-600 font-semibold">From</div>
                    <div className="text-gray-100 capitalize font-semibold text-lg">
                      {from}
                    </div>
                  </div>
                  <div className="flex items-baseline cursor-pointer">
                    <div className="w-14 text-gray-600 font-semibold">To</div>
                    <div className="text-gray-100  capitalize font-semibold text-lg flex-1">
                      {to}
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center p-2 cursor-pointer"
                  onClick={toggleWalletType}
                >
                  <RiArrowUpDownFill size={30} color="#777" />
                </div>
              </div>
              <div className="flex w-full flex-col mt-8">
                <p className="pb-4 text-gray-600 font-semibold text-lg">Coin</p>
                <Select onValueChange={setSelectedCoin}>
                  <SelectTrigger size="lg" className="w-full border-0 md:border-2 bg-gray-800 md:bg-gray-900 border-gray-700 focus:border-amber-300 active:border-amber-300 hover:border-amber-300">
                    <SelectValue
                      className="text-gray-50 flex"
                      placeholder="Select Coin"

                    >
                      <div className="flex text-gray-50 gap-2 items-center">
                        <img
                          src={Coins[selectedCoin]}
                          className="w-6 rounded-full"
                        />
                        <p className="text-lg font-bold">{selectedCoin}</p>
                        <p className="text-md font-semibold text-gray-600">
                          {AllCoinNames[selectedCoin.toLowerCase()]?.name}
                        </p>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="h-1/3 md:max-h-120 bg-gray-900 border-gray-800 border">
                    <SelectGroup>
                      {list?.map((e) => {
                        return (
                          <SelectItem
                            value={e.symbol}
                            key={e.symbol}
                            className=" text-gray-50"
                          >
                            <div className="w-2xs md:w-sm flex justify-between">
                              <div className="flex gap-2 items-center flex-1 w-full">
                                <img
                                  className="w-8 rounded-full"
                                  src={Coins[e.symbol.toUpperCase()]}
                                />
                                <div>
                                  <p className="text-lg font-bold">
                                    {e.symbol}
                                  </p>
                                  <p className="text-gray-500 font-semibold">
                                    {e.name}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col text-right">
                                <p className="text-md font-semibold">
                                  {e.balance}
                                </p>
                                <p className="text-gray-500 font-medium">
                                  ${e.valueUSDT}
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full flex-col mt-8 mb-12">
                <p className="pb-4 text-gray-600 font-semibold text-lg">
                  Amount
                </p>
                <div className="md:border-2 bg-gray-800 md:bg-gray-900 border-0 md:border-gray-700 h-12 rounded-lg flex items-center pr-3">
                  <input
                    className="w-full h-full outline-0 px-3 text-gray-50 font-bold"
                    placeholder="Minimum 0.00000001"
                    value={amount}
                    onChange={(e)=>setAmout(e.target.value)}
                  />
                  <p className="font-bold text-gray-50">{selectedCoin}</p>
                  <button className="font-bold text-amber-400 ml-3 cursor-pointer" onClick={()=>setAmout(()=>availableAmount? availableAmount.toString():"")}>MAX</button>
                </div>
                <p className="mt-2 font-semibold text-gray-500">
                  Available
                  <span className="text-gray-50 ml-3">
                    {availableAmount + " " + selectedCoin}
                  </span>
                </p>
              </div>
            </div>
            <TradeButton disabled={!valid || !amount} label="Transfer" textStyle="text-gray-950 font-bold text-lg" style="bg-amber-300 h-12" action={()=>{}}/>

            <DialogDescription></DialogDescription>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
//   return <React.Fragment></React.Fragment>;
// }
