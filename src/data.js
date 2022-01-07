

let spots = [];
for(let i=0; i<=168; i++){
 spots.push(i)
}

export let board= spots.map((spot)=>{
  return {id:spot, color: null, border: null,}
})
export let tempBoard = [...board ]
export let tempBoard1= [...board]
export let tempPlacing=[...board]
export let threeoPlacing=[...board]
export let tempBoard3=[...board]


export const grays= [1,2,3,4,5,7,8,9,10,11,13,19,25,26,29,30,31, 33,34,35,38,39,41,45,49,51,52,54,57,59,62,64,65,67,69,73,75,77,79,81,87,89,91,93,95,99,101,103,104,106,109,111,114,116,117,119,123,127,129,130,133,134,135,137,138,139,142,143,149,155,157,158,159,160,161,163,164,165,166,167]

export const graySpots = grays.map((spot)=>{
  return {id:spot, color:null}
})

export const blues= [0,6,12,28,32,36,56,58,60,78,80,82,86,88,90,108,110,112,132,136,140,156,162,168]

export let blueSpots = [
{id:0, color:''}, {id:6, color:''}, {id:12, color:''},
{id:28, color:''}, {id:32, color:''}, {id:36, color:''},
{id:56, color:''}, {id:58, color:''}, {id:60, color:''},
{id:78, color:''}, {id:80, color:''}, {id:82, color:''},
{id:86, color:''}, {id:88, color:''}, {id:90, color:''},
{id:108, color:''}, {id:110, color:''}, {id:112, color:''},
{id:132, color:''}, {id:136, color:''}, {id:140, color:''},
{id:156, color:''}, {id:162, color:''}, {id:168, color:''},

]




export const yellowThreeos = [
  [{id:0, color: 'yellow'}, {id:6, color: 'yellow'},{id:12, color: 'yellow'}],
  [{id:12, color: 'yellow'}, {id:90, color: 'yellow'},{id:168, color: 'yellow'}],
  [{id:168, color: 'yellow'}, {id:162, color: 'yellow'},{id:156, color: 'yellow'}],
  [{id:156, color: 'yellow'}, {id:78, color: 'yellow'},{id:0, color: 'yellow'}],
  [{id:28, color: 'yellow'}, {id:32, color: 'yellow'},{id:36, color: 'yellow'}],
  [{id:36, color: 'yellow'}, {id:88, color: 'yellow'},{id:140, color: 'yellow'}],
  [{id:140, color: 'yellow'}, {id:136, color: 'yellow'},{id:132, color: 'yellow'}],
  [{id:132, color: 'yellow'}, {id:30, color: 'yellow'},{id:28, color: 'yellow'}],
  [{id:56, color: 'yellow'}, {id:58, color: 'yellow'},{id:60, color: 'yellow'}],
  [{id:60, color: 'yellow'}, {id:86, color: 'yellow'},{id:112, color: 'yellow'}],
  [{id:112, color: 'yellow'}, {id:110, color: 'yellow'},{id:108, color: 'yellow'}],
  [{id:108, color: 'yellow'}, {id:82, color: 'yellow'},{id:56, color: 'yellow'}],
  [{id:6, color: 'yellow'}, {id:32, color: 'yellow'},{id:58, color: 'yellow'}],
  [{id:86, color: 'yellow'}, {id:88, color: 'yellow'},{id:90, color: 'yellow'}],
  [{id:162, color: 'yellow'}, {id:136, color: 'yellow'},{id:110, color: 'yellow'}],
  [{id:78, color: 'yellow'}, {id:80, color: 'yellow'},{id:82, color: 'yellow'}],
]


export const threeos = [
  0,  6, 12, 
  12,  90, 168, 
  168,  162, 156, 
  156,  78, 0, 
  28,  32, 36, 
  36,  88, 140, 
  140,  136, 132, 
  132,  80, 28, 
  56,  58, 60, 
  60,  86, 112, 
  112,  110, 108, 
  108,  82, 56, 
  6,  32, 58, 
  86,  88, 90, 
  162,  136, 110, 
  78,  80, 82, 
]

export const chips = [0,1,2,3,4,5,6,7,8]

