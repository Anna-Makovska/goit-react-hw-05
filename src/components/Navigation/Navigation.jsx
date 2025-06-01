import s from "./Navigation.module.css"
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    const buildActiveLinkClass = ({ isActive }) => {
        return ( clsx(s.navlink, isActive && s.isActive))
    }
    return (
      <header className={s.header}>
            <nav className={s.navigation}>
                <NavLink to="/"  className={buildActiveLinkClass}>Home</NavLink>
                <NavLink to="/movies" className={buildActiveLinkClass}>Movies</NavLink>
        </nav>
      </header>
    );
}
export default Navigation