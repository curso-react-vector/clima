import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      consulta: {}
    }
  }

  componentDidMount() {
    this.setState({
      error: false,
    })
  }

  componentDidUpdate() {
    this.consultarApi();
  }

  consultarApi = () => {
    const { ciudad, pais } = this.state.consulta;
    if (!ciudad || !pais) return null;

    const API_KEY = '9a5aec2c67e03e43130b37b0ecd28cb7';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}`;
    console.log(url);
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
