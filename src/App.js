import React, {useState,useEffect, useRef,useCallback} from 'react'
import io from 'socket.io-client'
import { board, tempBoard2, tempBoard2Copy,threeos, chips, moves, blues, grays,links,tempBoard1,placingArray,placingThreeo, threeoPlacing,threeoPlacingCopy,threeoBlocking,threeoBlockingCopy, bareThreeo, movingThreeos, infiniteThreeo, infiniteThreeoCopy,winning,winningCopy } from './data'
import {BsFilePerson} from 'react-icons/bs'
import {HiStatusOnline} from 'react-icons/hi'
import {AiFillPlayCircle} from 'react-icons/ai'
import {IoReloadCircle} from 'react-icons/io5'


import {FaLongArrowAltLeft, FaLongArrowAltRight,FaBars} from 'react-icons/fa'

import ScrollToBottom from 'react-scroll-to-bottom'


import './App.css';

let initialGame={ 
  masterBoard: board,
  placingCounter:0,
  brownChips:[0,1,2,3,4,5,6,7,8] ,
  yellowChips:[0,1,2,3,4,5,6,7,8],
  isYellowThreeo:false,
  isBrownThreeo:false,
  isYellowTurn:true,
  isBrownTurn:false,
  modal:'',
  earnedYellows:[],
  earnedBrowns:[],
  yellowCounter:0,
  brownCounter:0,
  yellowThreeos:[],
  brownThreeos:[],
  placedYellows:[],
  placedBrowns:[],
  aroundBrowns:[],
  aroundYellows:[],
  yThreeoNumber:[], 
  bThreeoNumber:[],
}

let storageBuilder=[initialGame]



const usePrevious = (value) => {
  let ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}



const socket = io.connect('https://threeo-app.herokuapp.com');

