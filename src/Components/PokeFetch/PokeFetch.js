import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: 10
    }
  }

  tick() {
    this.setState({
      time: this.state.time - 1
    })
  }

  fetchPokemon() {
    this.setState({
      time: 10
    })

    ///////////////////////
    clearInterval(myTimer);
    ///////////////////////

    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))

      ///////////////////////////////////////////////////
      var myTimer = setInterval(() => this.tick(), 1000);
      ///////////////////////////////////////////////////
  }

  isTimeUp() {
    if (this.state.time >= 0) {
      return this.state.time
    }
    return "Time's Up!"
  }

  isPokemonHidden() {
    if (this.state.time >= 0) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.isTimeUp()}</h1>
        <div className={'pokeWrap'}>
          <img className={this.isPokemonHidden() ? 'hiddenPokeImg' : 'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={this.isPokemonHidden() ? 'hiddenPokeName' : 'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;