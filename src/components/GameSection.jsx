import { useEffect, useState } from 'react';
import dataParole from '../data/parole.json';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

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
    const [tryWord, setTryWord] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    //creazione funzione per iniziare un nuovo gioco
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

    //controllo tramite API che la parola inserita dall'utente esista
    const checkWord = async () => {
        // Cerca la parola esatta
        const response = await axios.get(
            `https://api.datamuse.com/words?sp=${word}&max=1`
        );
        if (response.data.length > 0) {
            // La parola esiste
            return true;
        } else {
            // La parola non è trovata
            return false;
        }
    };

    //funzione che parte alla pressione del tasto invio
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            // Usa await per aspettare il risultato della Promise
            const wordExists = await checkWord();

            if (wordExists) {
                sendWord();
            } else {
                setErrorMessage('La parola non esiste!');
            }
        }
    };

    //invio della parola
    const sendWord = () => {
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
            //salvo la parola in una variabile di appoggio
            setTryWord(word);
            setWord('');
            //incremento il numero di tentativi
            setCount((prevCount) => prevCount + 1);
        } else {
            setErrorMessage(
                word.length !== casualWord.length
                    ? `La parola deve essere lunga ${casualWord.length} lettere.`
                    : 'La parola può contenere solo lettere.'
            );
        }
    };

    //visualizzo il popup di vincita o sconfitta
    useEffect(() => {
        if (
            tryWord !== '' &&
            casualWord.toLowerCase() === tryWord.toLowerCase()
        ) {
            setIsEndGame(true);
            setPopupMessage(
                'Hai vinto! Complimenti! Inizia una nuova partita!'
            );
            setShowPopup(true);
        } else if (count + 1 == 6) {
            setIsEndGame(true);
            setPopupMessage(`Hai perso! La parola era "${casualWord}"`);
            setShowPopup(true);
        }
    }, [tryWord, count]);

    //funzione per il reset del gioco
    const reset = () => {
        setIsNewGame(true);
        setIsEndGame(false);
    };
    console.log(tryWord);

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
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-6 text-center shadow-lg w-80"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-xl font-bold mb-4">
                                {popupMessage}
                            </h2>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Chiudi
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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
