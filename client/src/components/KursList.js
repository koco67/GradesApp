import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./context/GlobalState";
import { BsPencil } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import Axios from "axios";
import styles from "../styles/KursList/KursList.module.css";
import Button from "./UI/Button";

const KursList = () => {
    const { kurses, removeKurs} = useContext(GlobalContext);

    const removeHandler = (id) => {
        removeKurs(id);
        Axios.delete(`http://localhost:3004/delete/${id}`);
    };

    return (
        <table className={styles["content-table"]}>
            <thead>
                <tr>
                    <th className={styles.title}>Class Name</th>
                    <th className={styles.author}>Professor</th>
                    <th className={styles.category}>Semester</th>
                    <th className={styles.price}>Grade</th>
                    <th className={styles.price}>Actions</th>
                </tr>
            </thead>
                <tbody>
                    {kurses.map((kurs) => {
                        return (
                            <tr key={kurs._id}>
                                <td>{kurs.kursName}</td>
                                <td>{kurs.kursAuthor}</td>
                                <td>{kurs.kursCategory}</td>
                                <td>{kurs.kursPrice}</td>
                                <td>
                                    <div className="actions">
                                        <Link
                                            to={`/edit/${kurs._id}`}
                                            id={styles.link}
                                            className={styles.link}
                                        >
                                            <BsPencil />
                                            Edit
                                        </Link>
                                        <Button
                                            onClick={() =>
                                                removeHandler(kurs._id)
                                            }
                                            className={styles.button}
                                        >
                                            <MdDeleteForever />
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            )}
        </table>
    );
};

export default KursList;
