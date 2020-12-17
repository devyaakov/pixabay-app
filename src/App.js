import { Component } from 'react';
import Buscador from './components/Buscardor';
import Resultado from './components/Resultado';

class App extends Component {

    state = {
        termino: "",
        imagenes: [],
        pagina: ""
    }

    scroll = () =>{
        const elemento = document.querySelector(".jumbotron");
        elemento.scrollIntoView('smooth','start');

    }

    paginaAnterior = () =>{
        let pagina = this.state.pagina;
        if(pagina === 1) return null;
        pagina--;
        this.setState({pagina: pagina}, () => {this.consultarApi(); this.scroll()});

    }

    paginaSiguiente = () =>{
        let pagina = this.state.pagina;
        pagina++;
        this.setState({pagina: pagina}, () => {this.consultarApi(); this.scroll()});
    }

    consultarApi = () => {
        const termino = this.state.termino;
        const pagina = this.state.pagina;

        const apikey = process.env.REACT_APP_API_PIXABAY;
        const url = `https://pixabay.com/api/?key=${apikey}&q=${termino}&page=${pagina}`;
        fetch(url).then(response => response.json()).then(respo => this.setState({ imagenes: respo.hits }));
    }

    datosBusqueda = (termino) => {
        this.setState({ termino: termino, pagina: 1 }, () => this.consultarApi());
    }

    render(){
        return (
            <div className="container">
                <div className="jumbotron">
                    <p className="lead text-center">Buscador de imagenes</p>
                    <Buscador datosBusqueda={this.datosBusqueda}/>
                </div>
                <div className="row justify-content-center">
                    <Resultado
                        imagenes={this.state.imagenes}
                        paginaAnterior={this.paginaAnterior}
                        paginaSiguiente={this.paginaSiguiente}
                    />
                </div>
            </div>
        );
    }
}

export default App;