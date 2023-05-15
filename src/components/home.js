import React from 'react';
import '../css/home.css';
import Dice from '../components/dice.js';
import Confetti from 'react-confetti';
import { nanoid } from 'nanoid';

const Home = () => {
    const [dice, setDice] = React.useState(getRandomNo());
    const [tenzis, setTenzis] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzis(true);
        } else {
            setTenzis(false);
        }
    }, [dice]);

    function getRandomNo() {
        const diceRoll = [];
        for (let i = 0; i < 10; i++) {
            diceRoll.push(generateNewDice());
        }
        return diceRoll;
    }

    
    function generateNewDice() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function buttonOnClick() {
        if (tenzis) {
            setTenzis(false)
            setDice(getRandomNo())
        } else {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDice()
            }))
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }));
    }

    const diceElements = dice.map(die => <Dice key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />);
    return (
        <div>
            {tenzis && <Confetti />}
            <div className='bd_contant'>
                <h1 className='title'>Tenzies</h1>
                <h3 className='bd_text'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
                <div className='dice_container'>
                    {diceElements}
                </div>
            </div>
            <div className='bd_action'>
                <button className='btn_roll' onClick={buttonOnClick}>{tenzis ? "NEW GAME" : "ROLL ME"}</button>
            </div>
        </div>
    )
}
export default Home;