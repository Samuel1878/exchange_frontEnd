import { useTranslation } from "react-i18next";
import { CiGift } from "react-icons/ci";
import { Form } from "react-router";
import HomeMiniChart from "~/components/miniCharts/homeMiniChart";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 lg:bg-gray-950 h-dvh flex p-4">
      <section id="hero" className="flex flex-col w-full">
        <article
          id={"hero1"}
          className="flex flex-col items-center gap-10 my-10 md:my-7 md:items-start md:pl-8"
        >
          <div className="flex flex-col justify-center items-center gap-2 md:items-start md:gap-4">
            <h2 className="text-gray-50 font-extrabold text-2xl md:text-4xl md:font-bold">
              MORE THAN
            </h2>
            <h2 className="text-amber-400 font-extrabold text-5xl font-serif md:text-8xl">
              25 MILLION
            </h2>
            <h2 className="text-gray-50 font-extrabold text-3xl md:text-8xl md:*:first:block">
              <span>USERS </span>
              <span>TRUST US</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 md:items-start">
            <div className="flex gap-2">
              <CiGift className="text-amber-400" size={19} />
              <p className="font-normal text-sm  text-gray-50">
                Up to $100 Bonus Only Today
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Form className="hidden md:block">
                <input
                  name="email/phone"
                  style={{
                    borderWidth: 1,
                    borderColor: "rgba(244,244,244,.3)",
                  }}
                  placeholder="Email/Phone number"
                  className="py-3 rounded-md w-sm px-3 border-amber-50"
                />
              </Form>
              <button className="bg-amber-300 px-14 py-3 rounded-md">
                <p className="font-medium text-md text-gray-950">Sign Up</p>
              </button>
            </div>
          </div>
        </article>
        <article id="hero2" className="md:mt-8">
          <HomeMiniChart />
        </article>
      </section>
    </div>
  );
};
export default Home;
