import { Outlet } from "react-router";
import NavBar from "~/components/navBar/navBar";

export default function NavBarLayout () {
      return(
            <>
            <NavBar/>
                  <Outlet/>
            </>
      )
}