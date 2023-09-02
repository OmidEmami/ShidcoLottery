import React,{useState} from 'react'
import styles from "./Lottery.module.css";
import logomotion from "./looplogo.gif";
import Modal from 'react-modal';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import logo from './logo.png';
import CountUp from 'react-countup';
import ReactAudioPlayer from 'react-audio-player';
import effect from "./effect.mp3"
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
    const [countWon, setCountWon] = useState();
    const [countWinner , setCountWinner] = useState();
    const [timeWinner , setTimeWinner] = useState();
    const [seconderPopup,setSeconderPopup]=useState(false);
    const [tempWinner, setTempWinner] = useState(0);
    const [playMusic, setPlayMusic] = useState(false)
    const startLottery = async(e)=>{
     
        e.preventDefault();
       setPlayMusic(true)
    const newRandomNumbers = [];

    for (let i = 0; i < countWinner; i++) {
      if(timeWinner !== "0"){
        setCountWon(i + 1)
        setSeconderPopup(false)
        setIsCele(false)
        setInitialPopup(false)
       
        await new Promise((resolve) => setTimeout(resolve,  timeWinner*1000));
        const randomNumber = Math.floor(Math.random() * (parseInt(secondNumber) - parseInt(firstNumber) + 1)) + parseInt(firstNumber);
      newRandomNumbers.push(randomNumber);
      
      setTempWinner(randomNumber)
      setSeconderPopup(true);
      await new Promise((resolve) => setTimeout(resolve, 4.5*1000));
      setPopupValue(randomNumber)
      setIsCele(true)
      setInitialPopup(true)
      setRandomNumbers([...newRandomNumbers]);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }else{
      const randomNumber = Math.floor(Math.random() * (parseInt(secondNumber) - parseInt(firstNumber) + 1)) + parseInt(firstNumber);
      newRandomNumbers.push(randomNumber);
      setRandomNumbers([...newRandomNumbers]);
      setIsCele(true)
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    }
    await new Promise((resolve) => setTimeout(resolve, 10000));
    setIsCele(false)
    setInitialPopup(false)
    
    setShowEnd(true)
    setPlayMusic(false)
    
    }
    const resetForm = async(e)=>{
        e.preventDefault();
        setFirstNumber('');
        setSecondNumber('');
    }
  return (
    <>
    <div className={styles.fullContainer}>
      <div className={styles.header}>
      <img src={logo} />
      <h3>کارخانه تجهیزات آموزشی شیدکو</h3>
      <h5>سیستم قرعه کشی هوشمند مبتنی بر هوش مصنوعی</h5>
      </div>
    <div className={styles.mainDivContainer}>
    <div>
      <h2>برندگان</h2>
        <ul>
        {randomNumbers.length > 0 ? randomNumbers.map((number, index) => (
          <li style={{color:"blue"}} key={index}>{number}</li>
        )):<p>منتظر بمانید...</p>}
      </ul>
    </div>
      <div className={styles.formContainer}>
        <form onSubmit={(e)=>startLottery(e)} className={styles.lotteryFrom}>
        <label>شماره اولین کارت قرعه کشی</label>
        <input required type='number' placeholder='شروع' value={firstNumber} onChange={(e)=>setFirstNumber(e.target.value)} />
        <label>شماره آخرین کارت قرعه کشی</label>
        <input required type='number' placeholder='پایان' value={secondNumber} onChange={(e)=>setSecondNumber(e.target.value)} />
        <input required type='number' placeholder='تعداد برنده ها' value={countWinner} onChange={(e)=>setCountWinner(e.target.value)} />
        <input required type='number' placeholder='زمان' value={timeWinner} onChange={(e)=> setTimeWinner(e.target.value)} />
        <button type='submit'>شروع قرعه کشی</button>
        <button onClick={(e)=>resetForm(e)}>پاک کردن</button>
        </form>
        
        </div>
        
        
    </div>
    <Modal
        isOpen={seconderPopup}
        onRequestClose={()=>setSeconderPopup(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
        <CountUp
  start={0}
  end={tempWinner}
  duration={2.75} />
      </div>
      
      </Modal>
      <Modal
        isOpen={initialPopup}
        onRequestClose={()=>setInitialPopup(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{direction:"rtl"}}>
            <h2 style={{color:"#084C7C"}}> برنده شماره {countWon} </h2>
            
            <h1>شماره : {popupValue}</h1>
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
    {playMusic && <ReactAudioPlayer
  src={effect}
  autoPlay
 loop={true}
/>}
    <div style={{display:"flex",justifyContent:"center",marginTop:"5vw", backgroundColor:"#F0F0F0", padding:"2px"}}>طراحی و توسعه در واحد دیجیتال مارکتینگ شیدکو</div>
    </div>
   
    </>
  )
}

export default Lottery


