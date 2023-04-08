import React, { Component } from 'react'

class TicTacToe extends Component {
	constructor(props) {
		super(props)
		this.state = {
			board: Array(9).fill(null),
			player: 'X',
			winner: null,
			isDraw: false,
		}
	}

	handleClick = (index) => {
		const { board, player } = this.state

		if (board[index] === null && !this.state.winner) {
			const newBoard = [...board]
			const nextPlayer = player === 'X' ? 'O' : 'X'

			newBoard[index] = player

			this.setState(
				{
					board: newBoard,
					player: nextPlayer,
				},
				() => {
					this.checkWinner()
				}
			)
		}
	}

	checkWinner = () => {
		const { board } = this.state
		const winningLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]

		for (let i = 0; i < winningLines.length; i += 1) {
			const [a, b, c] = winningLines[i]

			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				this.setState({
					winner: board[a],
				})
				return
			}
		}

		if (board.filter((square) => square === null).length === 0) {
			this.setState({
				isDraw: true,
			})
		}
	}

	resetGame = () => {
		this.setState({
			board: Array(9).fill(null),
			player: 'X',
			winner: null,
			isDraw: false,
		})
	}

	handleHelp = () => {
		const { board } = this.state
		if (!this.state.winner) {
			const emptyCells = board.reduce((acc, curr, index) => {
				if (curr === null) {
					return [...acc, index]
				}
				return acc
			}, [])

			if (emptyCells.length > 0) {
				const randomIndex = Math.floor(
					Math.random() * emptyCells.length
				)
				this.setState(
					(prevState) => {
						const newBoard = [...prevState.board]
						newBoard[emptyCells[randomIndex]] =
							prevState.player === 'X' ? 'X' : 'O'
						return {
							board: newBoard,
							player: prevState.player === 'X' ? 'O' : 'X',
						}
					},
					() => {
						this.checkWinner()
					}
				)
			}
		}
	}

	render() {
		const { board, player, winner, isDraw } = this.state

		const winningLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]

		const winningLine = winningLines.find((line) => {
			const [a, b, c] = line
			return board[a] && board[a] === board[b] && board[a] === board[c]
		})

		return (
			<div>
				<h1 className="title">Tic Tac Toe</h1>
				{!this.state.winner ? (
					<h2 className="subtitle">
						Player <span>{player}</span> turn
					</h2>
				) : (
					<></>
				)}
				<div className="board">
					{board.map((square, index) => {
						const isWinningSquare =
							winningLine && winningLine.includes(index)
						return (
							<button
								key={index}
								className={`square ${
									isWinningSquare ? 'winning-square' : ''
								}`}
								onClick={() => this.handleClick(index)}
							>
								{square}
							</button>
						)
					})}
				</div>
				{winner && <h2 className="winner">{winner} wins!</h2>}
				{isDraw && <h2 className="draw">Its a draw!</h2>}
				<div className="buttons">
					<button className="reset-button" onClick={this.resetGame}>
						New Game
					</button>
					<button className="help-button" onClick={this.handleHelp}>
						Help
					</button>
				</div>
			</div>
		)
	}
}

export default TicTacToe
