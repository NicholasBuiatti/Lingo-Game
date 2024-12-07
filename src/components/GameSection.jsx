import { useEffect, useState } from 'react';
import dataParole from '../data/parole.json';
import Swal from 'sweetalert2';

const GameSection = () => {
    const [casualNumber, setCasualNumber] = useState(0);
    const [casualWord, setCasualWord] = useState('');
    //settaggio parola usata
    const [word, setWord] = useState('');
    //settaggio conto dei tentativi
    const [count, setCount] = useState(0);
    //settaggio griglia di 5 righe di colonne pari al numero di lettere della parola selezionata
    const [grid, setGrid] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEndGame, setIsEndGame] = useState(false);
    const [isNewGame, setIsNewGame] = useState(true);
    const [win, lose] = useState(false);
    const [tryWord, setTryWord] = useState('');

    useEffect(() => {
        if (isNewGame) {
            //numero casuale tra 0 e 766 che sono il numero di parole nel file json
            const randomNum = Math.floor(Math.random() * 767);
            const wordSelected = dataParole.parole[randomNum];
            setCasualNumber(randomNum);
            //estrazione della parola casualmente
            setCasualWord(wordSelected);
            setGrid(
                Array.from({ length: 5 }, () =>
                    Array(wordSelected.length).fill('')
                )
            );
            setCount(0);
            // Resetta isNewGame a false dopo aver avviato la nuova partita
            setIsNewGame(false);
        }
    }, [isNewGame]);

    console.log(dataParole.parole[casualNumber], casualWord.length);

    //cambiambento dinamico della variabile word
    const handlerWord = (e) => {
        setWord(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendWord();
        }
    };
    //invio della parola
    const sendWord = () => {
        setIsEndGame(false);
        setErrorMessage('');
        //controllo della parola
        if (
            count < 5 &&
            word.length === casualWord.length &&
            /^[a-zA-Z]+$/.test(word)
        ) {
            // creo una copia della griglia
            const newGrid = [...grid];
            // salvo la parola nel posto del tentativo con split dividendo ogni lettera
            newGrid[count] = word.split('');
            // salvo l'array creato con la parola nell'array originale
            setGrid(newGrid);
            setTryWord(word);
            setWord('');
            //incremento il numero di tentativi
            setCount((prevCount) => prevCount + 1);
            console.log(grid);
        } else {
            setErrorMessage(
                word.length !== casualWord.length
                    ? `La parola deve essere lunga ${casualWord.length} lettere.`
                    : 'La parola può contenere solo lettere.'
            );
            console.log('errore');
        }
    };

    useEffect(() => {
        if (
            tryWord !== '' &&
            casualWord.toLowerCase() == tryWord.toLowerCase() &&
            count < 5
        ) {
            setIsEndGame(true);
            lose(true);
            setCount(count);
            Swal.fire(
                'Hai vinto! Complimenti',
                'Inizia una nuova partita!',
                'success'
            );
            console.log('hai vinto');
        } else if (count >= 5) {
            setIsEndGame(true);
            lose(true);
            Swal.fire(
                'Hai perso! Ritenta!',
                `Mi dispaice hai perso, la parola era ${casualWord}`,
                'error'
            );
            console.log('hai perso', count);
        }
    }, [win, count]);
    console.log('word:', word);
    const reset = () => {
        setIsNewGame(true);
        setIsEndGame(false);
    };

    return (
        <div className="h-full overflow-auto relative">
            <div className="flex items-center gap-20">
                <input
                    type="text"
                    onChange={handlerWord}
                    onKeyDown={handleKeyDown}
                    value={word}
                    maxLength={casualWord.length}
                    className={`p-2 border-2 border-black rounded-full m-2 focus:border-blue-800 ${
                        isEndGame
                            ? 'border-gray-400 text-gray-400 bg-slate-200 opacity-50'
                            : ''
                    }`}
                    disabled={isEndGame}
                />
                <p className="">
                    TENTATIVO N:{' '}
                    {count < 5 ? (
                        <span className="ml-1 text-2xl font-bold text-red-700">
                            {count + 1}
                        </span>
                    ) : (
                        <span className="ml-1 text-2xl font-bold text-red-700">
                            GAME OVER
                        </span>
                    )}
                </p>

                <button
                    type="button"
                    onClick={() => reset()}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                >
                    Nuova Partita
                </button>
            </div>

            <p className="text-red-700 font-semibold underline">
                {errorMessage}
            </p>
            {grid.map((row, index) => (
                <section key={index} className="flex mt-5">
                    {row.map((letter, colIndex) => (
                        <div
                            key={colIndex}
                            className={`${
                                letter !== '' &&
                                casualWord[colIndex]?.toLowerCase() ===
                                    letter.toLowerCase()
                                    ? 'bg-green-500'
                                    : letter !== '' &&
                                      casualWord.includes(letter)
                                    ? 'bg-yellow-500'
                                    : ''
                            } w-24 aspect-square mx-2 text-center border-4 rounded-2xl border-white flex items-center justify-center`}
                        >
                            <p className="text-4xl font-bold">
                                {letter.toUpperCase()}
                            </p>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default GameSection;
