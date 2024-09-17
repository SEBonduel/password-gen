import React, { useEffect, useState } from 'react';
import './PasswordGenerator.css';
import copyIcon from '../assets/copy-icon.svg';
import { ToastContainer, toast } from 'react-toastify';
import DarkMode from './DarkMode/DarkMode';


const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';
const symbolsList = "!@#$%^&*()?";

function PasswordGenerator() {

    const [password, setPassword] = useState('');
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [passwordLength, setPasswordLength] = useState(8);
    const [selectedChoices, setSelectedChoices] = useState(['lowercase', 'uppercase', 'numbers', 'symbols']);

    useEffect(() => {
        generatePassword();
    },[passwordLength]);

    const handleCheckbox = (type) => {
        let tempChoices = selectedChoices;
        if(tempChoices.includes(type)){
            const index = tempChoices.indexOf(type);
            tempChoices.splice(index,1);
        }
        else{
            tempChoices.push(type);
        }
        console.log(tempChoices);
        setSelectedChoices(tempChoices);
    }

    const generatePassword = () => {
        let characterList = '';
        let tempPassword = '';
        const categories = [];
    
        if (lowerCase) {
            const randomLower = lowercaseList.charAt(Math.floor(Math.random() * lowercaseList.length));
            tempPassword += randomLower;
            categories.push(lowercaseList);
        }
        if (upperCase) {
            const randomUpper = uppercaseList.charAt(Math.floor(Math.random() * uppercaseList.length));
            tempPassword += randomUpper;
            categories.push(uppercaseList);
        }
        if (numbers) {
            const randomNumber = numbersList.charAt(Math.floor(Math.random() * numbersList.length));
            tempPassword += randomNumber;
            categories.push(numbersList);
        }
        if (symbols) {
            const randomSymbol = symbolsList.charAt(Math.floor(Math.random() * symbolsList.length));
            tempPassword += randomSymbol;
            categories.push(symbolsList);
        }
    
        characterList = categories.join('');
    
        for (let i = tempPassword.length; i < passwordLength; i++) {
            const randomCharacter = characterList.charAt(Math.floor(Math.random() * characterList.length));
            tempPassword += randomCharacter;
        }
    
        tempPassword = tempPassword.split('').sort(() => 0.5 - Math.random()).join('');
    
        setPassword(tempPassword);
    };

    const copyPassword = async () => {
        const copiedText = await navigator.clipboard.readText();
        if (password.length && copiedText !== password) {
            navigator.clipboard.writeText(password);
            toast.success('Le mot de passe est bien copié dans le presse papier', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "fire",
            });
        }
        if (copiedText === password) {
            toast.error('Le mot de passe est déjà copié dans le presse papier', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "fire",
            });
        }
    }

    return (
        <>
            <div className='container'>
                <div className='dark'>
                    <DarkMode />
                </div>
                <h2 className='title'>Générateur de Mot de Passe</h2>
                <div className="password-length">
                    <h3 className='subtitle'>Longueur du Mot de Passe</h3>
                    <div className="slider">
                        <p className="rangeValue">{passwordLength}</p>
                        <div className="range">
                            <input type="range" min={8} max={20} defaultValue={passwordLength} onChange={(event) => setPasswordLength(event.currentTarget.value)} />
                        </div>
                    </div>
                </div>
                
                <div className="setting">
                    <h3 className='subtitle'>Customise ton Mot de Passe</h3>
                    <div className="customize">
                        <div className="checkboxes">
                            <div className="left">
                                <div className="checkbox-field">
                                    <input type="checkbox" name="lower" id="lower" checked={lowerCase} disabled={selectedChoices.length === 1 && selectedChoices.includes("lowercase")} onChange={() => { setLowerCase(!lowerCase); handleCheckbox('lowercase');}} />
                                    <label htmlFor="lower">Minuscules (a-z)</label>
                                </div>
                                <div className="checkbox-field">
                                    <input type="checkbox" name="upper" id="upper" checked={upperCase} disabled={selectedChoices.length === 1 && selectedChoices.includes('uppercase')} onChange={() => { setUpperCase(!upperCase); handleCheckbox('uppercase');}} />
                                    <label htmlFor="upper">Majuscules (A-Z)</label>
                                </div>
                            </div>
                            <div className="right">
                                <div className="checkbox-field">
                                    <input type="checkbox" name="numbers" id="numbers" checked={numbers} disabled={selectedChoices.length === 1 && selectedChoices.includes('numbers')} onChange={() => { setNumbers(!numbers); handleCheckbox('numbers');}} />
                                    <label htmlFor="numbers">Numéros (0-9)</label>
                                </div>
                                <div className="checkbox-field">
                                    <input type="checkbox" name="symbols" id="symbols" checked={symbols} disabled={selectedChoices.length === 1 && selectedChoices.includes('symbols')} onChange={() => { setSymbols(!symbols); handleCheckbox('symbols');}} />
                                    <label htmlFor="symbols">Caractères spéciaux (&-#)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='title2'>Voici votre Mot de Passe</h2>
                <div className="password-wrapper">
                    <div className="password-area">
                        <div className="password">
                            <input type="text" value={password} disabled placeholder='' />
                            <img src={copyIcon} alt="copyicon" className='copyIcon' onClick={copyPassword} />
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="buttons">
                    <button type='button' onClick={generatePassword}>Génerer un autre Mot de Passe</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default PasswordGenerator;