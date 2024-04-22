
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function NavBar() {
  let Numero = Math.round((Math.random('0', '649'))*100 ,2)
    return (
        <nav className="nav">
            <Link href="">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${Numero}.gif`} alt=""/>
            POKEDEX</Link>
            <ul>
                <CustomLink to="/">About</CustomLink>
                <CustomLink to="/PokeInfo">Search Pokemon</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }