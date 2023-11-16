/**
 * 
 * Patron Modulo
 * 
 * Funcion anonima autoinvocada
 * 
 */

(() => {

    'use strict'


    /**
     * 2C = Two of Clubs
     * 2D = Two of Diamonds
     * 2H = Two of Hearts
     * 2S = Two of Spades
     */

    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];


    let puntosJugador = 0,
        puntosComputadora = 0;

    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    const puntosHtml = document.querySelectorAll('small');


    // Esta función crea un nuevo deck
    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        deck = _.shuffle(deck);

        return deck;
    };

    // Esta función me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        const carta = deck.pop();
        return carta;
    };

    const valorCarta = (carta) => {
        // Todos los strings en javascript pueden trabajarse como arrays
        // const valor = carta[0];

        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;
    };

    const revisarPuntaje = (puntosComputadora, puntosMinimos) => {

        if (puntosComputadora === puntosMinimos) {
            alert('Empate !!!');
        } else if (puntosMinimos > 21) {
            alert('Ganador: Computadora');
        } else if (puntosComputadora > 21) {
            alert('Ganador: Jugador');
        } else {
            alert('Ganador: Computadora');
        }

    };


    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {

            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);

            puntosHtml[1].innerText = puntosComputadora;

            // <img class="card" src="assets/cartas/10C.png" alt=""></img>

            const imgCarta = document.createElement('img');

            imgCarta.src = `assets/cartas/${carta}.png`;

            imgCarta.classList.add('card');

            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


        setTimeout(() => { revisarPuntaje(puntosComputadora, puntosMinimos) }, 150);



    };


    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);

        puntosHtml[0].innerText = puntosJugador;

        // <img class="card" src="assets/cartas/10C.png" alt=""></img>

        const imgCarta = document.createElement('img');

        imgCarta.src = `assets/cartas/${carta}.png`;

        imgCarta.classList.add('card');

        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora(puntosJugador);
        }

    });


    // Eventos
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    });

    // Eventos
    btnNuevo.addEventListener('click', () => {
        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHtml[0].innerText = puntosJugador;
        puntosHtml[1].innerText = puntosComputadora;

        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    });




    crearDeck();
})();


