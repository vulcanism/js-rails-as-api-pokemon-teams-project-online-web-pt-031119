class PokemonsController < ApplicationController
    
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon
    end

end
