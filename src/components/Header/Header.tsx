// import { IHeader } from "./HeaderTypes";
import { FC } from 'react';
import styles from './Header.module.scss';
import { HeaderNavbar } from "../HeaderNavBar/HeaderNavBar";
import { HeaderSearchForm } from "../HeaderSearchForm/HeaderSearchForm";
import {FaRegUser} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { popupState } from "../../UI/Popup/PopupSlice";
import { ResultPopup } from "../ResultPopup/ResultPopup";
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import { selectUser } from '../../services/redux/slices/user/user';



export const Header: FC = () => {
    const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
    return (
        <header className={styles.header}>
            <Link to='/catalog' className={styles.header__logo}>Logo</Link>
            <HeaderNavbar/>
            <HeaderSearchForm/>
            <div className={styles.btncontainer}>
            {user.token? (<Link to='personal/favorites' className={styles.btncontainer__likebtn}/>) : null}
                <Link to='/cart' className={styles.btncontainer__shopbtn}/>
                {user.token? (
                    <Link to='/personal' className={styles.btncontainer__profile}><FaRegUser className={styles.btncontainer__profileicon}/></Link>
                ) : (
                    <button type='button' onClick={()=>{
                        dispatch(popupState(true))
                        console.log(user)
                    }} className={styles.btncontainer__profileenter}>Войти</button>
                )}
            </div>
            <ResultPopup />
        </header>
    )
}
