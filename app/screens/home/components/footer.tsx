
import { Link } from "react-router";
import { company, contacts, help, services } from "~/consts/footersList";
// import LanguageChangeBtn from "./buttons/languageBtn";
import { useTranslation } from "react-i18next";


const FooterSection = () => {
    const {t , i18n} = useTranslation()
  return (
    <footer className="flex flex-col lg:items-center">
      <div className="flex flex-col lg:flex-row-reverse w-full md:p-4 mt-10 lg:max-w-6xl">
        <div id="footer" className="flex flex-row justify-between lg:flex-2/3">
          <div className="flex flex-col pl-5 py-4">
            <h5 className="text-lg lg:text-2xl text-neutral-200 font-bold mb-2">
              Services
            </h5>
            {services.map((service, index) => {
                 let value;
                 switch (service.value) {
                  case "download":
                      value = "#download"
                    break;
                  case "faq":
                    value = "#faq"
                    break;
                  default:
                    value =  `/${service.value}`;
                    break;
                 } 
              return( <Link to={value} key={index}>
                <div className="my-2">
                  <p className="text-sm text-neutral-500 capitalize hover:text-amber-500 sm:text-md md:text-lg lg:text-2xl">
                    {service.label}
                  </p>
                </div>
              </Link>
              )}
            )}
          </div>
          <div className="flex flex-col py-4">
            <h5 className="text-lg text-neutral-200 font-bold mb-2 lg:text-2xl">
              Company
            </h5>
            {company.map((company, index) => (
              <Link to="" key={index}>
                <div className="my-2">
                  <p className="text-sm text-neutral-500 hover:text-amber-500 sm:text-md md:text-lg lg:text-2xl">
                    {company.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col pr-5 py-4">
            <h5 className="text-lg text-neutral-200 font-bold lg:text-2xl mb-2">Help</h5>
            {help.map((e, i) => (
              <Link to={e.value} key={i}>
                <div className="my-2">
                  <p className="text-sm text-neutral-500 capitalize hover:text-amber-500 sm:text-md md:text-lg lg:text-2xl">
                    {e.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <aside
          id="community"
          className="p-5 flex flex-1 flex-col justify-center lg:mr-10 lg:self-start"
        >
          <p className="text-lg text-neutral-200 font-bold lg:text-2xl">Community</p>
          <div className="flex flex-0.5 h-auto flex-row flex-wrap  gap-6 mt-6 lg:grid lg:grid-cols-3 lg:gap-8">
            {contacts.map((e) => (
              <button className="" key={e.name}>
                <img
                  src={e.icon}
                  width={25}
                  height={25}
                  // className="lg:w-15 lg:h-10"
                />
              </button>
            ))}
          </div>
          <div className="flex w-full mt-5">
            {/* <LanguageChangeBtn t={t} i18n={i18n} /> */}
          </div>
        </aside>
      </div>
      <div className="mx-2 w-full flex flex-col lg:flex-row gap-2 lg:gap-4 items-center justify-center py-5 border-t-1 border-neutral-800">
        <p className="text-sm text-neutral-400">Trademark@ 2025</p>
        <p className="text-sm text-neutral-400">Cookie Preferences</p>
      </div>
    </footer>
  );
};
export default FooterSection;