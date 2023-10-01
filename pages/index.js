function Home() {
    let body = <div>
        <h1>Conselhos do grande pensador Cesinha...</h1>
        <p>Nome?</p>
        <input type="text"></input>
        <p>Idade?</p>
        <input type="number"></input>
        <p>Sim ou Não?</p>
        <input name="SimOuNao" id="SimOuNao" list="SimOuNaos"></input>
        <datalist id="SimOuNaos">
            <option>Sim</option>
            <option>Não</option>
        </datalist>
    </div>
    console.log(body)
    return body
}

export default Home
