import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './App.css'
import { Heading, Text } from 'rebass'
import { CoffeeCard } from './CoffeeCard'
import { Filters } from './Filters'

export class CoffeeList extends Component {
  constructor(props) {
    super(props)
    this.state = {coffees: []}
  }

  componentDidMount() {
    if (this.props.mainPage) {
      axios.get('http://localhost:8000/').then(res => {
        this.setState({coffees: res.data})
      }).catch(err => console.log(err))
    }
    else {
      for (const coffee_id of this.props.coffees) {
        this._renderCoffee(coffee_id)
      }
    }
  }

  _renderCoffee(id) {
    axios.get('http://localhost:8000/' + id).then(res => {
      this.setState(prevState => ({
        coffees: [...prevState.coffees, res.data]
      }))
    }).catch(err => console.log(err))
  }

  render() {
    return (
        <div>
          <Heading> {this.props.heading} </Heading>
          <div className="row justify-content-end">
            <div className="col-lg-4 align-self-end">
             <Filters coffees={this.state.coffees} />
            </div>
          </div>
          {this.state.coffees.map((coffee) => {
            return (
              <CoffeeCard
                id={coffee.id}
                key={coffee.id}
                name={coffee.name}
                admin={this.props.admin}
              />
            )
          })
          }
        </div>
      )
      }
}
