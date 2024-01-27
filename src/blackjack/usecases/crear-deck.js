import _ from 'underscore';

// Esta función crea un nuevo deck

/**
 * 
 * @param {Array<String>} tiposDeCarta Ejemplo: ['C','D','H','S']
 * @param {Array<String>} tiposEspeciales Ejemplo: ['A','J','Q','K']
 * @returns {Array<String>} Retorna un nuevo deck de cartas
 */
export const crearDeck = (tiposDeCarta, tiposEspeciales) => {

    if (!tiposDeCarta) throw new Error ('TiposDeCarta es obligatorio'); 
    if (tiposDeCarta.length <= 0) throw new Error ('TiposDeCarta tiene que ser un arreglo de String'); 

    if (!tiposEspeciales) throw new Error ('tiposEspeciales es obligatorio'); 
    if (tiposEspeciales.length <= 0) throw new Error ('tiposEspeciales tiene que ser un arreglo de String'); 

    let deck = [];

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tiposDeCarta ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tiposDeCarta ) {
        for( let esp of tiposEspeciales ) {
            deck.push( esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    return deck;
}