function App() {
  const [connected, setConnected]= useState(false)
  const [gameOnline, setGameOnline]=useState(initialGame)
  const[currentLink, setCurrentLink]=useState('play-online')
  const[connectedRooms, setConnectedRooms]=useState([])
  const[content, setContent]=useState('')
  const [messages, setMessages]=useState([])
  const[players, setPlayers]=useState(0)
  const [playerName, setPlayerName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [online, setOnline] = useState(false)
  const [local, setLocal] = useState(false)
  const [masterBoardOnline, setMasterBoardOnline] = useState(board)
  const [currentGameStorageOnline,setCurrentGameStorageOnline]=useState([])
  const [yourTurnOnline, setYourTurnOnline] =useState('stop')
  const [yellowChipsOnline, setYellowChipsOnline] = useState(chips)
  const [brownChipsOnline, setBrownChipsOnline] = useState(chips)
  const [earnedYellowsOnline, setEarnedYellowsOnline] = useState([])
  const [earnedBrownsOnline, setEarnedBrownsOnline] = useState([])
  const [placingCounterOnline, setPlacingCounterOnline] = useState(0)
  const [brownCounterOnline, setBrownCounterOnline] = useState(0)
  const [yellowCounterOnline, setYellowCounterOnline] = useState(0)
  const [yellowThreeosOnline, setYellowThreeosOnline] = useState([])
  const [brownThreeosOnline, setBrownThreeosOnline] = useState([])
  const [isYellowThreeoOnline, setIsYellowThreeoOnline] = useState(false)
  const [isYellowTurnOnline, setIsYellowTurnOnline] = useState(true)
  const [isBrownTurnOnline, setIsBrownTurnOnline] = useState(false)
  const [isBrownThreeoOnline, setIsBrownThreeoOnline] = useState(false)
  const [placedYellowsOnline, setPlacedYellowsOnline] = useState([])
  const [placedBrownsOnline, setPlacedBrownsOnline] = useState([])
  const [aroundBrownsOnline, setAroundBrownsOnline] = useState([])
  const [aroundYellowsOnline, setAroundYellowsOnline] = useState([])
  const [modalOnline, setModalOnline] = useState('')
  const [navigationCounterOnline, setNavigationCounterOnline]=useState(0)
  const [playerId, setPlayerId] = useState('')
  const [youPlayed, setYouPlayed] = useState('')

  // instructions
  const [counter1, setCounter1] = useState(18)
  const [counter2, setCounter2] = useState(8)
  const [counter3,setCounter3] = useState(15)
  const [counter4, setCounter4]=useState(10)
  const [counter5, setCounter5]=useState(10)
  const [counter6, setCounter6]=useState(8)
  const [counter7, setCounter7]=useState(8)



// ************** LOCAL GAME ******************************





  const startGameLocal = () => {
    setMasterBoardOnline(board)
    socket.emit('start', {game:initialGame,})
  }

  
const placeSound = document.getElementById('place')



  const playPlacingSound = useCallback(()=>{

    if(placeSound){
      placeSound.play()
    }
  },[placeSound])
  
  

const threeoSound = document.getElementById('threeo')

const playThreeoSound=useCallback(()=>{
  threeoSound.play()
},[threeoSound])

const winSound = document.getElementById('win') 
const playWinSound = useCallback(()=>{
  winSound.play()
},[winSound])

const misfired = document.getElementById('misfire')

const playThreeoMisfired =useCallback(()=>{
    misfired.play()
},[misfired])

const capture=document.getElementById('capture')

const playCaptureSound = useCallback(()=>{
    if(capture)
  {
    capture.play()
  }

},[capture])



























  // ***************** ONLINE GAME ************************************


  let prevYellowOnline = usePrevious(yellowCounterOnline)
  let prevBrownOnline = usePrevious(brownCounterOnline)
  let prevMessagesOnline = usePrevious(messages.length)



  const startGameOnline = () => {
    setMasterBoardOnline(board)
    socket.emit('start', {game:initialGame,room: roomName})
  }



  useEffect(()=>{
    socket.on('roomName', data=>{
      setRoomName(data)
    })

    socket.on('firstModal',data=>{
      setModalOnline(data)
    })

    socket.on('gameReady', data=>{
      setModalOnline(data)
    })

    socket.on('connectedRooms', data=>{
      setConnectedRooms(data)
    })
    socket.on('playerName', data=>{
      console.log(data);
      setPlayerName(data)
    })

    socket.on('firstTurn',data=>{
      setYourTurnOnline(data)
    })

    socket.on('playerLeft', data=>{
      setModalOnline(data)
    })

    socket.on('newMessage', data=>{
      setModalOnline(data)
    })

    socket.on('startGame', data=>{
      getInitialGame(data)
    })
    socket.on('endGame',data=>{
      updateGame(data)
    })
    socket.on('yourTurn',data=>{
      setYourTurnOnline(data)
    })
    socket.on('new message', data=>{
  if(data){
    setMessages((prev)=>[...prev,data])
  }
})


    socket.on('game',data=>{
      if(data){

        updateGame(data)
      }
    })
    socket.on('placeLastBrown', data=>{
      updateGame(data)
    })

    socket.on('youPlayed',data=>{
      setYouPlayed(data)
    })




    socket.on('navigateBack', data=>{
            getNavigationGame(data)
    })
        socket.on('navigateForward', data=>{
            getNavigationGame(data)
    })

    socket.on('navigationModal', data=>{
      setModalOnline(data)
    })


  })

const updateGame = async(data)=>{
  const game = await data
  setMasterBoardOnline(game.masterBoard)
  setPlacingCounterOnline(game.placingCounter)


    setBrownChipsOnline(game.brownChips)
 
    setYellowChipsOnline(game.yellowChips)
   setIsYellowThreeoOnline(game.isYellowThreeo)
   setIsBrownThreeoOnline(game.isBrownThreeo)
   setModalOnline(game.modal)
   setIsYellowTurnOnline(game.isYellowTurn)
   setIsBrownTurnOnline(game.isBrownTurn)

   setEarnedYellowsOnline(game.earnedYellows)
   setEarnedBrownsOnline(game.earnedBrowns)
   setYellowCounterOnline(game.yellowCounter)
   setBrownCounterOnline(game.brownCounter)
   setYellowThreeosOnline(game.yellowThreeos)
   setBrownThreeosOnline(game.brownThreeos)
   setPlacedYellowsOnline(game.placedYellows)
   setPlacedBrownsOnline(game.placedBrowns)
   setAroundBrownsOnline(game.aroundBrowns)
   setAroundYellowsOnline(game.aroundYellows)
   storageBuilder.push(game)
   setGameOnline(game)
   }

   const getInitialGame = async(data)=>{
  const game = await data
  setMasterBoardOnline(game.masterBoard)
  setPlacingCounterOnline(game.placingCounter)


    setBrownChipsOnline(game.brownChips)
    setIsYellowTurnOnline(game.isYellowTurn)
   setIsBrownTurnOnline(game.isBrownTurn)

    setYellowChipsOnline(game.yellowChips)
   setIsYellowThreeoOnline(game.isYellowThreeo)
   setIsBrownThreeoOnline(game.isBrownThreeo)
   setModalOnline(game.modal)
   setEarnedYellowsOnline(game.earnedYellows)
   setEarnedBrownsOnline(game.earnedBrowns)
   setYellowCounterOnline(game.yellowCounter)
   setBrownCounterOnline(game.brownCounter)
   setYellowThreeosOnline(game.yellowThreeos)
   setBrownThreeosOnline(game.brownThreeos)
   setPlacedYellowsOnline(game.placedYellows)
   setPlacedBrownsOnline(game.placedBrowns)
   setAroundBrownsOnline(game.aroundBrowns)
   setAroundYellowsOnline(game.aroundYellows)
   storageBuilder=[game]
   setGameOnline(game)
   }


   const getNavigationGame = async(data)=>{
  const game = await data
   setMasterBoardOnline(game.masterBoard)
   setPlacingCounterOnline(game.placingCounter)
   setBrownChipsOnline(game.brownChips) 
   setYellowChipsOnline(game.yellowChips)
   setIsYellowThreeoOnline(game.isYellowThreeo)
   setIsBrownThreeoOnline(game.isBrownThreeo)
   setIsYellowTurnOnline(game.isYellowTurn)
   setIsBrownTurnOnline(game.isBrownTurn)
   setModalOnline(game.modal)
   setEarnedYellowsOnline(game.earnedYellows)
   setEarnedBrownsOnline(game.earnedBrowns)
   setGameOnline(game)
   }

useEffect(()=>{
  if(prevMessagesOnline<messages.length){
      playCaptureSound()
  }
},[prevMessagesOnline,messages,playCaptureSound])

  const getToLocalGame = () => {
    setLocal(true)
    setOnline(false)
  }

  const getToForm = () => {
    setLocal(false)
    setOnline(true)
  }

const goToGame =()=>{
  window.scrollTo(0,0)
}

const startPlacing = () =>{
  setCounter1(-1)
tempBoard1.forEach(item=>{
  item.color=null
  item.border=null
})
}

const startMoving = ()=>{
  setCounter2(-1)
  for(let i=0; i<tempBoard2.length; i++){
    tempBoard2[i]=tempBoard2Copy[i]
  }
}

const startThreeoMoving =()=>{
  setCounter4(-1)
  for(let i=0; i<movingThreeos.length; i++){
    movingThreeos[i]=tempBoard2Copy[i]
  }
}

const startThreeoBlocking =()=>{
    setCounter5(-1)
  for(let i=0; i<threeoBlocking.length; i++){
    threeoBlocking[i]=threeoBlockingCopy[i]
  }

}

const startInfiniteThreeo=()=>{
  setCounter6(-1)
    for(let i=0; i<infiniteThreeo.length; i++){
    infiniteThreeo[i]=infiniteThreeoCopy[i]
  }

}

const startWinnig=()=>{
    setCounter7(-1)
    for(let i=0; i<winning.length; i++){
    winning[i]=winningCopy[i]
  }

}



    const sendMessage = async () => {
    if(content!==''){
      const message = {
        room:roomName,
        player:playerName,
        message:content,
        playerId:playerId,
        time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      }
      setMessages((prev)=>[...prev,message])
      
      await socket.emit('send message', message)
    }
    setContent("");
    setModalOnline('')
  };





   useEffect(()=>{
     if(placingCounterOnline===100){
       playWinSound()
     }
   },[placingCounterOnline,playWinSound])

  useEffect(() => {
    if (prevBrownOnline < brownCounterOnline && !(yellowThreeosOnline.length === placedYellowsOnline.length)) {
setModalOnline('brown threeo') 
    playThreeoSound()
    } else if (prevBrownOnline < brownCounterOnline && (yellowThreeosOnline.length === placedYellowsOnline.length&&navigationCounterOnline===0)) {
      playThreeoMisfired()
      

    }

  }, [brownCounterOnline,gameOnline, navigationCounterOnline, placedYellowsOnline.length, playThreeoMisfired, playThreeoSound, prevBrownOnline, roomName,  yellowThreeosOnline.length])

  useEffect(() => {
    if (prevYellowOnline < yellowCounterOnline && !(brownThreeosOnline.length === placedBrownsOnline.length)) {
      setModalOnline('yellow threeo')
     playThreeoSound()
    } else if (prevYellowOnline < yellowCounterOnline && (brownThreeosOnline.length === placedBrownsOnline.length)) {
      playThreeoMisfired()
      
    }

  }, [yellowCounterOnline, brownThreeosOnline.length, gameOnline, placedBrownsOnline.length, playThreeoMisfired, playThreeoSound, prevYellowOnline,  roomName])



// Instructions Effects


// Placing Chips
useEffect(()=>{
  const interval=setInterval(()=>{
    if(counter1<=placingArray.length-1){
      setCounter1(counter1+1)
    }
  },700)

  return ()=>clearInterval(interval)
},[counter1])

useEffect(()=>{
     if(counter1%2===0){
       tempBoard1[placingArray[counter1]]={id:placingArray[counter1], color:'yellow', border:null}
     }
          if(counter1%2===1){
       tempBoard1[placingArray[counter1]]={id:placingArray[counter1], color:'brown', border:null}
     }

    

},[counter1])



// Moving Chips

useEffect(()=>{
  const interval=setInterval(()=>{
    if(counter2<=8){
      setCounter2(counter2+1)
    }
  },700)

  return ()=>clearInterval(interval)
},[counter2])

useEffect(()=>{
  if(counter2===1){
   tempBoard2[0]={id:0,color:'yellowish', border:null, }
   tempBoard2[78]={id:78, color:null, border:'border', }
  }
  if(counter2===2){
    tempBoard2[78]={id:78, color:'yellow', border:null, }
    tempBoard2[0]={id:0,color:null, border:null, }


  }
    if(counter2===3){
    tempBoard2[82]={id:112,color:'brownish', border:null, }
    tempBoard2[56]={id:86, color:null, border:'border', }
  }
    if(counter2===4){
    tempBoard2[56]={id:86, color:'brown', border:null,}
    tempBoard2[82]={id:112,color:null, border:null, }

  }
  if(counter2===5){
    tempBoard2[168]={id:168,color:'yellowish', border:null, }
    tempBoard2[162]={id:162, color:null, border:'border',}
    tempBoard2[90]={id:90, color:null, border:'border',}

  }
  if(counter2===6){
    tempBoard2[162]={id:162, color:'yellow', border:null, }
    tempBoard2[90]={id:90, color:null, border:null, }
    tempBoard2[168]={id:168,color:null, border:null, }

 
  }
  if(counter2===7){
   tempBoard2[12]={id:86,color:'brownish', border:null,}
    tempBoard2[90]={id:90, color:null, border:'border',}

  }
  if(counter2===8){
    tempBoard2[90]={id:90, color:'brown', border:null,}
    tempBoard2[12]={id:12,color:null, border:null,}

  }


},[counter2])


// Threeos Placing


const div1= document.getElementById(0)
const div2= document.getElementById(140)


// ThreeosMoving

useEffect(()=>{
  const interval=setInterval(()=>{
    if(counter4<=10){
      setCounter4(counter4+1)
    }
  },700)

  return ()=>clearInterval(interval)
},[counter4])

useEffect(()=>{
  if(counter4===1){
   movingThreeos[60]={id:0,color:'yellowish', border:null, }
   movingThreeos[86]={id:86, color:null, border:'border', }
  }
  if(counter4===2){
    movingThreeos[86]={id:86, color:'yellow', border:null, }
    movingThreeos[60]={id:0,color:null, border:null, }

  }
    if(counter4===3){
    movingThreeos[156]={id:156,color:'brownish', border:null, }
    movingThreeos[78]={id:78, color:null, border:'border', }
  }
    if(counter4===4){
    movingThreeos[78]={id:78, color:'brown', border:null, }
    movingThreeos[156]={id:156,color:null, border:null, }

  }
  if(counter4===5){
    movingThreeos[6]={id:6,color:null, border:null, }

  }
  if(counter4===6){
    movingThreeos[86]={id:162, color:'yellowish', border:null, }
    movingThreeos[112]={id:112, color:null, border:'border', }

 
  }
  if(counter4===7){
    movingThreeos[112]={id:112, color:'yellow', border:null, }
    movingThreeos[86]={id:162, color:null, border:null, }

  }
    if(counter4===8){
    movingThreeos[136]={id:136, color:null, border:null, }

  }


},[counter4])



// BlockingThreeo

useEffect(()=>{
  const interval=setInterval(()=>{
    if(counter5<=10){
      setCounter5(counter5+1)
    }
  },700)

  return ()=>clearInterval(interval)
},[counter5])

useEffect(()=>{
  if(counter5===1){
   threeoBlocking[136]={id:0,color:'yellowish', border:null, }
   threeoBlocking[110]={id:0,color:null, border:'border', }
  }
  if(counter5===2){
    threeoBlocking[110]={id:110, color:'yellow', border:null, }
    threeoBlocking[136]={id:0,color:null, border:null, }
  }
    if(counter5===3){
    threeoBlocking[162]={id:162,color:'brownish', border:null, }
    threeoBlocking[136]={id:136, color:null, border:'border', }
  }
    if(counter5===4){
    threeoBlocking[136]={id:136, color:'brown', border:null}
       threeoBlocking[162]={id:162,color:null, border:null, }

  }
  if(counter5===5){
    threeoBlocking[0]={id:0, color:'yellowish', border:null, }
    threeoBlocking[78]={id:78, color:null, border:'border', }
  }
  if(counter5===6){
    threeoBlocking[0]={id:0, color:null, border:null, }
    threeoBlocking[78]={id:78, color:'yellow', border:null, }
  }

  if(counter5===7){
    threeoBlocking[32]={id:32,color:'brownish', border:null, }
    threeoBlocking[58]={id:58,color:null, border:'border', }

  }
  if(counter5===8){
    threeoBlocking[58]={id:58, color:'brown', border:null, }
    threeoBlocking[32]={id:32,color:null, border:null, }
  }
  if(counter5===9){
    threeoBlocking[6]={id:6, color:'yellowish', border:null, }
    threeoBlocking[32]={id:32, color:null, border:'border', }
  }
    if(counter5===10){
    threeoBlocking[32]={id:32, color:'yellow', border:null, }
    threeoBlocking[6]={id:6, color:null, border:null, }
  }


},[counter5])

// InfiniteThreeo

useEffect(()=>{
  const interval=setInterval(()=>{
    if(counter6<=8){
      setCounter6(counter6+1)
    }
  },700)

  return ()=>clearInterval(interval)
},[counter6])

useEffect(()=>{
  if(counter6===1){
   infiniteThreeo[140]={id:140,color:'yellowish', border:null, }
   infiniteThreeo[88]={id:88,color:null, border:'border', }
  }
  if(counter6===2){
    infiniteThreeo[88]={id:88, color:'yellow', border:null}
   infiniteThreeo[140]={id:140,color:null, border:null, }

  }
    if(counter6===3){
    infiniteThreeo[6]={id:6,color:'brownish', border:null,}
    infiniteThreeo[32]={id:32, color:null, border:'border',}
  }
    if(counter6===4){
    infiniteThreeo[32]={id:32, color:'brown', border:null, }
    infiniteThreeo[6]={id:6,color:null, border:null,}

  }
  if(counter6===5){
    infiniteThreeo[88]={id:88,color:'yellowish', border:null, }
    infiniteThreeo[140]={id:140,color:null, border:'border', }

  }
  if(counter6===6){
    infiniteThreeo[140]={id:140, color:'yellow', border:null,}
    infiniteThreeo[88]={id:88,color:null, border:null, }
  }
  if(counter6===7){
    infiniteThreeo[32]={id:32, color:'brownish', border:null, }
    infiniteThreeo[6]={id:6, color:null, border:'border', }
  }
    if(counter6===8){
    infiniteThreeo[6]={id:6, color:'brown', border:null, }
        infiniteThreeo[32]={id:32, color:null, border:null, }

   

  }


},[counter6,])


// Winning

useEffect(()=>{
  const interval=setInterval(()=>{
    if(counter7<=8){
      setCounter7(counter7+1)
    }
  },700)

  return ()=>clearInterval(interval)
},[counter7])

useEffect(()=>{
  if(counter7===1){
   winning[88]={id:88,color:'yellowish', border:null, }
   winning[140]={id:140,color:null, border:'border', }
  }
  if(counter7===2){
    winning[140]={id:140, color:'yellow', border:null, }
   winning[88]={id:88,color:null, border:null, }

  }
    if(counter7===3){
    winning[132]={id:132,color:'brownish', border:null, }
    winning[136]={id:136, color:null, border:'border', }
  }
    if(counter7===4){
    winning[136]={id:136, color:'brown', border:null, }
    winning[132]={id:132,color:null, border:null, }

  }
  if(counter7===5){
    winning[140]={id:140,color:'yellowish', border:null, }
    winning[88]={id:88,color:null, border:'border', }
  }
  if(counter7===6){
    winning[88]={id:88, color:'yellow', border:null, }
    winning[140]={id:140,color:null, border:null, }



 
  }
  if(counter7===7){
    winning[136]={id:136, color:'brownish', border:null, }
    winning[140]={id:140, color:null, border:'border',}

  }
    if(counter7===8){
    winning[140]={id:140, color:'brown', border:null, }
       winning[136]={id:136, color:null, border:null, }


  }


},[counter7,])




  // HandleClickOnline


const handleClickOnline = (e) => {
    const spot = e.currentTarget
    const id = Number(e.target.id)


if(navigationCounterOnline===0){      
setCurrentGameStorageOnline([...new Set(storageBuilder)].filter((item)=>!(item.brownChips.length===0&&item.placingCounter===1)).filter((item)=>!(item.brownChips.length===0&&item.placingCounter===3))) 
}
if (spot.classList.contains('leftOnline')) {
  let storage=[...new Set(currentGameStorageOnline)]
        if(storage.length-1-navigationCounterOnline<0){
        return
      }else{
        setNavigationCounterOnline(navigationCounterOnline+1)
        let pointer = storage.length-1-navigationCounterOnline
        if(pointer===-1){
          return
        }else{

          let back = storage[pointer]
      if(back){
        if(connected&&!local){
          if(youPlayed==='first'&&((back.placingCounter%2===0&&back.brownChips.length!==0)||(back.placingCounter===0&&back.brownChips.length===0))){
            setYourTurnOnline(true)
            socket.emit('navigateBack',{back:back, game:gameOnline, room: roomName, yourTurn:false,})
          }

            if(youPlayed==='first'&&((back.placingCounter%2!==0&&back.brownChips.length!==0)||(back.placingCounter===2&&back.brownChips.length===0))){
            setYourTurnOnline(false)
            socket.emit('navigateBack',{back:back, game:gameOnline, room: roomName, yourTurn:true})
          }

            if(youPlayed==='second'&&((back.placingCounter%2!==0&&back.brownChips.length!==0)||(back.placingCounter===2&&back.brownChips.length===0))){
            setYourTurnOnline(true)
            socket.emit('navigateBack',{back:back, game:gameOnline, room: roomName, yourTurn:false,})
          }
            if(youPlayed==='second'&&((back.placingCounter%2===0&&back.brownChips.length!==0)||(back.placingCounter===0&&back.brownChips.length===0))){
            setYourTurnOnline(false)
            socket.emit('navigateBack',{back:back, game:gameOnline, room: roomName, yourTurn:true,})
          }



        }
        if(local&&!connected){
        socket.emit('navigateBack',{back:back, game:gameOnline, })

        }
      }
      }
        
       
      }

}
    

    if (spot.classList.contains('rightOnline')) {

  let storage=[...new Set(currentGameStorageOnline)]
      if(navigationCounterOnline===-1){
        return
      }else{
        setNavigationCounterOnline(navigationCounterOnline-1)
        let index = storage.length+1-navigationCounterOnline
        if(index===storageBuilder.length){
          return
        }else{

          let forward = currentGameStorageOnline[index]


          if(forward){
            if(connected&&!local){
            if(youPlayed==='first'&&((forward.placingCounter%2===0&&forward.brownChips.length!==0)||(forward.placingCounter===0&&forward.brownChips.length===0))){
            setYourTurnOnline(true)
            socket.emit('navigateForward',{forward:forward, game:gameOnline, room: roomName, yourTurn:false,})
          }

            if(youPlayed==='first'&&((forward.placingCounter%2!==0&&forward.brownChips.length!==0)||(forward.placingCounter===2&&forward.brownChips.length===0))){
            setYourTurnOnline(false)
            socket.emit('navigateForward',{forward:forward, game:gameOnline, room: roomName, yourTurn:true})
          }

            if(youPlayed==='second'&&((forward.placingCounter%2!==0&&forward.brownChips.length!==0)||(forward.placingCounter===2&&forward.brownChips.length===0))){
            setYourTurnOnline(true)
            socket.emit('navigateForward',{forward:forward, game:gameOnline, room: roomName, yourTurn:false,})
          }
            if(youPlayed==='second'&&((forward.placingCounter%2===0&&forward.brownChips.length!==0)||(forward.placingCounter===0&&forward.brownChips.length===0))){
            setYourTurnOnline(false)
            socket.emit('navigateForward',{forward:forward, game:gameOnline, room: roomName, yourTurn:true,})
          }
        }
      if(local&&!connected){
      socket.emit('navigateForward',{forward:forward, game:gameOnline, })

      }

      }

        }
  }
 }





    if (spot.firstChild) {
      return
    }
    if (brownChipsOnline.length !== 0 && !isYellowThreeoOnline && !isBrownThreeoOnline && spot.classList.contains('yellow')) {
      return
    }
    if (brownChipsOnline.length !== 0 && !isYellowThreeoOnline && !isBrownThreeoOnline && spot.classList.contains('brown')) {
      return
    }

    if (brownChipsOnline.length !== 0 && !isYellowThreeoOnline && !isBrownThreeoOnline && placingCounterOnline % 2 === 0) {
     if(yourTurnOnline&&connected&&!local){

       socket.emit('placeYellow', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('placeYellow', {id:id, game:gameOnline,})

     }else{
       return
     }
      playPlacingSound()
    }


    if (brownChipsOnline.length !== 0 && !isYellowThreeoOnline && !isBrownThreeoOnline && placingCounterOnline % 2 !== 0) {


     if(yourTurnOnline&&connected&&!local){

       socket.emit('placeBrown', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('placeBrown', {id:id, game:gameOnline,})

     }else{
       return
     }
    playPlacingSound()



    }


    if (brownChipsOnline.length !== 0 && isYellowThreeoOnline && !isBrownThreeoOnline && placingCounterOnline % 2 === 0) {
      if (spot.classList.contains('yellow')) {
        return;
      } else if (spot.classList.contains(null) && (brownThreeosOnline.length !== placedBrownsOnline.length)) {
        return
      } else if (brownThreeosOnline.indexOf(id) !== -1) {
        return
      }
      else {
        if(yourTurnOnline&&connected&&!local){

       socket.emit('captureBrownPlacing', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('captureBrownPlacing', {id:id, game:gameOnline,})

     }else{
       return
     }
    }
        playCaptureSound()
      
    }
    if (brownChipsOnline.length !== 0 && !isYellowThreeoOnline && isBrownThreeoOnline && placingCounterOnline % 2 !== 0) {
      if (spot.classList.contains('brown')) {
        return;
      } else if (spot.classList.contains(null) && yellowThreeosOnline.length !== placedYellowsOnline.length) {
        return
      }
      else if (yellowThreeosOnline.indexOf(id) !== -1) {
        return
      }
      else      if(yourTurnOnline&&connected&&!local){

       socket.emit('captureYellowPlacing', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('captureYellowPlacing', {id:id, game:gameOnline,})

     }else{
       return
     }
        playCaptureSound()
    }

        if (brownChipsOnline.length === 0 && !isYellowThreeoOnline && isBrownThreeoOnline && placingCounterOnline === 17) {
      if (spot.classList.contains('brown')) {
        return;
      } else if (spot.classList.contains(null) && yellowThreeosOnline.length !== placedYellowsOnline.length) {
        return
      }
      else if (yellowThreeosOnline.indexOf(id) !== -1) {
        return
      }
      else if (spot.classList.contains(null) && yellowThreeosOnline.length === placedYellowsOnline.length) {
      if(yourTurnOnline&&connected&&!local){

       socket.emit('lastPlaceYellowAfterBrownThreeoMisfirePlacing', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('placeYellow', {id:id, game:gameOnline,})

     }else{
       return
     }


        playPlacingSound()

      }
      else {

      if(yourTurnOnline&&connected&&!local){

       socket.emit('lastYellowCapturePlacing', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('lastYellowCapturePlacing', {id:id, game:gameOnline,})

     }else{
       return
     }

        playCaptureSound()
      }
    }

        if (brownChipsOnline.length !== 0 && !isYellowThreeoOnline && !isBrownThreeoOnline && placingCounterOnline ===17) {

        if(yourTurnOnline&&connected&&!local){

       socket.emit('placeLastBrown', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('placeLastBrown', {id:id, game:gameOnline,})

     }else{
       return
     }

    playPlacingSound()



    }



    // ***** MOVES *******


    if (brownChipsOnline.length === 0 && !isYellowThreeoOnline && placingCounterOnline === 0) {
      if (aroundYellowsOnline.length === 0) {
        setPlacingCounterOnline(100)

        return
      } else if (placingCounterOnline === 100 && earnedBrownsOnline.length === 7) {
        setModalOnline('Yellows win! Click start to play again')
              playWinSound()

        return
      } else


        if (spot.classList.contains('brown')) {
          return
        } else if (spot.classList.contains(null)) {
          return
        } else {
      if(yourTurnOnline&&connected&&!local){

       socket.emit('pickupYellowMoving', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('pickupYellowMoving', {id:id, game:gameOnline,})

     }else{
       return
     }

        }
       
    }
    if (brownChipsOnline.length === 0 && placingCounterOnline === 1 && !isYellowThreeoOnline) {
      if (spot.classList.contains('yellow')) {
        return
      } else
        if (spot.classList.contains('brown')) {
          return
        }
        else if (!spot.parentElement.classList.contains('border')) {
          return
        }
        else {
          const element = masterBoardOnline.find(item=>item.mark==='mark')
          const prevId=element.id
        if(yourTurnOnline&&connected&&!local){

       socket.emit('placeYellowMoving', {id:id,prevId:prevId, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('placeYellowMoving', {id:id,prevId:prevId, game:gameOnline,})

     }else{
       return
     }

          playPlacingSound()

        }

    }
    if (brownChipsOnline.length === 0 && placingCounterOnline === 1 && isYellowThreeoOnline) {
      if (spot.classList.contains('yellow')) {
        return;
      } else if (spot.classList.contains(null) && (brownThreeosOnline.length !== placedBrownsOnline.length)) {
        return
      } else if (brownThreeosOnline.indexOf(id) !== -1) {
        return
      }
      else if (spot.classList.contains(null) && brownThreeosOnline.length === placedBrownsOnline.length) {
      }

      else {
      if(yourTurnOnline&&connected&&!local){

       socket.emit('captureBrownMoving', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('captureBrownMoving', {id:id, game:gameOnline,})

     }else{
       return
     }

        playCaptureSound()
      }
    }

    if (brownChipsOnline.length === 0 && !isBrownThreeoOnline && placingCounterOnline === 2) {
      if (placingCounterOnline === 100) {
        return
      } else

        if (spot.classList.contains('yellow')) {
          return
        } else if (spot.classList.contains(null)) {
          return
        } else {

      if(yourTurnOnline&&connected&&!local){

       socket.emit('pickupBrownMoving', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('pickupBrownMoving', {id:id, game:gameOnline,})

     }else{
       return
     }



        }
      
      }
    if (brownChipsOnline.length === 0 && placingCounterOnline === 3 && !isBrownThreeoOnline) {
      if (spot.classList.contains('yellow')) {
        return
      } else
        if (spot.classList.contains('brown')) {
          return
        }
        else if (!spot.parentElement.classList.contains('border')) {
          return
        }
        else {
       const element = masterBoardOnline.find(item=>item.mark==='mark')
          const prevId=element.id

      if(yourTurnOnline&&connected&&!local){

       socket.emit('placeBrownMoving', {id:id, prevId:prevId,room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('placeBrownMoving', {id:id,prevId:prevId ,game:gameOnline,})

     }else{
       return
     }


          playPlacingSound()

        }
    }

    if (brownChipsOnline.length === 0 && placingCounterOnline === 3 && isBrownThreeoOnline) {
      if (spot.classList.contains('brown')) {
        return;
      } else if (spot.classList.contains(null) && (yellowThreeosOnline.length !== placedYellowsOnline.length)) {
        return
      } else if (yellowThreeosOnline.indexOf(id) !== -1) {
        return
      }
      else if (spot.classList.contains(null) && yellowThreeosOnline.length === placedYellowsOnline.length) {
       
      }

      else {
      if(yourTurnOnline&&connected&&!local){

       socket.emit('captureYellowMoving', {id:id, room:roomName, game:gameOnline, yourTurn:true})
     }else if(local&&!connected){
       socket.emit('captureYellowMoving', {id:id, game:gameOnline,})

     }else{
       return
     }

        playCaptureSound()
      }
    }


    if(!spot.classList.contains('chip-game')){
      setNavigationCounterOnline(0)
      setModalOnline('')
    }
  






// Local section/////////////////////////////////////////////






  }


  return (
<div className="App">
<Navbar setLocal={setLocal} setOnline={setOnline} setConnected={setConnected} online={online} local={local} connected={connected}/>
<Home
getToForm={getToForm} 
getToLocalGame={getToLocalGame}
sendMessage={sendMessage}
online={online}
local={local}
setOnline={setOnline} 
setLocal={setLocal}
connected={connected}
setConnected={setConnected}
  socket={socket}
  connectedRooms={connectedRooms}
  roomName={roomName}
   content={content}
   setContent={setContent}
   messages={messages}
   setMessages = {setMessages}
   players={players}
   setPlayers={setPlayers}
   playerName={playerName}
   setPlayerName={setPlayerName}
   setRoomName={setRoomName} 
   yourTurnOnline={yourTurnOnline}
   handleClickOnline={handleClickOnline}
   startGameOnline={startGameOnline}
   masterBoardOnline={masterBoardOnline} 
   setMasterBoardOnline={setMasterBoardOnline} 
   currentGameStorageOnline={currentGameStorageOnline}setCurrentGameStorageOnline={setCurrentGameStorageOnline}
   yellowChipsOnline={yellowChipsOnline}
   brownChipsOnline={brownChipsOnline} 
   earnedYellowsOnline={earnedYellowsOnline} 
   earnedBrownsOnline={earnedBrownsOnline}
   placingCounterOnline={placingCounterOnline}
   isYellowThreeoOnline={isYellowThreeoOnline}
   isBrownThreeoOnline={isBrownThreeoOnline}
   modalOnline={modalOnline}
   setModalOnline={setModalOnline}
   currentLink={currentLink} 
   setCurrentLink={setCurrentLink}
   startGameLocal={startGameLocal}
   isYellowTurnOnline={isYellowTurnOnline} 
   setIsYellowTurnOnline={setIsYellowTurnOnline} 
   isBrownTurnOnline={isBrownTurnOnline}
   setIsBrownTurnOnline={setIsBrownTurnOnline}
   goToGame={goToGame}


/>
<Overview goToGame={goToGame} local={local} online={online} connected={connected} />
<Instructions goToGame={goToGame} local={local} online={online} connected={connected}/>
<PlacingChips goToGame={goToGame} counter1={counter1} startPlacing={startPlacing} local={local} online={online} connected={connected}/>
<MovingChips goToGame={goToGame} counter2={counter2} startMoving={startMoving} local={local} online={online} connected={connected}/>
<ThreeoPlacing goToGame={goToGame} counter3={counter3} div1={div1} div2={div2} setCounter3={setCounter3} local={local} online={online} connected={connected}/>  
<ThreeosMoving counter4={counter4} goToGame={goToGame} startThreeoMoving={startThreeoMoving} local={local} online={online} connected={connected}/>  
<BlockingThreeo goToGame={goToGame} counter5={counter5} startThreeoBlocking={startThreeoBlocking} local={local} online={online} connected={connected}/>
<InfiniteThreeos counter6={counter6} goToGame={goToGame} startInfiniteThreeo={startInfiniteThreeo} local={local} online={online} connected={connected}/>
<Winning counter7={counter7} goToGame={goToGame} startWinning={startWinnig} local={local} online={online} connected={connected}/>
    </div>
  );
}
export default App;

const Navbar = ({setOnline,setLocal, setConnected, online, local, connected}) => {


  const[showLinks,setShowLinks]=useState(false)
  const linksContainerRef= useRef(null)
  const linksRef= useRef(null)

  const goHome = () => {
    setConnected(false)
    setLocal(false)
    setOnline(false)
  }

  useEffect(()=>{
    const linksHeight= linksRef.current.getBoundingClientRect().height
    if(showLinks){
      linksContainerRef.current.style.height=`${linksHeight}px`
    }else{
      linksContainerRef.current.style.height=`0px`
    }
  },[showLinks])
  return (
  <nav id={local&&!online&&!connected?'play-local':online&&!local&&!connected?'form':online&&connected&&!local?'play-online':!local&&!online&&!connected?'home':'home'}>
    <div className="nav-center">
      <div className="nav-header">
   <h1 className="logo">Three<span>O</span></h1>
        <button className="nav-toggle" onClick={()=>setShowLinks(!showLinks)}>
        <FaBars/>
      </button>

      </div>
  <div className='links-container' ref={linksContainerRef}>
        <ul className="links" ref={linksRef}>
          <li>
            <a href='#home' onClick={goHome}>Home</a>
          </li>
          <li>
            <a href="#overview">Overview</a>
          </li>

          <li>
            <a href="#instructions">Instructions</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
    )
}


const Home = ({online,local,connected, setConnected,playerName,setPlayerName, roomName, setRoomName, credentials, currentLink,  
   startGameLocal,
   isYellowTurnOnline,
   isBrownTurnOnline,
     messages,
  setMessages,
  players,
  setPlayers,
  masterBoardOnline,
  modalOnline,
  yellowChipsOnline,
  brownChipsOnline,
  earnedBrownsOnline,
  earnedYellowsOnline,
  content,
  setContent,
  yourTurnOnline,
  isYellowThreeoOnline,
  isBrownThreeoOnline,
  connectedRooms,
  handleClickOnline,
  startGameOnline,
  placingCounterOnline,
  setModalOnline,
  sendMessage,
getToLocalGame,
getToForm,
goToGame,
}) => {
  return (
  <>
  {!online&&!local&&!connected&&<div className="first-view">
  <FirstView getToForm={getToForm} getToLocalGame={getToLocalGame}/>
  </div>}
  {!connected&&!local&&online&&<div >
  <Form
  socket={socket}
  playerName={playerName}
  setPlayerName={setPlayerName}
  roomName={roomName}
  setRoomName={setRoomName}
  credentials={credentials}
  currentLink={currentLink}
  setConnected={setConnected}
  />
  </div>}
  {local&&!online&&!connected&&<div>
  <PlayLocal 
    handleClickOnline={handleClickOnline}
    startGameLocal={startGameLocal}
    masterBoardOnline={masterBoardOnline}
    modalOnline={modalOnline}
    yellowChipsOnline={yellowChipsOnline}
    brownChipsOnline={brownChipsOnline}
    earnedBrownsOnline={earnedBrownsOnline}
    earnedYellowsOnline={earnedYellowsOnline}
    isBrownThreeoOnline={isBrownThreeoOnline}
    isYellowThreeoOnline={isYellowThreeoOnline}
    isBrownTurnOnline={isBrownTurnOnline}
    isYellowTurnOnline={isYellowTurnOnline}
    placingCounterOnline={placingCounterOnline}
    />
  </div>}

  {!local&&online&&connected&&<div>
  {connected&&online&&!local&&<div> 
  <PlayOnline
  sendMessage={sendMessage}
  messages={messages}
  setMessages={setMessages}
  players={players}
  setPlayers={setPlayers}
  masterBoardOnline={masterBoardOnline}
  modalOnline={modalOnline}
  yellowChipsOnline={yellowChipsOnline}
  brownChipsOnline={brownChipsOnline}
  earnedBrownsOnline={earnedBrownsOnline}
  earnedYellowsOnline={earnedYellowsOnline}
  content={content}
  setContent={setContent}
  yourTurnOnline={yourTurnOnline}
  isYellowThreeoOnline={isYellowThreeoOnline}
  isBrownThreeoOnline={isBrownThreeoOnline}
  connectedRooms={connectedRooms}
  handleClickOnline={handleClickOnline}
  startGameOnline={startGameOnline}
  placingCounterOnline={placingCounterOnline}
  setModalOnline={setModalOnline}
  playerName={playerName}
  goToGame={goToGame}

  />
  </div>  }
  </div>}
  </>
  )
}

const FirstView = ({getToLocalGame, getToForm}) => {


 return (
  <div className="home">
  <h4 className="select-options">Select Game mode below</h4>
  

  <div className="game-options">
    <a href="#play-local" data-tool-tip="Play Locally" className="play-local-control"  onClick={getToLocalGame}>
     <BsFilePerson className="person"/>
     <BsFilePerson className="person"/>
    </a>
   
    <a data-tool-tip="Play Online" className="play-online-control" href="#form" onClick={getToForm}>
     <BsFilePerson className="person-online"/>
     <HiStatusOnline className="wifi"/>
    </a>
  
  </div>

  <div className="strip"></div>
  </div>
 )
}


const Form = ({socket,setPlayerName, roomName, playerName,setRoomName,credentials,currentLink, setConnected}) => {

  const joinGame = async ()=>{
    
  if(playerName!==''&&roomName!==''){
    setConnected(true)

await socket.emit('join room', {room:roomName, player:playerName})
  }
 
}


  return (
    <div className="joinOuterContainer">
              <h1 className="heading">{credentials}</h1>

      <div className="joinInnerContainer">
        <h1 className="heading">Join Game</h1>

        <div>
        <input placeholder="Name" className="joinInput" type="text" value={playerName} onChange={(event) => setPlayerName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" value={roomName} onChange={(event) => setRoomName(event.target.value)} />
        </div>
       
        <a href='#play-online' className={'button-form mt-20'} type="submit" onClick={joinGame} to={`/${currentLink}`}>Join</a>

      </div>
    </div>
  );
}

const PlayLocal = ({  
   handleClickOnline,
   startGameLocal,
   masterBoardOnline,
   modalOnline,
   yellowChipsOnline,
   brownChipsOnline,
   earnedYellowsOnline,
   earnedBrownsOnline,
   isYellowThreeoOnline, 
   isBrownThreeoOnline,
   isYellowTurnOnline,
   isBrownTurnOnline,

}) => {
 return (
  <div className="play-local">
   <LocalPlayingSide handleClickOnline={handleClickOnline}
   startGameLocal={startGameLocal}
   masterBoardOnline={masterBoardOnline}
/>
   <LocalInfoSide    
   modalOnline={modalOnline}
   yellowChipsOnline={yellowChipsOnline}
   brownChipsOnline={brownChipsOnline}
   earnedYellowsOnline={ earnedYellowsOnline} 
   earnedBrownsOnline={earnedBrownsOnline}
   isYellowThreeoOnline={isYellowThreeoOnline} 
   isBrownThreeoOnline={isBrownThreeoOnline}
   isYellowTurnOnline={isYellowTurnOnline} 
   isBrownTurnOnline={isBrownTurnOnline}



/>
  </div>
 )
}

const LocalPlayingSide = ({masterBoardOnline, handleClickOnline, startGameLocal}) => {
 return (
  <div className="local-playing-side">
   <LocalBoard className="board-local-playing" masterBoardOnline={masterBoardOnline} handleClickOnline={handleClickOnline}/>
   <LocalControls className="controls-local-playing" handleClickOnline={handleClickOnline} startGameLocal={startGameLocal}/>
  </div>
 )
}


const LocalBoard = ({masterBoardOnline, handleClickOnline}) => {
  const [placeAudio, ] = useState('https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3')

  const [threeoAudio,]=useState('https://assets.mixkit.co/sfx/download/mixkit-bike-ring-bell-1604.wav')

  const [winAudio, ]=useState('https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3')

  const [threeoMisfire, ] = useState('https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3')

  const [captureAudio, ] = useState('https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3')






 return (

  <div className="main-local">
          <audio src={placeAudio} id='place'/>
          <audio src={threeoAudio} id='threeo'/>
          <audio src={winAudio} id='win'/>
          <audio src={threeoMisfire} id='misfire'/>
          <audio src={captureAudio} id='capture'/>

   <div className="board-local">
   {board.map((spot,index)=>{
    if(blues.indexOf(spot.id)!==-1&&grays.indexOf(spot.id)===-1){
     return (
      <div key={index} className={`blue ${masterBoardOnline[spot.id].border} `} >
       <div className={`chip-game ${masterBoardOnline[spot.id].color}`} id={spot.id} onClick={(e)=>handleClickOnline(e)}></div>
      </div>
     )
    }else if(grays.indexOf(spot.id)!==-1&&blues.indexOf(spot.id)===-1){
     return (
      <div key={index} className='gray'></div>
     )
    }else{
     return(
      <div key={index} className='red'></div>
     )

    }
    
   })}
</div>

  </div>


 )

}

const LocalControls = ({handleClickOnline,startGameLocal}) => {
 return (

<div className="controls-local">
 <FaLongArrowAltLeft className="leftOnline button" onClick={(e)=>handleClickOnline(e)}/>
 <div className="start-button" onClick={startGameLocal}>START</div>
 <FaLongArrowAltRight className="rightOnline button" onClick={(e)=>handleClickOnline(e)}/>
</div>

  
 )
}

const LocalInfoSide = ({   
   modalOnline,
   yellowChipsOnline,
   brownChipsOnline,
   earnedYellowsOnline,
   earnedBrownsOnline,
   isYellowThreeoOnline, 
   isBrownThreeoOnline,
   isYellowTurnOnline,
   isBrownTurnOnline,
}) => {
 return (
  <div className="local-info-side">
   <LocalTurn
   brownChipsOnline={brownChipsOnline}
   isYellowThreeoOnline={isYellowThreeoOnline} 
   isBrownThreeoOnline={isBrownThreeoOnline}
   isYellowTurnOnline={isYellowTurnOnline} 
   isBrownTurnOnline={isBrownTurnOnline}

   />
   <LocalCapture
    isYellowThreeoOnline={isYellowThreeoOnline} 
   isBrownThreeoOnline={isBrownThreeoOnline}

   />
   <LocalModal
   modalOnline={modalOnline}

   />
   <LocalYellowChips
     yellowChipsOnline={yellowChipsOnline}
   />
   <LocalEarnedBrowns
    earnedBrownsOnline={earnedBrownsOnline}
   />
   <LocalBrownChips
    brownChipsOnline={brownChipsOnline}
   />
   <LocalEarnedYellows
    earnedYellowsOnline={ earnedYellowsOnline}
   />
  </div>
 )
}


const LocalTurn = ({isYellowTurnOnline, isBrownTurnOnline, brownChipsOnline, isYellowThreeoOnline, isBrownThreeoOnline}) => {
 return (
  <div className="turn">
   {isYellowTurnOnline&&brownChipsOnline.length===0&&!isYellowThreeoOnline&&(<h2 className="turn-local">Yellows turn to move</h2>)}
   {isYellowTurnOnline&&brownChipsOnline.length!==0&&!isYellowThreeoOnline&&(<h2 className="turn-local">Yellows turn to place</h2>)}
   {isBrownTurnOnline&&brownChipsOnline.length===0&&!isBrownThreeoOnline&&(<h2 className="turn-local">Browns turn to move</h2>)}
   {isBrownTurnOnline&&brownChipsOnline.length!==0&&!isBrownThreeoOnline&&(<h2 className="turn-local">Browns turn to place</h2>)}
   {isYellowThreeoOnline&&<h2 className="turn-local">Yellows turn to capture</h2>}
   {isBrownThreeoOnline&&<h2 className="turn-local">Browns turn to capture</h2>}

  </div>
 )
}

const LocalCapture = ({isYellowThreeoOnline, isBrownThreeoOnline}) => {
 return (
  <div className="capture">
   {isYellowThreeoOnline&&<h6 className="capture-local">Click & capture a non-threeo brown</h6>}
   {isBrownThreeoOnline&&<h6 className="capture-local">Click & capture a non-threeo yellow</h6>}

  </div>
 )
}


const LocalModal = ({modalOnline}) => {
 return (
  <div className="modal">
   {modalOnline&&<h4 className="modal-local">{modalOnline}</h4>}
  </div>
 )
}


const LocalYellowChips = ({yellowChipsOnline}) => {
 return (
   <div className="yellow-local">
   <h5>yellow Chips</h5>
   {yellowChipsOnline&&<div className="yellow-grid-local">
     
     {yellowChipsOnline.map((chip,index)=>{
       return (
         <div key = {index} className="yellow-container-local">
           <div className="yellow-token-local"></div>
         </div>
       )
     })}
   </div>}
   </div>
 )
}


const LocalEarnedBrowns = ({earnedBrownsOnline}) => {
 return (
   <div className="brown-local">
   <h5>earned browns</h5>
  {earnedBrownsOnline&&<div className="brown-grid-local">
     
     {earnedBrownsOnline.map((chip,index)=>{
       return (
         <div key = {index} className="brown-container-local">
           <div className="brown-token-local"></div>
         </div>
       )
     })}
   </div>}
   </div>
 )
}


const LocalBrownChips = ({brownChipsOnline}) => {
 return (
   <div className="brown-local">
   <h5>brown chips</h5>
   {brownChipsOnline&&<div className="brown-grid-local">
     
     {brownChipsOnline.map((chip,index)=>{
       return (
         <div key = {index} className="brown-container-local">
           <div className="brown-token-local"></div>
         </div>
       )
     })}
   </div>}
   </div>
 )
}

const LocalEarnedYellows = ({earnedYellowsOnline}) => {
 return (
   <div className="yellow-local">
   <h5>Earned Yellows</h5>
   {earnedYellowsOnline&&<div className="yellow-grid-local">
     
     {earnedYellowsOnline.map((chip,index)=>{
       return (
         <div key = {index} className="yellow-container-local">
           <div className="yellow-token-local"></div>
         </div>
       )
     })}
   </div>}
   </div>
 )
}

const PlayOnline = ({socket,messages,setMessages,playerName,roomName, players,content, setContent, masterBoardOnline,modalOnline, yellowChipsOnline, brownChipsOnline, yourTurnOnline, earnedYellowsOnline, earnedBrownsOnline, isYellowThreeoOnline, isBrownThreeoOnline, connectedRooms,handleClickOnline, startGameOnline,placingCounterOnline, setModalOnline,sendMessage, goToGame}) => {
 return (
  <div className="play-online">
   <OnlinePlayingSide masterBoardOnline={masterBoardOnline} handleClickOnline={handleClickOnline} startGameOnline={startGameOnline}/>
   <OnlineInfoSide modalOnline={modalOnline} yellowChipsOnline={yellowChipsOnline} brownChipsOnline={brownChipsOnline} yourTurnOnline={yourTurnOnline} earnedBrownsOnline={earnedBrownsOnline} earnedYellowsOnline={earnedYellowsOnline} isBrownThreeoOnline={isBrownThreeoOnline} isYellowThreeoOnline={isYellowThreeoOnline} roomName={roomName} connectedRooms={connectedRooms} placingCounterOnline={placingCounterOnline} /> 
   <Chat socket={socket} messages={messages} setMessages={setMessages} playerName={playerName}  content={content} setContent={setContent} 
   roomName={roomName} players={players}  setModalOnline={setModalOnline} sendMessage={sendMessage} goToGame={goToGame}/>
  </div>
 )
}

const OnlinePlayingSide = ({masterBoardOnline, handleClickOnline, startGameOnline}) => {
 return (
  <div className="online">
   <OnlineBoard  masterBoardOnline={masterBoardOnline} handleClickOnline={handleClickOnline}/>
   <OnlineControls handleClickOnline={handleClickOnline} startGameOnline={startGameOnline}/>
  </div>
 )
}


const OnlineBoard = ({handleClickOnline,masterBoardOnline, }) => {
    const [placeAudio, ] = useState('https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3')

  const [threeoAudio,]=useState('https://assets.mixkit.co/sfx/download/mixkit-bike-ring-bell-1604.wav')

  const [winAudio, ]=useState('https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3')

  const [threeoMisfire, ] = useState('https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3')

  const [captureAudio, ] = useState('https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3')








 return (

  <main className="main-online">
          <audio src={placeAudio} id='place'/>
          <audio src={threeoAudio} id='threeo'/>
          <audio src={winAudio} id='win'/>
          <audio src={threeoMisfire} id='misfire'/>
          <audio src={captureAudio} id='capture'/>

   <div className="board-online">
   {board.map((spot,index)=>{
    if(blues.indexOf(spot.id)!==-1&&grays.indexOf(spot.id)===-1){
     return (
      <div key={index} className={`blue ${masterBoardOnline[spot.id].border} `} >
       <div className={`chip-game ${masterBoardOnline[spot.id].color}`} id={spot.id} onClick={(e)=>handleClickOnline(e)}></div>
      </div>
     )
    }else if(grays.indexOf(spot.id)!==-1&&blues.indexOf(spot.id)===-1){
     return (
      <div key={index} className='gray'></div>
     )
    }else{
     return(
      <div key={index} className='red'></div>
     )

    }
    
   })}
</div>

  </main>


 )

}


const OnlineControls = ({handleClickOnline,startGameOnline}) => {
 const goToChat=()=>{
  window.scrollTo(0,520)
 }
 return (

<div className="controls-online">
 <FaLongArrowAltLeft data-tool-tip="go back" className="leftOnline" onClick={(e)=>handleClickOnline(e)}/>
 <div className="start-button" onClick={startGameOnline}>START</div>
 <div className="chat-button" onClick={()=>goToChat()}>CHAT</div>
 <FaLongArrowAltRight data-tool-tip="forward" className="rightOnline" onClick={(e)=>handleClickOnline(e)}/>
</div>

  
 )
}

const OnlineInfoSide = ({ 
   yourTurnOnline,
   roomName, 
   connectedRooms, 
   modalOnline,
   yellowChipsOnline,
   brownChipsOnline,
   earnedYellowsOnline,
   earnedBrownsOnline,
   isYellowThreeoOnline, 
   isBrownThreeoOnline,
   placingCounterOnline,
   players
}) => {
 return (
  <div className="game-effects">
   <OnlineTurn
   brownChipsOnline={brownChipsOnline}
   isYellowThreeoOnline={isYellowThreeoOnline} 
   isBrownThreeoOnline={isBrownThreeoOnline}
   yourTurnOnline={yourTurnOnline}
   roomName={roomName} 
   connectedRooms={connectedRooms}
   placingCounterOnline={placingCounterOnline}
   players={players}
   />

  <OnlineModal
   modalOnline={modalOnline}
   />

   <OnlineCapture
    isYellowThreeoOnline={isYellowThreeoOnline} 
   isBrownThreeoOnline={isBrownThreeoOnline}
   />
   <OnlineYellowChips
     yellowChipsOnline={yellowChipsOnline}
   />
   <OnlineEarnedBrowns
    earnedBrownsOnline={earnedBrownsOnline}
   />
   <OnlineBrownChips
    brownChipsOnline={brownChipsOnline}
   />
   <OnlineEarnedYellows
    earnedYellowsOnline={ earnedYellowsOnline}
   />
  </div>
 )
}


const OnlineTurn = ({yourTurnOnline, isYellowThreeoOnline, isBrownThreeoOnline, brownChipsOnline, connectedRooms, roomName,placingCounterOnline,}) => {
  return (
    <div className="turnOnline">
      {yourTurnOnline&&brownChipsOnline.length!==0&&!isYellowThreeoOnline&&!isBrownThreeoOnline&&connectedRooms.length!==1&&(<h2 className="turn-online">your turn to place</h2>)}
     

      {!yourTurnOnline&&brownChipsOnline.length!==0&&!isYellowThreeoOnline&&!isBrownThreeoOnline&&connectedRooms.length!==1&&<h2 className="turn-online">Opponent's turn to place</h2>}
    

    
  

      {yourTurnOnline&&brownChipsOnline.length===0&&!isYellowThreeoOnline&&!isBrownThreeoOnline&&placingCounterOnline!==100&&<h2 className="turn-online">your turn to move</h2>}
        

      {!yourTurnOnline&&brownChipsOnline.length===0&&!isYellowThreeoOnline&&!isBrownThreeoOnline&&placingCounterOnline!==100&&<h2 className="turn-online">opponent's turn to move</h2>}
     


      {yourTurnOnline&&(isBrownThreeoOnline||isYellowThreeoOnline)&&<h2 className="turn-online">your turn to capture</h2>}

      {!yourTurnOnline&&(isBrownThreeoOnline||isYellowThreeoOnline)&&
      <h2 className="turn-online">opponent's turn to capture</h2>}



</div>
  )
        
}    

const OnlineModal = ({modalOnline}) => {
 return (
  <div className="modalOnline">
   {modalOnline&&<h4 className="modal-online">{modalOnline}</h4>}
  </div>
 )
}

const OnlineCapture = ({isYellowThreeoOnline,isBrownThreeoOnline}) => {
 return (
  <div className="captureOnline">
   {isYellowThreeoOnline&&<h6 className="capture-online">Click & capture a non-threeo brown</h6>}
   {isBrownThreeoOnline&&<h6 className="capture-online">Click & capture a non-threeo yellow</h6>}
   </div>
 )
}


const OnlineYellowChips = ({yellowChipsOnline}) => {
 return (
   <div className="yellow-online">
   <h5>Yellow Chips</h5>
   {yellowChipsOnline&&<div className="yellow-grid-online">
     
     {yellowChipsOnline.map((chip,index)=>{
       return (
         <div key = {index} className="yellow-container-online">
           <div className="yellow-token-online"></div>
         </div>
       )
     })}
   </div>}
   </div>
 )
}

const OnlineEarnedBrowns = ({earnedBrownsOnline}) => {
 return (
   <div className="brown-online">
   <h5>Earned Browns</h5>
   {earnedBrownsOnline&&<div className="brown-grid-online">
     
     {earnedBrownsOnline.map((chip,index)=>{
       return (
         <div key = {index} className="brown-container-online">
           <div className="brown-token-online"></div>
         </div>
       )
     })}
   </div>}
   </div>
 )
}

const OnlineBrownChips = ({brownChipsOnline}) => {
 return (
   <div className="brown-online">
   <h5>brown chips</h5>
   {brownChipsOnline&&<div className="brown-grid-online">
     
     {brownChipsOnline.map((chip,index)=>{
       return (
         <div key = {index} className="brown-container-online">
           <div className="brown-token-online"></div>
         </div>
       )
     })}
   </div>}
   </div>
 )
}


const OnlineEarnedYellows = ({earnedYellowsOnline}) => {
 return (
   <div className="yellow-online">
   <h5>Earned Yellows</h5>
   {earnedYellowsOnline&&<div className="yellow-grid-online">
     
     {earnedYellowsOnline.map((chip,index)=>{
       return (
         <div key = {index} className="yellow-container-online">
           <div className="yellow-token-online"></div>
         </div>
       )
     })}
   </div>}
   </div>
 )
}





function Chat({messages,sendMessage,playerName, content, setContent, goToGame }) {






  return (
    <div className="chat">
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {[...new Set(messages)].map((message,index) => {
            return (
              <div key={index}
                className="message"
                id={playerName === message.player ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p className="content">{message.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{message.time}</p>
                    <p id="author">{message.player}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={content}
          placeholder="Enter Message..."
          onChange={(event) => {
            setContent(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={()=>sendMessage()}>&#9658;</button>
      </div>
    </div>
     <div className="game-button" onClick={()=>goToGame()}>Back to Game</div>

    </div>
  );
}


const Overview = ({goToGame,online, connected, local}) => {
  
 return (
  <div className="overview" id="overview">
   <article className="text-overview">
    <h2 className='title'>Overview</h2>
    <p>ThreeO is an ancient game believed to have originated in Asia Minor. People drew the playing field on the boards, concrete and other surfaces. They used little rocks, corn or beans instead of the chips. It is a very entertaining game which involves some planning and concetration. The game is played by two players who have nine chips each, yellow and brown. There are two stages: Placing the chips and Moving the chips.  On the homepage choose the game mode you wish to play. If you wish to play locally on the same computer, click - play locally. If you wish to play online, click - play online and you will be directed to the form page. At this point there are two situations:
     <br/>
     1. You create a new game by entering your name and the room secret code which you share with your friend to be used by him/her to join your game or,
     <br/>
     2. You join a game created by a friend by entering your name and the room code which was shared with you.
     <br/>
     There are two arrow buttons at the bottom of the board to navigate backward or forward in case you or the opponent decide to change the spot in which the chip was placed or wish to re-do a move.
    </p>
   </article>
   <div className="go-back">
   {local&&!online&&<a href='#play-local' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&online&&!connected&&<a href='#form' className="home-placing" onClick={goToGame}> Go Back </a>}
  {online&&connected&&<a href='#play-online' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&!online&&!connected&&<a href='#home' className="home-placing" onClick={goToGame}> Go Back </a>}
   <a  href="#instructions" className="re-direct">Instructions</a>
   </div>
  </div>
 )
}


const Instructions = ({goToGame, local, online, connected}) => {
 return (
  <div className="instructions" id="instructions">
   <article className="links-center">
    <div className="title">
     <h2>Instructions</h2>
    </div>
    <div className="link-item">
     <a className="link" href="#placing">Placing The Chips</a>
    </div>
    <div className="link-item">
     <a className="link" href="#moving">Moving The Chips</a>
    </div>

    <div className="link-item">
     <a className="link" href="#threeos-placing">Threeos While Placing</a>
    </div>
    <div className="link-item">
     <a className="link" href="#threeos-moving">Threeos While Moving</a>
    </div>
    <div className="link-item">
     <a className="link" href="#blocking-threeo">Blocking A Threeo</a>
    </div>
        <div className="link-item">
     <a className="link" href="#infinite-threeo">Infinite Threeo</a>
    </div >
        <div className="link-item">
     <a className="link" href="#winning">Winning The Game</a>
    </div>

   <div className="go-back">
   {local&&!online&&<a href='#play-local' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&online&&!connected&&<a href='#form' className="home-placing" onClick={goToGame}> Go Back </a>}
  {online&&connected&&<a href='#play-online' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&!online&&!connected&&<a href='#home' className="home-placing" onClick={goToGame}> Go Back </a>}
   </div>




   </article>
  </div>
 )
}


const PlacingChips = ({counter1, startPlacing,goToGame, local, online,connected}) => {









  return (
  <main className="main" id="placing">

   <div className="placing-chips">
     <div className="left-section">
   <div className="board">
   {board.map((spot,index)=>{
    if(blues.indexOf(spot.id)!==-1&&grays.indexOf(spot.id)===-1){
     return (
      <div key={index} className={`blue ${tempBoard1[spot.id].border} `}  >
       <div className={`chip ${tempBoard1[spot.id].color}`} id={spot.id} ></div>
      </div>
     )
    }
    else if(grays.indexOf(spot.id)!==-1&&blues.indexOf(spot.id)===-1){
     return (
      <div key={index} className='gray'></div>
     )
    }else{
     return(
      <div key={index} className='red'></div>
     )

    }
    
   })}

</div>
   <div className="btn" onClick={startPlacing}>{counter1<18?<IoReloadCircle className='reload'/>:<AiFillPlayCircle className='play'/>}</div>
</div>
<section className="right-section">
<article className="text-placing">
 <h2 >Placing the Chips</h2>
 <p>During this stage players by taking turns, starting with the yellows put their chips (one at a time) on the blue spots of the board. The aim of each player is to make as many ThreeOs as possible and prevent the opponent from doing so. A ThreeO is three chips of the same color in the same line. The player achieving a ThreeO earns the right to claim one of the opponent's non-ThreeO chip and captures it by clicking on it. If the Opponent has no non-ThreeO chips the Threeo becomes redundant. It can not claim any chip. The Opponent continues placing his chip. Click play to see a demonstration</p>
</article>


 <div className="go-back">
   {local&&!online&&<a href='#play-local' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&online&&!connected&&<a href='#form' className="home-placing" onClick={goToGame}> Go Back </a>}
  {online&&connected&&<a href='#play-online' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&!online&&!connected&&<a href='#home' className="home-placing" onClick={goToGame}> Go Back </a>}
   <a  href="#instructions" className="home-placing">Instructions</a>
 </div>
 </section>
 </div>

  </main>


 )
}

const MovingChips = ({counter2, goToGame, startMoving, local, connected,online}) => {




  return (
  <main className="main" id="moving">

   <div className="placing-chips">
     <div className="left-section">
   <div className="board">
   {board.map((spot,index)=>{
    if(blues.indexOf(spot.id)!==-1&&grays.indexOf(spot.id)===-1){
     return (
      <div key={index} className={`blue ${tempBoard2[spot.id].border}   `}  >
       <div className={`chip ${tempBoard2[spot.id].color}`} id={spot.id} ></div>
      </div>
     )
    }
    else if(grays.indexOf(spot.id)!==-1&&blues.indexOf(spot.id)===-1){
     return (
      <div key={index} className='gray'></div>
     )
    }else{
     return(
      <div key={index} className='red'></div>
     )

    }
    
   })}

</div>
   <div className="btn" onClick={startMoving}>{counter2<8?<IoReloadCircle className='reload'/>:<AiFillPlayCircle className='play'/>}</div>
</div>
<section className="right-section">
<article className="text-placing">
 <h2>Moving the Chips</h2>
 <p>After the players finish placing their chips they start moving them. First they click on the chip they want to move and after they click again on the empty adjacent marked blue spot they intend to place the chip on. Again the player strives to place the chips in a ThreeO so that they can capture(claim the chips from the opponent). A good way to making a ThreeO at this stage is by opening an existing Threeo and closing this same ThreeO when it is time to move again. Click the play button for a demonstration</p>
</article>
 <div className="go-back">
  {local&&!online&&<a href='#play-local' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&online&&!connected&&<a href='#form' className="home-placing" onClick={goToGame}> Go Back </a>}
  {online&&connected&&<a href='#play-online' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&!online&&!connected&&<a href='#home' className="home-placing" onClick={goToGame}> Go Back </a>}
   <a  href="#instructions" className="home-placing">Instructions</a>
 </div>
 </section>

</div>


  </main>


 )
}

const ThreeoPlacing = ({goToGame, setCounter3,counter3,local,online,connected}) => {

const handleClick =()=>{
setCounter3(-1)
for(let i=0; i<threeoPlacing.length; i++){
  threeoPlacing[i]=threeoPlacingCopy[i]
}
}



useEffect(()=>{
  const interval=setInterval(()=>{
    if(counter3<=placingThreeo.length-1){
      setCounter3(counter3+1)
    }
  },1000)

  return ()=>clearInterval(interval)
},[counter3])
useEffect(()=>{

threeoPlacing[bareThreeo[counter3]]=placingThreeo[counter3];



},[counter3])



  return (
  <main className="main" id="threeos-placing">

   <div className="placing-chips">
     <div className="left-section">
       <div className="yellow-threeo"></div>
       <div className="brown-threeo"></div>
       <div className="board-placing">
       {board.map((spot,index)=>{
       if(blues.indexOf(spot.id)!==-1&&grays.indexOf(spot.id)===-1){
       return (
       <div key={index} className={`blue ${threeoPlacing[spot.id].border}`}  >
       <div className={`chip ${threeoPlacing[spot.id].color}`} id={spot.id} ></div>
      </div>
     )
    }
    else if(grays.indexOf(spot.id)!==-1&&blues.indexOf(spot.id)===-1){
     return (
      <div key={index} className='gray'></div>
     )
    }else{
     return(
      <div key={index} className='red'></div>
     )

    }
    
   })}

</div>
   <a href="#threeo-placing" className="btn" onClick={handleClick}>{counter3<15?<IoReloadCircle className='reload'/>:<AiFillPlayCircle className='play'/>}</a>
</div>
<section className="right-section">
<article className="text-placing">
 <h2>Achiving Threeo Placing</h2>
 <p>A ThreeO is three chips of the same color in the same horizontal or vertical line (not diagonal). The player achieving a ThreeO earns the right to claim one of the opponent's non-ThreeO chip and captures it by clicking on it. If the opponent has no non-ThreeO chips the Threeo becomes redundant. It can not claim any chip. The opponent continues placing his chip. On the board on the screen the yellows achieved a ThreeO first (on the very right column) and captured a brown chip on the very top left spot. The browns player replaced the chip again in the same spot so as to prevent the yellows player from achieving a second ThreeO. The browns achieved a ThreeO as well (second row from the top) and captured the chip on the second row from the bottom. Click play to see a demonstration</p>
</article>


 <div className="go-back">
   {local&&!online&&<a href='#play-local' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&online&&!connected&&<a href='#form' className="home-placing" onClick={goToGame}> Go Back </a>}
  {online&&connected&&<a href='#play-online' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&!online&&!connected&&<a href='#home' className="home-placing" onClick={goToGame}> Go Back </a>}
   <a  href="#instructions" className="home-placing">Instructions</a>
 </div>
 </section>
 </div>

  </main>


 )
}



const ThreeosMoving = ({counter4, goToGame, startThreeoMoving,local,connected,online}) => {


  return (
  <main className="main" id="threeos-moving">

   <div className="placing-chips">
     <div className="left-section">
   <div className="board">
   {board.map((spot,index)=>{
    if(blues.indexOf(spot.id)!==-1&&grays.indexOf(spot.id)===-1){
     return (
      <div key={index} className={`blue ${movingThreeos[spot.id].border} `}  >
       <div className={`chip ${movingThreeos[spot.id].color}`} id={spot.id} ></div>
      </div>
     )
    }
    else if(grays.indexOf(spot.id)!==-1&&blues.indexOf(spot.id)===-1){
     return (
      <div key={index} className='gray'></div>
     )
    }else{
     return(
      <div key={index} className='red'></div>
     )

    }
    
   })}

</div>
   <div className="btn" onClick={startThreeoMoving}>{counter4<10?<IoReloadCircle className='reload'/>:<AiFillPlayCircle className='play'/>}</div>
</div>
<section className="right-section">
<article className="text-placing">
 <h2>Threeos while Moving</h2>
 <p>Like during placing the chips stage, during this stage also the player should do his best to achieve as many threeos as posible. On the board to the left (bottom if you use small device) the player who has the yellow chips while trying to make a threeo on the center third row from the bottom of the board, he overlooked the ready to close brown threeo on the fourth left row. The browns close this threeo and cature the yellow chip on first top row at the center spot. This was a mistake, he should have captured one of the yellow chips of the pending yellow threeo mentioned above to disrupt it. Since the browns didn't do so, the yellows achieved this threeo and captured the brown chip at the center of the second row from the bottom of the board and thus, making an infinite threeo between second and third row from the bottom of the board. Click play to see a demonstration</p>
</article>
 <div className="go-back">
   {local&&!online&&<a href='#play-local' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&online&&!connected&&<a href='#form' className="home-placing" onClick={goToGame}> Go Back </a>}
  {online&&connected&&<a href='#play-online' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&!online&&!connected&&<a href='#home' className="home-placing" onClick={goToGame}> Go Back </a>}
   <a  href="#instructions" className="home-placing">Instructions</a>
 </div>
 </section>

</div>


  </main>


 )
}

const BlockingThreeo = ({counter5, goToGame, startThreeoBlocking,local,online,connected}) => {


  return (
  <main className="main" id="blocking-threeo">

   <div className="placing-chips">
     <div className="left-section">
   <div className="board">
   {board.map((spot,index)=>{
    if(blues.indexOf(spot.id)!==-1&&grays.indexOf(spot.id)===-1){
     return (
      <div key={index} className={`blue ${threeoBlocking[spot.id].border} `}  >
       <div className={`chip ${threeoBlocking[spot.id].color}`} id={spot.id} ></div>
      </div>
     )
    }
    else if(grays.indexOf(spot.id)!==-1&&blues.indexOf(spot.id)===-1){
     return (
      <div key={index} className='gray'></div>
     )
    }else{
     return(
      <div key={index} className='red'></div>
     )

    }
    
   })}

</div>
   <div className="btn" onClick={startThreeoBlocking}>{counter5<8?<IoReloadCircle className='reload'/>:<AiFillPlayCircle className='play'/>}</div>
</div>
<section className="right-section">
<article className="text-placing">
 <h2>Blocking a threeo</h2>
 <p>During the placing and also the moving stage the players shoud put their chips adjacent to the opponent's threeos so that during the moving stage if the opponent attempts to open the threeo the other player block it so it cannot be closed to for again a threeo. On the board to the left (bottom if you're using a small device) the yellows decided to open their threeo but the brown blocked it and so did the yellows with the brown's threeo. Click play to see a demonstration.</p>
</article>
 <div className="go-back">
  {local&&!online&&<a href='#play-local' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&online&&!connected&&<a href='#form' className="home-placing" onClick={goToGame}> Go Back </a>}
  {online&&connected&&<a href='#play-online' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&!online&&!connected&&<a href='#home' className="home-placing" onClick={goToGame}> Go Back </a>}
   <a  href="#instructions" className="home-placing">Instructions</a>
 </div>
 </section>

</div>


  </main>


 )
}

const InfiniteThreeos = ({counter6, goToGame, startInfiniteThreeo,local,online,connected}) => {


  return (
  <main className="main" id="infinite-threeo">

   <div className="placing-chips">
     <div className="left-section">
   <div className="board">
   {board.map((spot,index)=>{
    if(blues.indexOf(spot.id)!==-1&&grays.indexOf(spot.id)===-1){
     return (
      <div key={index} className={`blue ${infiniteThreeo[spot.id].border} `}  >
       <div className={`chip ${infiniteThreeo[spot.id].color}`} id={spot.id} ></div>
      </div>
     )
    }
    else if(grays.indexOf(spot.id)!==-1&&blues.indexOf(spot.id)===-1){
     return (
      <div key={index} className='gray'></div>
     )
    }else{
     return(
      <div key={index} className='red'></div>
     )

    }
    
   })}

</div>
   <div className="btn" onClick={startInfiniteThreeo}>{counter6<=8?<IoReloadCircle className='reload'/>:<AiFillPlayCircle className='play'/>}</div>
</div>
<section className="right-section">
<article className="text-placing">
 <h2>Infinite Threeo</h2>
 <p>On the board to the left (bottom if you are using a small device) there are samples of a yellow and a brown infinite threeo. Both players should do their best not to allow their opponent to achieve an infinite threeo because as you can see the player would land a threeo for every move thus would be able to quickly capture the opponent's chips and guaranteeing a victory. Click play to see a demonstration</p>
</article>
 <div className="go-back">
   {local&&!online&&<a href='#play-local' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&online&&!connected&&<a href='#form' className="home-placing" onClick={goToGame}> Go Back </a>}
  {online&&connected&&<a href='#play-online' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&!online&&!connected&&<a href='#home' className="home-placing" onClick={goToGame}> Go Back </a>}
   <a  href="#instructions" className="home-placing">Instructions</a>
 </div>
 </section>

</div>


  </main>


 )
}


const Winning = ({counter7, goToGame, startWinning,local,online,connected}) => {


  return (
  <main className="main" id="winning">

   <div className="placing-chips">
     <div className="left-section">
   <div className="board">
   {board.map((spot,index)=>{
    if(blues.indexOf(spot.id)!==-1&&grays.indexOf(spot.id)===-1){
     return (
      <div key={index} className={`blue ${winning[spot.id].border} `}  >
       <div className={`chip ${winning[spot.id].color}`} id={spot.id} ></div>
      </div>
     )
    }
    else if(grays.indexOf(spot.id)!==-1&&blues.indexOf(spot.id)===-1){
     return (
      <div key={index} className='gray'></div>
     )
    }else{
     return(
      <div key={index} className='red'></div>
     )

    }
    
   })}

</div>
   <div className="btn" onClick={startWinning}>{counter7<=8?<IoReloadCircle className='reload'/>:<AiFillPlayCircle className='play'/>}</div>
</div>
<section className="right-section">
<article className="text-placing">
 <h2>Winning</h2>
 <p>There are two ways to winning the game:
   <br/>
   1-By capturing seven of the opponent's chips and,
   <br/>
   2-By taking the opponent's chips hostage which means blocking all the spots around the opponent's chips with your chips so, there are no empty spots where the opponent could move any of his/her chips.
   On the board to the left (bottom if you're using a small device) the yellows move the only chip they could move on the fourth row right side of the board. The browns made their move leaving the yellows no other choice but to move back the chip to its previous spot. The browns move and block the last empty spot the yellows could move to, taking them hostage and winning the game.
 </p>
</article>
 <div className="go-back">
   {local&&!online&&<a href='#play-local' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&online&&!connected&&<a href='#form' className="home-placing" onClick={goToGame}> Go Back </a>}
  {online&&connected&&<a href='#play-online' className="home-placing" onClick={goToGame}> Go Back </a>}
  {!local&&!online&&!connected&&<a href='#home' className="home-placing" onClick={goToGame}> Go Back </a>}
   <a  href="#instructions" className="home-placing">Instructions</a>
 </div>
 </section>

</div>


  </main>


 )
}
