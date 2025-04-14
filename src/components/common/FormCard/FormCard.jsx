import styles from "./FormCard.module.css";

const FormCard = ({ children,onSubmit }) => {
    return <form className={styles.form} onSubmit={onSubmit}>{children}</form>;
};

export default FormCard;