import React,{useState} from 'react'
import styles from "./Lottery.module.css";
import logomotion from "./looplogo.gif";
import Modal from 'react-modal';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti'
function Lottery() {
    const { width, height } = useWindowSize();
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }; 
    const [showEnd, setShowEnd] = useState(false)
    const [initialPopup, setInitialPopup] = useState(false);
    const [popupValue, setPopupValue] = useState('')
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [showGif, setShowGif] = useState(false);
    const [isCele, setIsCele] = useState(false);
    const [countWon, setCountWon] = useState()
    const startLottery = async(e)=>{
        e.preventDefault();
        const count = 2;
    const newRandomNumbers = [];

    for (let i = 0; i < count; i++) {
        setCountWon(i + 1)
        setIsCele(false)
        setInitialPopup(false)
        setShowGif(true)
        await new Promise((resolve) => setTimeout(resolve, 13000));
        const randomNumber = Math.floor(Math.random() * (parseInt(secondNumber) - parseInt(firstNumber) + 1)) + parseInt(firstNumber);
      newRandomNumbers.push(`shidco - ${randomNumber}`);
      setRandomNumbers([...newRandomNumbers]);
      
      setShowGif(false);
      setPopupValue(randomNumber)
      setIsCele(true)
      setInitialPopup(true)
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
    setIsCele(false)
    setInitialPopup(false)
    setShowGif(false)
    setShowEnd(true)
    //setRandomNumbers(newRandomNumbers);
    
    }
    const resetForm = async(e)=>{
        e.preventDefault();
        setFirstNumber('');
        setSecondNumber('');
    }
  return (
    <div className={styles.mainDivContainer}>
      <Modal
        isOpen={initialPopup}
        onRequestClose={()=>setInitialPopup(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{direction:"rtl"}}>
            <h3> برنده شماره {countWon} </h3>
            <h3> یک عدد صندلی تاشو شیدکو</h3>
            <h4>شماره : {popupValue}</h4>
      </div>
      
      </Modal>
      <Modal
        isOpen={showEnd}
        onRequestClose={()=>setShowEnd(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{direction:"rtl"}}>
            <h2>پایان قرعه کشی</h2>
      </div>
      
      </Modal>
      {isCele && <Confetti
      width={width}
      height={height}
    />}
        <form onSubmit={(e)=>startLottery(e)} className={styles.lotteryFrom}>
        <label>شماره اولین کارت قرعه کشی</label>
        <input type='number' placeholder='شروع' value={firstNumber} onChange={(e)=>setFirstNumber(e.target.value)} />
        <label>شماره آخرین کارت قرعه کشی</label>
        <input type='number' placeholder='پایان' value={secondNumber} onChange={(e)=>setSecondNumber(e.target.value)} />
        <button type='submit'>شروع قرعه کشی</button>
        <button onClick={(e)=>resetForm(e)}>پاک کردن</button>
        </form>
        {showGif && <div className={styles.overlay}>
        <img src={logomotion} alt='Loading' className={styles.gifImage} />
      </div>}
    <div>
        <h3>نتیجه</h3>
        <ul>
        {randomNumbers.length > 0 && randomNumbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default Lottery


