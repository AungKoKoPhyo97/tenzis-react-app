import '../css/dice.css'
const Dice = (props) => {
    const btnStyles = {
        backgroundColor: props.isHeld ? "#53E391" : "#fff"
    };
    return (
        <div className='dice_face'
            style={btnStyles}
            onClick={props.holdDice}
        >
            <h2> {props.value} </h2>
        </div>
    )
}
export default Dice;