import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Clima extends Component {
    
    state = {
        datotes : {}
    }

    mostrarResultado = () => {

        const {city, list} = this.props.resultadoDatos;
        
        // console.log(list[0]);

        if(!city){
            return null 
        // } else {
        //     const weather = list[0].weather[0]
        //     const main = list[0].main
        //     console.log(weather, main);
        };

        const kelvin = 273.15;
        const urlIcono = `http://openweathermap.org/img/w/${list[0].weather[0].icon}.png`
        const alt = `clima de ${city.name}`;

        return(
            <div className="row">
                <div className="resultado col s12 m8 l6 offset-m2 offset-l3">
                    <div className="card-panel light-blue align-center">
                        <span className="white-text">
                            <h2> Resultado clima de: {city.name} </h2>
                            <p className="temperatura">
                                Actual : { (list[0].main.temp - kelvin).toFixed(2) } &deg;C
                                <img src={urlIcono} alt={alt} />
                            </p>
                            <p>Max. { (list[0].main.temp_max - kelvin).toFixed(2) } &deg;C</p>
                            <p>Min. { (list[0].main.temp_min - kelvin).toFixed(2) } &deg;C </p>
                            <p> Dia y hora: {list[0].dt_txt} </p>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
    
    render(){
        return(
            <div className="container">
                {this.mostrarResultado()}
            </div>
        )
    }
}

Clima.propTypes = {
    resultadoDatos : PropTypes.object.isRequired
}

export default Clima;