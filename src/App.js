import React from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Error from './componentes/Error';
import Clima from './componentes/Clima';

class App extends React.Component {

  state = {
    error : false,
    consulta : {},
    resultado : {}
  }

  // componentDidUpdate(prevProps, prevState){
  //   this.consultarApi();
  //    hacer comprobacion con un if prevState.consulta !== this.state.consulta
  // }

  
  // almacena los datos de formulario, solo eso
  datosConsulta = respuesta => {
    if(respuesta.ciudad === '' || respuesta.pais === ''){
      this.setState({
        error : true
      })
    }else{
      this.setState({
        consulta : respuesta,
        error : false
      })
      this.consultarApi();
    }
  }


  // hace la consulta con los datos del state enviados por el formulario
  consultarApi = () => {
    const {ciudad, pais} = this.state.consulta;
    if(!ciudad || !pais) return null;
    
    const appId = "d7556f48fb746b215de2bd7781491e2e";
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad},${pais}&appid=${appId}`
    
    //query con fetch    d7556f48fb746b215de2bd7781491e2e
    fetch(url)
      .then(respuesta => {
        console.log(respuesta)
        return respuesta.json();
      })
      .then(datos => {
        // console.log(datos);
        this.setState({
          resultado : datos
        })
    
      })
      
      .catch(error => {
        console.log('error :c');
      })
  }

  render(){ 
    
    const {error} = this.state.error;
    const {cod} = this.state.resultado;

    let resultado;

    if(error){
      resultado= <Error mensaje="AMBOS CAMPOS SON OBLIGATORIOS PAPÁ" /> // si es false(que pase) se ejecuta el else if
    } else if(cod === "404") {
      resultado = <Error mensaje="NO SE ENCONTRÓ LA CIUDAD PAPÁ" />
    }else{
      resultado = <Clima resultadoDatos={this.state.resultado} />
    }

    return (
      <div className="App">
        <Header
          titulo="Clima React"
        />

        <Formulario 
          datosConsulta={this.datosConsulta}
        />
        {resultado}
      </div>
    );
  }
}

export default App;
