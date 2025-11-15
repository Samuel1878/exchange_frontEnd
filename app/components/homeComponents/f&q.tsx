import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FAQList } from "~/consts/faqLists";

export default function FAQ() {
  const [open, setOpen] = useState({ opening: false, value: 0 });
  return (
    <section id="faq" className="lg:flex lg:flex-col lg:items-center">
      <div className="w-full flex items-center flex-col py-4 md:py-8 lg:py-14 px-6 sm:px-8 md:px-15 lg:px-20 lg:max-w-6xl">
        <h3 className="text-2xl text-neutral-50 font-semibold mb-8 md:text-3xl lg:text-4xl">
          Frequently Asked Questions
        </h3>
        {FAQList.map((data, i) => (
          <div
            key={data.id}
            className="flex w-full justify-between py-4 md:py-6 relative items-center "
          >
            <div>
              <div className="flex gap-4 items-center ">
                <div className="w-8 h-8 flex items-center justify-center border-neutral-700 border-1 rounded-md text-sm text-neutral-50 font-mono">
                  {data.id}
                </div>
                <p className="text-md text-neutral-50 font-medium md:text-lg lg:text-xl wrap-break-words">
                  {data.title}
                </p>
              </div>
              {open.opening && open.value === data.id ? (
                <div className="ml-15 m-7">
                  <p className="text-sm font-normal text-gray-600">
                    {data.detail}
                  </p>
                </div>
              ) : null}
            </div>
            <button
                  className="self-start"
              onClick={() => {
                if (open.opening && open.value === data.id) {
                  setOpen({ opening: false, value: 0 });
                  return;
                } else if (!open.opening) {
                  setOpen({ opening: true, value: data.id });
                  return;
                } else if (open.opening && open.value !== data.id) {
                  setOpen({ opening: true, value: data.id });
                }
              }}
            >
              {open.opening && open.value === data.id ? (
                <FaMinus color="#fff"/>
              ) : (
                <FaPlus color="#fff"/>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
