import titolo from '../assets/lingoTitolo.png';

const SectionHeader = () => {
    return (
        <div className="">
            <img src={titolo} className="w-6/12 m-auto" alt="" />
            <h2 className="text-3xl font-bold w-11/12 text-center">
                REGOLE DEL GIOCO
            </h2>
            <ol className="list-decimal mt-3 mx-10 space-y-4">
                <li>
                    <h3 className="font-semibold text-xl">Obiettivo:</h3>
                    <ul className="list-disc list-inside">
                        <li>
                            Indovinare una parola segreta di almeno 5 lettere in
                            5 tentativi.
                        </li>
                    </ul>
                </li>

                <li>
                    <h3 className="font-semibold text-xl">Come giocare:</h3>
                    <ul className="list-disc list-inside">
                        <li>
                            Dopo ogni tentativo, ricevi un feedback per ogni
                            lettera:
                        </li>
                        <ul className="list-inside ml-5">
                            <li>
                                <strong className="text-green-500">
                                    Verde:
                                </strong>
                                Lettera corretta e nella posizione giusta.
                            </li>
                            <li>
                                <strong className="text-yellow-500">
                                    Giallo:
                                </strong>
                                Lettera corretta ma nella posizione sbagliata.
                            </li>
                        </ul>
                    </ul>
                </li>
            </ol>
        </div>
    );
};

export default SectionHeader;
