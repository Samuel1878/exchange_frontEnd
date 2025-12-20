import React, { useState } from "react";
import type { Route } from "./+types/loan";
import { useWalletStore } from "~/store/useUserWalletStore";
import FlexibleLoan from "./flexible";
import FixedLoan from "./fixed";
import { Link } from "react-router";
import FooterSection from "~/components/footer";
import { GrDocumentTime } from "react-icons/gr";
export async function clientLoader ({params}:Route.ClientLoaderArgs) {
  const type = params.type;

  return {type}
}
export default function Loan ({loaderData}:Route.ComponentProps) {
  const {type } = loaderData;
  const isLoggedIn = useWalletStore.getState().isLoggedIn


  return (
    <main className="bg-gray-900 lg:bg-gray-950 flex items-center flex-col overflow-x-hidden">
      <div className="lg:max-w-7xl p-3 md:p-6 lg:p-8 overflow-x-hidden overflow-y-auto">
        <div
          id="tabs"
          className="border-b border-b-gray-800 flex justify-between w-full"
        >
          <div className="flex gap-8">
            <Link
              to="/finance/loans"
              className={`cursor-pointer text-sm pb-2 font-semibold lg:text-lg ${type === "loans" ? "border-b-3 text-gray-50 border-b-amber-300" : "border-b-0 text-gray-500"}`}
            >
              Flexible Rate Loan
            </Link>
            <Link
              to="/finance/fixedLoan"
              className={`cursor-pointer text-sm pb-2 font-semibold lg:text-lg ${type === "fixedLoan" ? "border-b-3 text-gray-50 border-b-amber-300" : "border-b-0 text-gray-500"}`}
            >
              Fixed Rate Loan
            </Link>
          </div>
        { isLoggedIn&& <GrDocumentTime size={24} color="#fff"  />}
        </div>
        <div className="py-8">
          {type === "loans" ? <FlexibleLoan /> : null}
          {type === "fixedLoan" ? <FixedLoan /> : null}
        </div>
        <FooterSection />
      </div>
    </main>
  );
}