export const moves = {
  0 : [6,78],
  6:  [0,32,12],
  12: [6,90],
  28: [32,80],
  32: [28, 6, 36, 58],
  36: [32,88],
  56: [82, 58],
  58: [56, 32, 60],
  60: [58,86],
  78: [156, 0, 80],
  80: [78,28,82,132],
  82: [80, 56, 108],
  86: [60, 88, 112],
  88: [86, 36, 90, 140],
  90: [88, 12, 168],
  108: [82, 110],
  110: [108, 136, 112],
  112: [110, 86],
  132: [80, 136],
  136: [132, 110, 140, 162],
  140: [136, 88],
  156: [78, 162],
  162: [156, 136, 168],
  168: [162, 90]
}


 export const placingArray = [0,28,6,12,32,58,168,80,132,82,60,87,140,136,108,156,110,88]
export const movingArray=placingArray.map((item)=>{
  if(placingArray.indexOf(item)%2===0){
    return {id:item, color:'yellow',border:null}
  }
    if(placingArray.indexOf(item)%2===1){
    return {id:item, color:'brown',border:null}
  }
return item;
})

export const placedForBlockingThreeos = [0,28,6,32,80,12,168,36,132,56,60,88,140,162,136,]

const blockingThreeo=placedForBlockingThreeos.map((item)=>{
  if(placedForBlockingThreeos.indexOf(item)%2===0){
    return {id:item, color:'yellow',border:null}
  }
    if(placedForBlockingThreeos.indexOf(item)%2===1){
    return {id:item, color:'brown',border:null}
  }
return item;
})

const placedForInfiniteThreeo =[140,0,86,6,90,12,136,28,132,36]

const threeoInfinite = placedForInfiniteThreeo.map(item=>{
    if(placedForInfiniteThreeo.indexOf(item)%2===0){
    return {id:item, color:'yellow',border:null}
  }
    if(placedForInfiniteThreeo.indexOf(item)%2===1){
    return {id:item, color:'brown',border:null}
  }
return item;

})

const placedForCapture =[0,12,6,36,28,58,56,78,82,80,88,86,90,108,32,132,168,162]

const placedForWinning = placedForCapture.map(item=>{
  if(placedForCapture.indexOf(item)%2===0){
    return {id:item, color:'yellow',border:null}
  }
    if(placedForCapture.indexOf(item)%2===1){
    return {id:item, color:'brown',border:null}
  }
return item;

})

// export const tempBoard4 = setupBoard(board,movingForThreeos)


// export  const usePrevious= (value)=>{
//    let ref = useRef()
//    useEffect(()=>{
//      ref.current=value
//    })
//    return ref.current
//  } 



export const setupBoard = (arr1=[], arr2=[]) =>{
let c = arr2.map(noob=>noob.id)
let d= arr1.filter((item)=>c.indexOf(item.id)===-1)
return [...arr2, ...d].sort((a,b)=>a.id-b.id)
}

export const setupThreeos = (arr1=[], arr2=[]) =>{
let d= arr1.map((item)=>{
  let chip = arr2.find(a=>a.id===item)
  if(chip){
    return chip
  }
  return item
})
return d;
}






export const tempBoard2 = setupBoard(board, movingArray)
export const tempBoard2Copy=[...tempBoard2]
export  const movingThreeos=[...tempBoard2]

export const placingThreeo=[{id:6,color:'yellow', border:null},{id:32,color:'brown', border:null},{id:90,color:'yellow', border:null},{id:88,color:'brown', border:null},{id:12,color:'yellow', border:null}, {id:0,color:'brown', border:null},{id:168,color:'yellow', border:null},{id:0,color:null, border:null},{id:0,color:'brown', border:null},{id:136,color:'yellow', border:null},{id:36,color:'brown', border:null},{id:140,color:'yellow', border:null},{id:28,color:'brown', border:null},{id:140,color:null, border:null}, {id:140,color:'yellow', border:null},]


export const bareThreeo=placingThreeo.map((item)=>item.id)


export const threeoBlocking = setupBoard(board, blockingThreeo)

export const threeoBlockingCopy=[...threeoBlocking]

export const infiniteThreeo = setupBoard(board,threeoInfinite)
export const infiniteThreeoCopy =[...infiniteThreeo]
export const winning = setupBoard(board,placedForWinning)
export const winningCopy=[...winning]

export const links = [
  {
    id: 1,
    url: '#home',
    text: 'home',
  },
  {
    id: 2,
    url: '#overview',
    text: 'overview',
  },
  {
    id: 3,
    url: '#instructions',
    text: 'instructions',
  },
]

export const threeoPlacingCopy = [...threeoPlacing]


