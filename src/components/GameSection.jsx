import { useEffect, useState } from 'react';
import dataParole from '../data/parole.json';

const GameSection = () => {
    const [casualNumber, setCasualNumber] = useState(0);
    const [casualWord, setCasualWord] = useState('');
    //settaggio parola usata
    const [word, setWord] = useState('');
    //settaggio conto dei tentativi
    const [count, setCount] = useState(0);
    //settaggio griglia di 5 righe di colonne pari al numero di lettere della parola selezionata
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * 767);
        const wordSelected = dataParole.parole[randomNum];
        //numero casuale tra 0 e 766 che sono il numero di parole nel file json
        setCasualNumber(randomNum);
        //estrazione della parola casualmente
        setCasualWord(wordSelected);
        setGrid(
            Array.from({ length: 5 }, () => Array(wordSelected.length).fill(''))
        );
    }, []);

    console.log(dataParole.parole[casualNumber], casualWord.length);

    //cambiambento dinamico della variabile word
    const handlerWord = (e) => {
        setWord(e.target.value);
    };

    //invio della parola al click del pulsante
    const sendWord = () => {
        //controllo della parola
        if (word.length === casualWord.length) {
            // creo una copia della griglia
            const newGrid = [...grid];
            // salvo la parola nel posto del tentativo con split dividendo ogni lettera
            newGrid[count] = word.split('');

            // salvo l'array creato con la parola nell'array originale
            setGrid(newGrid);
            setWord('');
            //incremento il numero di tentativi
            setCount((prevCount) => prevCount + 1);
            console.log(grid);
        } else {
            console.log('errore');
        }
    };

    return (
        <div>
            <input
                type="text"
                onChange={handlerWord}
                value={word}
                maxLength={5}
            />
            <button
                type="button"
                className="p-2 border-2 border-red-700"
                onClick={sendWord}
            >
                Invia
            </button>
            <p>tentativi: {count}</p>

            {grid.map((row, index) => (
                <section
                    key={index}
                    className="container flex justify-between mt-10"
                >
                    {row.map((letter, colIndex) => (
                        <div
                            key={colIndex}
                            className="w-1/5 aspect-square mx-2 text-center border-2 border-white flex items-center justify-center"
                        >
                            <p>{letter}</p>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default GameSection;
