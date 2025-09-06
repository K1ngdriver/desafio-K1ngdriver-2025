class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = brinquedosPessoa1.split(',')
    const brinquedos2 = brinquedosPessoa2.split(',')
    const animaisParaProcessar = ordemAnimais.split(',')

    for (let brinquedo of brinquedos1){
      if(!brinquedosValidos.includes(brinquedo)){
        return {erro: "Brinquedo inválido"};
      }
    }
    for (let brinquedo of brinquedos2){
      if(!brinquedosValidos.includes(brinquedo)){
        return {erro: "Brinquedo inválido"};
      }
    }

    for (let animal of animaisParaProcessar){
      if(!(animal in animais)){
        return {erro: "Animal inválido"};
      }
    }

    if (new Set(animaisParaProcessar).size !== animaisParaProcessar.length) {
    return {erro: "Animal inválido"};
    }

    if (new Set(brinquedos1).size !== brinquedos1.length) {
    return {erro: "Brinquedo inválido"};
    }

    if (new Set(brinquedos2).size !== brinquedos2.length) {
    return {erro: "Brinquedo inválido"};
    }
    
    function podeAdotar(brinquedosPessoa, brinquedosFavoritos) {
    
    let indicePessoa = 0;
    
    for (let brinquedoFavorito of brinquedosFavoritos) {
        let encontrou = false;
        
        for (let i = indicePessoa; i < brinquedosPessoa.length; i++) {
            if (brinquedosPessoa[i] === brinquedoFavorito) {
                indicePessoa = i + 1;
                encontrou = true;
                break;
            }
        }
        
        if (!encontrou) {
            return false;
        }
      }
    
    return true;
    }

    function podeAdotarLoco(brinquedosPessoa, brinquedosFavoritos, temCompanhia) {
        if (!temCompanhia) {
            return false;
        }
        
        for (let brinquedoFavorito of brinquedosFavoritos) {
            if (!brinquedosPessoa.includes(brinquedoFavorito)) {
                return false;
            }
        }
        
        return true;
    }

    let animaisAdotadosPessoa1 = 0;
    let animaisAdotadosPessoa2 = 0;
    let pessoa1TemGato = false;
    let pessoa2TemGato = false;

    const resultado = []

    for (let nomeAnimal of animaisParaProcessar) {
    const animal = animais[nomeAnimal];
    
    const pessoa1Pode = (nomeAnimal === "Loco") ?
      podeAdotarLoco(brinquedos1, animal.favorito, animaisAdotadosPessoa1 > 0) :
      podeAdotar(brinquedos1, animal.favorito);
    
    const pessoa2Pode = (nomeAnimal === "Loco") ?
      podeAdotarLoco(brinquedos2, animal.favorito, animaisAdotadosPessoa2 > 0) :
      podeAdotar(brinquedos2, animal.favorito);
    
    const pessoa1PodeReal = pessoa1Pode &&
        animaisAdotadosPessoa1 < 3 &&
        (animal.tipo !== "gato" || !pessoa1TemGato);
        
    const pessoa2PodeReal = pessoa2Pode &&
        animaisAdotadosPessoa2 < 3 &&
        (animal.tipo !== "gato" || !pessoa2TemGato);
    
    if (pessoa1PodeReal && pessoa2PodeReal) {
        resultado.push(`${nomeAnimal} - abrigo`);
    } else if (pessoa1PodeReal) {
        resultado.push(`${nomeAnimal} - pessoa 1`);
        animaisAdotadosPessoa1++;
        if (animal.tipo === "gato") pessoa1TemGato = true;
    } else if (pessoa2PodeReal) {
        resultado.push(`${nomeAnimal} - pessoa 2`);
        animaisAdotadosPessoa2++;
        if (animal.tipo === "gato") pessoa2TemGato = true;
    } else {
        resultado.push(`${nomeAnimal} - abrigo`);
    }
}
  resultado.sort();
  return { lista: resultado };
  }
}

const animais = {
  Rex: {tipo: "cão", favorito: ["RATO", "BOLA"]},
  Mimi: {tipo: "gato", favorito: ["BOLA", "LASER"]},
  Fofo: {tipo: "gato", favorito: ["BOLA", "RATO", "LASER"]},
  Zero: {tipo: "gato", favorito: ["RATO", "BOLA"]},
  Bola: {tipo: "cão", favorito: ["CAIXA", "NOVELO"]},
  Bebe: {tipo: "cão", favorito: ["LASER", "RATO", "BOLA"]},
  Loco: {tipo: "jabuti", favorito: ["SKATE", "RATO"]}
}
const brinquedosValidos = [
      "RATO", "BOLA", "LASER",
      "CAIXA", "NOVELO", "SKATE"
    ]

export { AbrigoAnimais as AbrigoAnimais };
