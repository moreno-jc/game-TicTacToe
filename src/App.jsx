import { useState } from 'react'
import './App.css'


const TURNS= {
  X: 'x',
  O: 'o'
}


const Square = ({ children, isSelected, updateBoard, index}) => {

    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
      updateBoard(index)
    }

    return(
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


export default function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null) 
  )

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo

    if (
      boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ){
      return boardToCheck[a]
    }
  }
  return null
}

const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square != null )
}

  const updateBoard = (index) => {

    //Validacion para saber si es necesario actualizar el tablero
    if (board[index] || winner) return

    //Actualizacion del tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Validar si ya hay ganador
    const newWinner = checkWinner (newBoard)
    if (newWinner) {
      setWinner (newWinner)
      alert (`el ganador es ${newWinner}`)
    }else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  }

  const resetGame =  () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main>
        <h1> Tic Tac Toe </h1>
        <button onClick={resetGame}>Iniciar de nuevo</button>      
      <section className="game">
      {
          board.map((square , index) => {
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >{square}
              </Square>
            )
        })
      }
      </section>

      <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      { winner != null && (
        <section className='winner'>
            <div className='text'>
              <h2>
                { 
                  winner === false 
                    ? 'Empate' 
                    : 'Gano:'
                }
              </h2>

              <header>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
        </section>
      )
    }
    </main>
  )
}