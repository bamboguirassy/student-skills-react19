import { NavLink } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";

/**
 * items: Array<{ label: string, to?: string }>
 * - Si "to" est fourni → lien
 * - Sinon → élément courant (aria-current="page")
 */
function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
      <ol className={styles.list}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className={styles.item}>
              {item.to && !isLast ? (
                <NavLink to={item.to} className={styles.link}>
                  {item.label}
                </NavLink>
              ) : (
                <span aria-current="page" className={styles.current}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className={styles.separator}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;