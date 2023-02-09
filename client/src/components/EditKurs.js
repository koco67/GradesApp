import React, {useState, useContext, useEffect} from 'react';
import { GlobalContext } from "./context/GlobalState";
import { Link, useHistory } from 'react-router-dom';
import styles from '../styles/EditKurs/EditKurs.module.css';
import { BsPencil } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import Button from  './UI/Button';
import UserFormField from './UI/KursFormField';
import Axios from "axios";
import SelectCategory from './UI/SelectCategory';

const EditKurs = (props) => {
    const [selectedKurs, setSelectedKurs] = useState({
        kursName: '',
        kursAuthor: '',
        kursPrice: 0,
        kursCategory: ''
    })
    const { kurses, editKurs } = useContext(GlobalContext);
    const history = useHistory();
    const currentKursId = props.match.params.id;

    useEffect(() => {
        const kursId = currentKursId;
        const selectedKurs = kurses.find(kurs => kurs._id === kursId)
        setSelectedKurs(selectedKurs);
    }, [currentKursId, kurses])

    const updateFood = function (id) {
        const {kursName, kursAuthor, kursPrice, kursCategory} = selectedKurs

        Axios.put("http://localhost:3004/update", {
            id: id,
            kursName: kursName,
            kursAuthor: kursAuthor,
            kursPrice: Number(kursPrice),
            kursCategory: kursCategory
        });
    };

    const onSubmit = function(e){

        editKurs(selectedKurs)
        history.push('/')
        updateFood(currentKursId)
    }

    const onKursNameChange = function(e){
        setSelectedKurs({...selectedKurs,[e.target.name]: e.target.value})
    }

    const onKursAuthorChange = function(e){
        setSelectedKurs({...selectedKurs,[e.target.name]: e.target.value})
    }

    const onKursPriceChange = function(e){
        setSelectedKurs({...selectedKurs,[e.target.name]: e.target.value})
    }

    const onKursCategoryChange = function(e){
        setSelectedKurs({...selectedKurs,[e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={onSubmit} className={styles.form}>
            <UserFormField
                label="Class name"
                name="kursName"
                value={selectedKurs.kursName}
                type="text"
                placeholder="enter the new name of the class"
                onChange={onKursNameChange}
            />

            <UserFormField
                label="Professor"
                name="kursAuthor"
                value={selectedKurs.kursAuthor}
                type="text"
                placeholder="enter the new professor for this class"
                onChange={onKursAuthorChange}

            />

            <UserFormField
                label="Grade"
                name="kursPrice"
                value={selectedKurs.kursPrice}
                type="number"
                placeholder="enter the new grade for this class"
                onChange={onKursPriceChange}

            />
            <SelectCategory name="kursCategory" onChange={onKursCategoryChange} value={selectedKurs.kursCategory}/>

            <div className={styles.buttons}>
                <Button type="submit" className={styles.edit_kurs}> <BsPencil/> Done</Button>
                <Link to="/" className={styles.link}> <GiCancel/> Cancel</Link>
            </div>
        </form>
    )
}

export default EditKurs