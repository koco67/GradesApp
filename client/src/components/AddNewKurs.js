import React, { useState, useContext, useReducer, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import styles from "../styles/AddNewKurs/AddNewKurs.module.css";
import { GiCancel } from "react-icons/gi";
import Button from "./UI/Button";
import KursFormField from "./UI/KursFormField";
import SelectCategory from "./UI/SelectCategory";

const AddKurs = () => {
    const { addKurs } = useContext(GlobalContext);
    const history = useHistory();
    const [isFormValid, setIsFormValid] = useState(false);

    //kurs title
    const [kursTitle, dispatchKursTitle] = useReducer(
        (state, action) => {
            if(action.type === "KURS_INPUT"){
                return {value: action.val, isValid: action.val.length > 2}
            }

            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    //kurs professor
    const [kursAuthor, dispatchKursAuthor] = useReducer(
        (state, action) => {
            if(action.type === "KURS_INPUT"){
                return {value: action.val, isValid: action.val.length > 2}
            }

            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    //kursprice
    const [kursPrice, dispatchKursPrice] = useReducer(
        (state, action) => {
            if(action.type === "KURS_INPUT"){
                return {value: action.val, isValid: action.val >= 0 && action.val <=5}
            }

            return {value: "", isValid: false}
        },
        {value: "", isValid: null}
    )

    //kursSelect
    const [kursCategory, dispatchKursCategory] = useReducer(
        (state, action) => {
            if(action.type === 'KURS_INPUT'){
                return {value: action.val, isValid: action.val !== ''}
            }

            return {value: '', invalid: false}
        },
        {value: '', isValid: false}
    )

    const { isValid: kursTitleIsValid} = kursTitle;
    const { isValid: kursAuthorIsValid} = kursAuthor;
    const { isValid: kursPriceIsValid} = kursPrice;
    const { isValid: kursCategoryIsValid} = kursCategory;

    //useEffect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFormValid(
                kursTitleIsValid &&
                kursAuthorIsValid &&
                kursPriceIsValid &&
                kursCategoryIsValid !== false
            );
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [kursTitleIsValid, kursAuthorIsValid, kursPriceIsValid, kursCategoryIsValid]);


    const onSubmit = function (e) {
        e.preventDefault()
        if(isFormValid !== true) return

        const newKurs = {
            kursName: kursTitle.value,
            kursAuthor: kursAuthor.value,
            kursPrice: kursPrice.value,
            kursCategory: kursCategory.value,
        };

        Axios.post("http://localhost:3004/insert", {
            kursName: kursTitle.value,
            kursPrice: kursPrice.value,
            kursAuthor: kursAuthor.value,
            kursCategory: kursCategory.value,
        });
        addKurs(newKurs);
        history.push("/");
    };

    const onKursTitleChange = function (e) {
        dispatchKursTitle({type: "KURS_INPUT", val: e.target.value} )
    };

    const onAuthorChange = function (e) {
        dispatchKursAuthor({type: 'KURS_INPUT', val: e.target.value});
    };

    const onPriceChange = function (e) {
        dispatchKursPrice({type: "KURS_INPUT", val: e.target.value})

    };

    const onCategoryChange = function (e) {
        dispatchKursCategory({type: "KURS_INPUT", val: e.target.value});
    };

    return (
        <form onSubmit={onSubmit} className={`${styles.form}`}>
            <KursFormField
                label="Class Name"
                value={kursTitle.value}
                type="text"
                placeholder="enter the name of the class"
                onChange={onKursTitleChange}
                className={`${kursTitle.isValid === false ? styles.invalid : ''}`}
            />

            <KursFormField
                label="Professor"
                value={kursAuthor.value}
                type="text"
                placeholder="enter the professor of this class"
                onChange={onAuthorChange}
                className={`${kursAuthor.isValid === false ? styles.invalid : ''}`}
            />

            <KursFormField
                label="Grade"
                value={kursPrice.value}
                type="number"
                placeholder="enter the grade achieved in this class"
                onChange={onPriceChange}
                className={`${kursPrice.isValid === false ? styles.invalid : ''}`}
            />

            <SelectCategory onChange={onCategoryChange}/>

            <div className={styles.buttons}>
                <Button type="submit" className={`${isFormValid ? styles.submit : styles.disabled}`}>
                    Submit
                </Button>
                <Link to="/" className={styles.link}>
                    <GiCancel /> Cancel
                </Link>
            </div>
        </form>
    );
};

export default AddKurs;
