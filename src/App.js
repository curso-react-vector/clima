import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      consulta: {},
      resultado: {}
    }
  }

  componentDidMount() {
    this.setState({
      error: false,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.consulta !== this.state.consulta) {
      this.consultarApi();
    }
  }

  consultarApi = () => {
    const { ciudad, pais } = this.state.consulta;
    if (!ciudad || !pais) return null;

    const API_KEY = 'e9439f4a7e29bc4fb99f0ddfb0070754';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}`;
    console.log(url);

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(datos => {
        this.setState({
          resultado: datos,
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  datosConsulta = respuesta => {
    if (respuesta.ciudad === '' || respuesta.pais === '') {
      this.setState({ error: true });
    } else {
      this.setState({
        error: false,
        consulta: respuesta
      });
    }
  }

  render() {
    const error = this.state.error;

    let resultado;

    if (error) {
      resultado = <Error mensaje="Ambos campos son obligatorios" />
    } else {
      resultado = <Clima resultado={this.state.resultado} />
    }
    return (
      <div className="app">
        <Header
          titulo={'Clima React'}
        />
        <Formulario datosConsulta={this.datosConsulta} />
        {resultado}
      </div>
    );
  }
}

export default App;
